/**
 * API Endpoint: POST /api/create-preference
 * Crea una preferencia de pago en Mercado Pago Checkout Pro
 */

const { MercadoPagoConfig, Preference } = require('mercadopago');

// ==========================================
// CONFIGURACIÓN
// ==========================================
const MP_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
const SITE_URL = process.env.SITE_URL || 'https://fefy-cosmetics.vercel.app';
const CURRENCY = process.env.CURRENCY || 'CLP';

// Catálogo de productos validado (fuente de verdad)
// Precios definidos aquí, NO se confía en precios del frontend
const PRODUCTS_CATALOG = {
  'crema-macadamia-monoi': {
    id: 'crema-macadamia-monoi',
    title: 'Crema Hidratante Macadamia Monoi',
    description: 'Nutrición profunda con macadamia y monoi de Tahití. Hidratación 24h',
    unit_price: 24900,
    currency_id: 'CLP',
    picture_url: null
  },
  'crema-pina-colada': {
    id: 'crema-pina-colada',
    title: 'Crema Hidratante Piña Colada',
    description: 'Hidratación tropical con piña fresca y coco. Luminosidad instantánea',
    unit_price: 24.90,
    currency_id: 'CLP',
    picture_url: null
  },
  'serum-capilar': {
    id: 'serum-capilar',
    title: 'Sérum Capilar Reparador',
    description: 'Argán, coco, jojoba y lavanda. Repara puntas y controla frizz',
    unit_price: 29900,
    currency_id: 'CLP',
    picture_url: null
  },
  'serum-pestanas': {
    id: 'serum-pestanas',
    title: 'Sérum Fortalecedor de Pestañas',
    description: 'Aceite de ricino, pantenol y vitamina E. Pestañas más largas y fuertes',
    unit_price: 19900,
    currency_id: 'CLP',
    picture_url: null
  },
  'serum-acido-hialuronico': {
    id: 'serum-acido-hialuronico',
    title: 'Sérum Facial Ácido Hialurónico',
    description: '3 pesos moleculares de ácido hialurónico. Anti-edad e hidratación 3D',
    unit_price: 32900,
    currency_id: 'CLP',
    picture_url: null
  },
  'tonico-agua-rosas': {
    id: 'tonico-agua-rosas',
    title: 'Tónico Facial Agua de Rosas',
    description: 'Agua de rosas damascenas destilada artesanalmente. Tonifica y equilibra',
    unit_price: 18900,
    currency_id: 'CLP',
    picture_url: null
  },
  'jabon-masaje': {
    id: 'jabon-masaje',
    title: 'Jabón de Masaje Exfoliante',
    description: 'Jabón con esferas de silicona. Limpieza, masaje y exfoliación 2 en 1',
    unit_price: 12900,
    currency_id: 'CLP',
    picture_url: null
  }
};

// ==========================================
// VALIDACIONES
// ==========================================
function validateItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return { valid: false, error: 'El carrito está vacío' };
  }

  const validatedItems = [];
  const errors = [];

  for (const item of items) {
    const productId = item.id;
    const quantity = parseInt(item.quantity);

    if (!productId || !PRODUCTS_CATALOG[productId]) {
      errors.push(`Producto no válido: ${productId}`);
      continue;
    }

    if (!quantity || quantity < 1 || quantity > 10) {
      errors.push(`Cantidad no válida para ${productId}: ${quantity}`);
      continue;
    }

    const catalogProduct = PRODUCTS_CATALOG[productId];

    // Usar precio del catálogo, NO del frontend (seguridad)
    validatedItems.push({
      id: catalogProduct.id,
      title: catalogProduct.title,
      description: catalogProduct.description,
      unit_price: catalogProduct.unit_price,
      quantity: quantity,
      currency_id: catalogProduct.currency_id,
      picture_url: catalogProduct.picture_url
    });
  }

  if (errors.length > 0) {
    return { valid: false, error: errors.join('; ') };
  }

  if (validatedItems.length === 0) {
    return { valid: false, error: 'No hay productos válidos en el carrito' };
  }

  return { valid: true, items: validatedItems };
}

// ==========================================
// HANDLER PRINCIPAL
// ==========================================
module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método no permitido',
      message: 'Solo se aceptan peticiones POST'
    });
  }

  try {
    // Validar Access Token configurado
    if (!MP_ACCESS_TOKEN) {
      console.error('[MP] MERCADOPAGO_ACCESS_TOKEN no configurado');
      return res.status(500).json({
        error: 'Configuración incompleta',
        message: 'El Access Token de Mercado Pago no está configurado'
      });
    }

    const { items, payer } = req.body || {};

    // Validar items del carrito
    const validation = validateItems(items);
    if (!validation.valid) {
      return res.status(400).json({
        error: 'Validación fallida',
        message: validation.error
      });
    }

    // Generar external_reference único
    const externalReference = `FEFY-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    // Configurar Mercado Pago
    const client = new MercadoPagoConfig({
      accessToken: MP_ACCESS_TOKEN,
      options: { timeout: 5000 }
    });

    const preference = new Preference(client);

    // Construir preferencia
    const preferenceData = {
      items: validation.items.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        unit_price: item.unit_price,
        quantity: item.quantity,
        currency_id: item.currency_id
      })),
      external_reference: externalReference,
      back_urls: {
        success: `${SITE_URL}/pago-exitoso`,
        failure: `${SITE_URL}/pago-fallido`,
        pending: `${SITE_URL}/pago-pendiente`
      },
      auto_return: 'approved',
      notification_url: `${SITE_URL}/api/webhook`,
      payer: payer ? {
        name: payer.name || '',
        surname: payer.surname || '',
        email: payer.email || ''
      } : undefined
    };

    // Crear preferencia en Mercado Pago
    const response = await preference.create({ body: preferenceData });

    console.log(`[MP] Preferencia creada: ${response.id} | Ref: ${externalReference}`);

    // Responder con datos del checkout
    return res.status(200).json({
      success: true,
      preferenceId: response.id,
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point,
      externalReference: externalReference,
      items: validation.items.map(i => ({
        id: i.id,
        title: i.title,
        quantity: i.quantity,
        unit_price: i.unit_price
      }))
    });

  } catch (error) {
    console.error('[MP] Error creando preferencia:', error);

    return res.status(500).json({
      error: 'Error interno',
      message: error.message || 'No se pudo crear la preferencia de pago',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
