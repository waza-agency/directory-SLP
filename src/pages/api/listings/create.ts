import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Solo aceptar solicitudes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    // Crear cliente Supabase autenticado
    const supabase = createPagesServerClient({ req, res });

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

    // Obtener el perfil de negocio con estado de suscripción
    const { data: businessProfile, error: profileError } = await supabase
      .from('business_profiles')
      .select("*")
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
        .select("*")
        .eq('user_id', userId)
        .eq('status', 'active')
        .maybeSingle();

      hasActiveSubscription = !!subscription;
    }

    if (!hasActiveSubscription) {
      return res.status(403).json({
        error: 'subscription_required',
        message: 'Se requiere una suscripción activa para crear productos'
      });
    }

    // Contar los productos existentes
    const { count, error: countError } = await supabase
      .from('business_listings')
      .select("*")
      .eq('business_id', businessProfile.id);

    if (countError) {
      console.error('Error contando productos:', countError);
      return res.status(500).json({ error: 'Error al verificar límite de productos' });
    }

    // Verificar límite de productos (máximo 10)
    const MAX_LISTINGS = 10;
    if (count !== null && count >= MAX_LISTINGS) {
      return res.status(403).json({
        error: 'listings_limit_reached',
        message: 'Has alcanzado el límite máximo de 10 productos'
      });
    }

    // Extraer datos del cuerpo de la solicitud
    const {
      title,
      description,
      category,
      price,
      images,
      address,
      city,
      phone,
      website,
      email,
      hours,
      services,
      status = 'active'
    } = req.body;

    // Validación básica
    if (!title || !description || !category) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Crear el producto
    const { data: listing, error: createError } = await supabase
      .from('business_listings')
      .insert([
        {
          business_id: businessProfile.id,
          title,
          description,
          category,
          price,
          images,
          address,
          city,
          phone,
          website,
          email,
          hours,
          services,
          status
        }
      ])
      .select()
      .single();

    if (createError) {
      console.error('Error creando producto:', createError);
      return res.status(500).json({ error: 'Error creando producto' });
    }

    // Actualizar el contador de productos activos en el perfil de negocio
    const { error: updateError } = await supabase
      .from('business_profiles')
      .update({
        active_listings_count: count !== null ? count + 1 : 1
      })
      .eq('id', businessProfile.id);

    if (updateError) {
      console.error('Error actualizando contador de productos:', updateError);
      // No detener la respuesta por este error
    }

    return res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: listing
    });

  } catch (error: any) {
    console.error('Error en la creación de producto:', error);
    return res.status(500).json({
      error: {
        message: error.message || 'Ha ocurrido un error al crear el producto',
      },
    });
  }
}