/**
 * API Endpoint: POST /api/webhook
 * Recibe notificaciones IPN de Mercado Pago
 */

const { MercadoPagoConfig, Payment } = require('mercadopago');

// ==========================================
// CONFIGURACIÓN
// ==========================================
const MP_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
const MP_WEBHOOK_SECRET = process.env.MERCADOPAGO_WEBHOOK_SECRET;

// Almacenamiento temporal de pagos (en producción, usar base de datos)
// Estructura: { payment_id: { ...datos del pago... } }
const paymentLog = new Map();

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================
function logPayment(paymentData) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    ...paymentData
  };

  // Guardar en memoria (reemplazar por DB en producción)
  paymentLog.set(paymentData.payment_id, logEntry);

  // Log en consola
  console.log('==========================================');
  console.log('[WEBHOOK] Pago registrado');
  console.log('  Payment ID:', paymentData.payment_id);
  console.log('  Status:', paymentData.status);
  console.log('  External Ref:', paymentData.external_reference);
  console.log('  Monto:', paymentData.amount, paymentData.currency);
  console.log('  Fecha:', paymentData.date);
  console.log('==========================================');
}

// ==========================================
// HANDLER PRINCIPAL
// ==========================================
module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Mercado Pago envía notificaciones como POST
    // Pero también puede hacer GET para verificar el endpoint
    if (req.method === 'GET') {
      console.log('[WEBHOOK] Verificación GET recibida');
      return res.status(200).json({
        status: 'ok',
        message: 'Webhook activo'
      });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Método no permitido' });
    }

    // Validar Access Token
    if (!MP_ACCESS_TOKEN) {
      console.error('[WEBHOOK] MERCADOPAGO_ACCESS_TOKEN no configurado');
      return res.status(500).json({ error: 'Configuración incompleta' });
    }

    const { query, body } = req;

    // Mercado Pago puede enviar datos como query params o en el body
    const topic = query.topic || query.type || body.topic || body.type;
    const id = query.id || body.id || body.data?.id;

    console.log(`[WEBHOOK] Notificación recibida - Topic: ${topic}, ID: ${id}`);

    // Validar firma del webhook si está configurado
    if (MP_WEBHOOK_SECRET) {
      // En implementaciones avanzadas, validar la firma aquí
      // Por simplicidad, se omite la validación de firma en esta versión
      // Referencia: https://www.mercadopago.com/developers/es/docs/checkout-pro/webhooks
    }

    // Procesar según el tipo de notificación
    if (topic === 'payment' || topic === 'merchant_order') {
      if (!id) {
        console.error('[WEBHOOK] ID de pago no proporcionado');
        return res.status(400).json({ error: 'ID no proporcionado' });
      }

      // Consultar el estado real del pago en Mercado Pago
      const client = new MercadoPagoConfig({
        accessToken: MP_ACCESS_TOKEN,
        options: { timeout: 5000 }
      });

      const payment = new Payment(client);
      const paymentData = await payment.get({ id });

      const status = paymentData.status;
      const externalReference = paymentData.external_reference;
      const amount = paymentData.transaction_amount;
      const currency = paymentData.currency_id;
      const dateApproved = paymentData.date_approved;
      const payerEmail = paymentData.payer?.email;
      const paymentMethod = paymentData.payment_method_id;
      const installments = paymentData.installments;

      // Log del pago
      const logData = {
        payment_id: id,
        status: status,
        external_reference: externalReference,
        amount: amount,
        currency: currency,
        date: dateApproved || new Date().toISOString(),
        payer_email: payerEmail,
        payment_method: paymentMethod,
        installments: installments,
        raw_data: process.env.NODE_ENV === 'development' ? paymentData : undefined
      };

      logPayment(logData);

      // ==========================================
      // ACCIONES SEGÚN ESTADO DEL PAGO
      // ==========================================
      if (status === 'approved') {
        console.log(`[WEBHOOK] ✅ Pago APROBADO - ID: ${id}, Ref: ${externalReference}`);

        // TODO: En producción, realizar estas acciones:
        // 1. Guardar pedido en base de datos
        // 2. Enviar email de confirmación al cliente
        // 3. Enviar email de notificación al administrador
        // 4. Descontar stock
        // 5. Activar entrega digital si aplica
        // 6. Generar factura
        // 7. Actualizar métricas de ventas

      } else if (status === 'pending' || status === 'in_process') {
        console.log(`[WEBHOOK] ⏳ Pago PENDIENTE - ID: ${id}, Ref: ${externalReference}`);

        // TODO: En producción:
        // 1. Guardar pedido como pendiente
        // 2. Enviar email al cliente indicando que está pendiente
        // 3. Programar verificación posterior

      } else if (status === 'rejected' || status === 'cancelled') {
        console.log(`[WEBHOOK] ❌ Pago RECHAZADO/CANCELADO - ID: ${id}, Ref: ${externalReference}`);

        // TODO: En producción:
        // 1. Guardar intento fallido
        // 2. Opcional: enviar email al cliente con opciones
        // 3. Liberar stock reservado si aplica
      }

      // Siempre responder 200 para que MP no reenvíe la notificación
      return res.status(200).json({
        received: true,
        payment_id: id,
        status: status
      });
    }

    // Otros tipos de notificación (plan, subscription, etc.)
    console.log(`[WEBHOOK] Notificación no procesada: ${topic}`);
    return res.status(200).json({ received: true, processed: false });

  } catch (error) {
    console.error('[WEBHOOK] Error procesando notificación:', error);

    // Importante: responder 200 incluso si hay error interno
    // para evitar reenvíos infinitos de MP
    return res.status(200).json({
      received: true,
      error: true,
      message: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
    });
  }
};

// Exportar logs para consulta (en producción, usar DB)
module.exports.getPaymentLogs = function() {
  return Array.from(paymentLog.values());
};
