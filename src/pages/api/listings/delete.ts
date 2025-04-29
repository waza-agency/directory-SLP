import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Solo aceptar solicitudes DELETE
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    // Crear cliente Supabase autenticado
    const supabase = createServerSupabaseClient({ req, res });
    
    // Verificar si tenemos una sesión
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return res.status(401).json({
        error: 'not_authenticated',
        description: 'El usuario no tiene una sesión activa o no está autenticado',
      });
    }

    const userId = session.user.id;
    const { id } = req.query;
    
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'ID de producto requerido' });
    }
    
    // Obtener el perfil de negocio con estado de suscripción
    const { data: businessProfile, error: profileError } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (profileError) {
      console.error('Error obteniendo perfil de negocio:', profileError);
      return res.status(404).json({ error: 'Perfil de negocio no encontrado' });
    }

    // Verificar si el usuario tiene una suscripción activa
    let hasActiveSubscription = businessProfile.subscription_status === 'active';
    
    if (!hasActiveSubscription) {
      // Verificar también en la tabla de suscripciones
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('user_id', userId)
        .eq('status', 'active')
        .maybeSingle();
      
      hasActiveSubscription = !!subscription;
    }

    if (!hasActiveSubscription) {
      return res.status(403).json({ 
        error: 'subscription_required', 
        message: 'Se requiere una suscripción activa para gestionar productos' 
      });
    }

    // Verificar que el producto existe y pertenece al usuario
    const { data: existingListing, error: findError } = await supabase
      .from('business_listings')
      .select('status')
      .eq('id', id)
      .eq('business_id', businessProfile.id)
      .single();

    if (findError || !existingListing) {
      return res.status(404).json({ error: 'Producto no encontrado o no pertenece a este negocio' });
    }

    // Eliminar el producto
    const { error: deleteError } = await supabase
      .from('business_listings')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error eliminando producto:', deleteError);
      return res.status(500).json({ error: 'Error eliminando producto' });
    }

    // Si el producto estaba activo, actualizar el contador
    if (existingListing.status === 'active') {
      const { error: counterError } = await supabase
        .from('business_profiles')
        .update({ 
          active_listings_count: Math.max(0, businessProfile.active_listings_count - 1)
        })
        .eq('id', businessProfile.id);

      if (counterError) {
        console.error('Error actualizando contador de productos:', counterError);
        // No detener la respuesta por este error
      }
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Producto eliminado exitosamente' 
    });
    
  } catch (error: any) {
    console.error('Error en la eliminación de producto:', error);
    return res.status(500).json({
      error: {
        message: error.message || 'Ha ocurrido un error al eliminar el producto',
      },
    });
  }
} 