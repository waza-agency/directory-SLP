import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { supabaseAdmin } from '@/lib/api/supabase-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Solo aceptar solicitudes DELETE
  if (req.method !== 'DELETE') {
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

            // First, delete any related records that might prevent deletion due to foreign key constraints
    console.log('Checking for related records before deletion...');

    // Delete from shopping_cart first
    const { error: cartDeleteError } = await supabaseAdmin
      .from('shopping_cart')
      .delete()
      .eq('listing_id', id);

    if (cartDeleteError) {
      console.warn('Error deleting shopping cart items (non-critical):', cartDeleteError);
    }

    // Delete from order_items (this was the missing piece!)
    const { error: orderItemsDeleteError } = await supabaseAdmin
      .from('order_items')
      .delete()
      .eq('listing_id', id);

    if (orderItemsDeleteError) {
      console.warn('Error deleting order items (non-critical):', orderItemsDeleteError);
    }

        // Check for marketplace transactions that might prevent deletion
    const { data: transactions, error: transactionCheckError } = await supabaseAdmin
      .from('marketplace_transactions')
      .select('id, status')
      .eq('listing_id', id);

    if (transactionCheckError) {
      console.warn('Error checking transactions:', transactionCheckError);
    } else if (transactions && transactions.length > 0) {
      const completedTransactions = transactions.filter(t => t.status === 'completed');
      console.log(`Found ${transactions.length} transactions for this listing (${completedTransactions.length} completed)`);

      // If there are completed transactions, we should not delete the listing
      if (completedTransactions.length > 0) {
        return res.status(400).json({
          error: 'cannot_delete_listing_with_transactions',
          message: 'No se puede eliminar un producto que tiene transacciones completadas. Puede desactivar el producto en su lugar.'
        });
      }

      // If there are only pending transactions, delete them first
      if (transactions.length > 0) {
        const { error: deleteTransactionsError } = await supabaseAdmin
          .from('marketplace_transactions')
          .delete()
          .eq('listing_id', id)
          .neq('status', 'completed');

        if (deleteTransactionsError) {
          console.error('Error deleting pending transactions:', deleteTransactionsError);
          return res.status(500).json({
            error: 'Error eliminando transacciones pendientes',
            details: deleteTransactionsError.message
          });
        }
      }
    }

    // Eliminar el producto - use service role to bypass RLS since we've already verified ownership
    const { error: deleteError } = await supabaseAdmin
      .from('business_listings')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error eliminando producto:', deleteError);
      console.error('Detalles del error:', {
        code: deleteError.code,
        message: deleteError.message,
        details: deleteError.details,
        hint: deleteError.hint,
        listingId: id,
        businessId: businessProfile.id,
        userId: userId
      });
      return res.status(500).json({
        error: 'Error eliminando producto',
        details: deleteError.message
      });
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