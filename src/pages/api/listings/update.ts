import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Solo aceptar solicitudes PUT
  if (req.method !== 'PUT') {
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
        message: 'Se requiere una suscripción activa para actualizar productos'
      });
    }

    // Verificar que el producto existe y pertenece al usuario
    const { data: existingListing, error: findError } = await supabase
      .from('business_listings')
      .select('*')
      .eq('id', id)
      .eq('business_id', businessProfile.id)
      .single();

    if (findError || !existingListing) {
      return res.status(404).json({ error: 'Producto no encontrado o no pertenece a este negocio' });
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
      status
    } = req.body;

    // Construir objeto de actualización con solo los campos proporcionados
    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (price !== undefined) updateData.price = price;
    if (images !== undefined) updateData.images = images;
    if (address !== undefined) updateData.address = address;
    if (city !== undefined) updateData.city = city;
    if (phone !== undefined) updateData.phone = phone;
    if (website !== undefined) updateData.website = website;
    if (email !== undefined) updateData.email = email;
    if (hours !== undefined) updateData.hours = hours;
    if (services !== undefined) updateData.services = services;
    if (status !== undefined) updateData.status = status;

    // Añadir fecha de actualización
    updateData.updated_at = new Date().toISOString();

    // Actualizar el producto
    const { data: updatedListing, error: updateError } = await supabase
      .from('business_listings')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Error actualizando producto:', updateError);
      return res.status(500).json({ error: 'Error actualizando producto' });
    }

    // Si el status ha cambiado, actualizar el contador de productos activos
    if (status !== undefined && status !== existingListing.status) {
      const increment = status === 'active' ? 1 : -1;

      const { error: counterError } = await supabase
        .from('business_profiles')
        .update({
          active_listings_count: businessProfile.active_listings_count + increment
        })
        .eq('id', businessProfile.id);

      if (counterError) {
        console.error('Error actualizando contador de productos:', counterError);
        // No detener la respuesta por este error
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: updatedListing
    });

  } catch (error: any) {
    console.error('Error en la actualización de producto:', error);
    return res.status(500).json({
      error: {
        message: error.message || 'Ha ocurrido un error al actualizar el producto',
      },
    });
  }
}