/**
 * FEFY COSMETICS - Catálogo Oficial de Productos
 * Fotos reales de productos con fondo oscuro, estilo premium
 */

const FEFY_PRODUCTS = {
  'crema-macadamia-monoi': {
    id: 'crema-macadamia-monoi',
    title: 'Crema Hidratante Macadamia Monoi',
    category: 'Cuidado Corporal',
    description: 'Nutrición profunda con el poder exótico de la macadamia y el monoi de Tahití. Textura untuosa que se funde en la piel dejando una hidratación 24 horas y un aroma tropical envolvente. Enriquecida con manteca de karité orgánica y vitamina E.',
    shortDescription: 'Hidratación tropical 24h',
    price: 24900,
    originalPrice: null,
    currency: 'CLP',
    image: 'images/products/crema-hidratante-1.png',
    gallery: ['images/products/crema-hidratante-1.png', 'images/products/crema-hidratante-2.png'],
    badge: 'Bestseller',
    rating: 4.9,
    reviews: 186,
    stock: 45,
    size: '100g',
    weight: '150g',
    ingredients: ['Aceite de Macadamia', 'Monoi de Tahití', 'Manteca de Karité', 'Vitamina E', 'Glicerina Vegetal'],
    benefits: ['Hidratación profunda 24h', 'Piel suave y sedosa', 'Aroma tropical duradero', 'Absorción rápida sin residuo graso'],
    howToUse: 'Aplicar sobre piel limpia y seca con masajes circulares hasta su total absorción. Ideal para después de la ducha.',
    skinTypes: ['Seca', 'Normal', 'Mixta'],
    variants: []
  },
  'crema-pina-colada': {
    id: 'crema-pina-colada',
    title: 'Crema Hidratante Piña Colada',
    category: 'Cuidado Corporal',
    description: 'Un viaje sensorial al Caribe con cada aplicación. La dulzura de la piña fresca se fusiona con la cremosidad del coco para hidratar intensamente tu piel. Formulada con extractos naturales que revitalizan y aportan luminosidad instantánea.',
    shortDescription: 'Hidratación tropical Piña Colada',
    price: 24900,
    originalPrice: null,
    currency: 'CLP',
    image: 'images/products/crema-hidratante-2.png',
    gallery: ['images/products/crema-hidratante-2.png', 'images/products/crema-hidratante-1.png'],
    badge: 'Nuevo',
    rating: 4.8,
    reviews: 94,
    stock: 38,
    size: '100g',
    weight: '150g',
    ingredients: ['Extracto de Piña', 'Aceite de Coco Virgen', 'Manteca de Karité', 'Vitamina E', 'Aloe Vera'],
    benefits: ['Hidratación intensa', 'Piel luminosa y radiante', 'Aroma dulce y refrescante', 'Textura ligera no grasa'],
    howToUse: 'Extender sobre el cuerpo con movimientos circulares ascendentes. Perfecta para uso diario o después del sol.',
    skinTypes: ['Todo tipo de piel'],
    variants: []
  },
  'serum-capilar': {
    id: 'serum-capilar',
    title: 'Sérum Capilar Reparador',
    category: 'Cuidado Capilar',
    description: 'Elixir de belleza capilar concentrado con los mejores aceites vegetales. Argán del desierto marroquí, coco tropical, jojoba californiana y lavanda provenzal se unen para reparar puntas abiertas, controlar el frizz y devolver el brillo natural a tu melena.',
    shortDescription: 'Reparación y brillo capilar',
    price: 29900,
    originalPrice: 34900,
    currency: 'CLP',
    image: 'images/products/serum-capilar-1.png',
    gallery: ['images/products/serum-capilar-1.png'],
    badge: '-14%',
    rating: 4.9,
    reviews: 142,
    stock: 32,
    size: '50ml',
    weight: '120g',
    ingredients: ['Aceite de Argán', 'Aceite de Coco', 'Aceite de Jojoba', 'Aceite Esencial de Lavanda', 'Vitamina E'],
    benefits: ['Repara puntas abiertas', 'Controla el frizz', 'Aporta brillo intenso', 'Protege del calor del secador'],
    howToUse: 'Aplicar 2-3 gotas en palmas, calentar y distribuir por medios y puntas sobre cabello húmedo o seco. No enjuagar.',
    skinTypes: ['Cabello seco', 'Dañado', 'Con frizz', 'Todo tipo'],
    variants: []
  },
  'serum-pestanas': {
    id: 'serum-pestanas',
    title: 'Sérum Fortalecedor de Pestañas',
    category: 'Cuidado Facial',
    description: 'Fórmula concentrada con aceite de ricino puro, pantenol y vitamina E que nutre desde la raíz, estimulando el crecimiento natural de pestañas más largas, densas y fuertes. Su aplicador de precisión facilita el uso diario sin irritar la zona del contorno de ojos.',
    shortDescription: 'Pestañas más largas y fuertes',
    price: 19900,
    originalPrice: null,
    currency: 'CLP',
    image: 'images/products/serum-pestanas-1.png',
    gallery: ['images/products/serum-pestanas-1.png', 'images/products/serum-pestanas-2.png', 'images/products/serum-pestanas-3.png'],
    badge: 'Más Vendido',
    rating: 4.8,
    reviews: 328,
    stock: 55,
    size: '10ml',
    weight: '35g',
    ingredients: ['Aceite de Ricino Puro', 'Pantenol (Vitamina B5)', 'Vitamina E', 'Biotina', 'Extracto de Caléndula'],
    benefits: ['Fortalece desde la raíz', 'Estimula el crecimiento', 'Acondiciona y nutre', 'Apto para pestañas y cejas'],
    howToUse: 'Aplicar una fina capa en la línea de las pestañas superiores e inferiores, limpias y sin maquillaje, cada noche antes de dormir.',
    skinTypes: ['Todo tipo de piel', 'Incluye sensibles'],
    variants: []
  },
  'serum-acido-hialuronico': {
    id: 'serum-acido-hialuronico',
    title: 'Sérum Facial Ácido Hialurónico',
    category: 'Cuidado Facial',
    description: 'Hidratación en su máxima expresión. Tres pesos moleculares de ácido hialurónico trabajan en sinergia para rellenar líneas de expresión desde el interior, mientras que el extracto de flor de loto aporta antioxidantes y luminosidad. Textura ligera de absorción instantánea.',
    shortDescription: 'Hidratación 3D anti-edad',
    price: 32900,
    originalPrice: null,
    currency: 'CLP',
    image: 'images/products/serum-acido-hialuronico-1.png',
    gallery: ['images/products/serum-acido-hialuronico-1.png'],
    badge: 'Premium',
    rating: 4.9,
    reviews: 215,
    stock: 28,
    size: '30ml',
    weight: '80g',
    ingredients: ['Ácido Hialurónico (3 pesos moleculares)', 'Extracto de Flor de Loto', 'Niacinamida', 'Pantenol', 'Aloe Vera'],
    benefits: ['Rellena líneas finas', 'Hidratación profunda multicapa', 'Piel más luminosa y tersa', 'Prepara la piel para el maquillaje'],
    howToUse: 'Aplicar 2-3 pumps sobre rostro y cuello limpios. Presionar suavemente con yemas hasta absorción. Usar mañana y noche antes de la crema.',
    skinTypes: ['Todo tipo de piel', 'Madura', 'Deshidratada'],
    variants: []
  },
  'tonico-agua-rosas': {
    id: 'tonico-agua-rosas',
    title: 'Tónico Facial Agua de Rosas',
    category: 'Cuidado Facial',
    description: 'El secreto de las reinas de la belleza en un spray. Agua de rosas damascenas destilada artesanalmente que tonifica, equilibra el pH y refresca la piel al instante. Enriquecida con extracto de hamamelis que minimiza poros y calma rojeces.',
    shortDescription: 'Tonifica, refresca y equilibra',
    price: 18900,
    originalPrice: null,
    currency: 'CLP',
    image: 'images/products/tonico-agua-rosas-1.png',
    gallery: ['images/products/tonico-agua-rosas-1.png'],
    badge: null,
    rating: 4.7,
    reviews: 167,
    stock: 42,
    size: '100ml',
    weight: '130g',
    ingredients: ['Agua de Rosas Damascenas', 'Extracto de Hamamelis', 'Glicerina Vegetal', 'Ácido Hialurónico', 'Extracto de Manzanilla'],
    benefits: ['Equilibra el pH natural', 'Minimiza poros visibles', 'Refresca y calma', 'Fijador de maquillaje natural'],
    howToUse: 'Rociar sobre rostro limpio a 20cm de distancia. Dejar absorber o retirar exceso con algodón. Usar mañana y noche. También como refrescante durante el día.',
    skinTypes: ['Todo tipo de piel', 'Sensible', 'Con rojeces'],
    variants: []
  },
  'jabon-masaje': {
    id: 'jabon-masaje',
    title: 'Jabón de Masaje Exfoliante',
    category: 'Cuidado Corporal',
    description: 'Innovador jabón con esferas de silicona integradas que masajean y exfolian suavemente la piel mientras limpian en profundidad. Disponible en dos variantes aromáticas: Miel & Karité para nutrición intensa, y Lavanda & Árnica para relajación y recuperación muscular.',
    shortDescription: 'Limpieza + masaje + exfoliación',
    price: 12900,
    originalPrice: null,
    currency: 'CLP',
    image: 'images/products/jabon-natural-1.png',
    gallery: ['images/products/jabon-natural-1.png'],
    badge: '2 en 1',
    rating: 4.6,
    reviews: 89,
    stock: 60,
    size: '80g',
    weight: '100g',
    ingredients: ['Base de Glicerina Vegetal', 'Aceite de Coco', 'Vitamina E', 'Esferas de Silicona Suave', 'Extractos Naturales'],
    benefits: ['Exfoliación suave diaria', 'Masaje relajante', 'Limpieza profunda de poros', 'Mejora la circulación'],
    howToUse: 'Humedecer y frotar sobre piel húmeda con movimientos circulares. Las esferas masajean mientras el jabón limpia. Enjuagar abundantemente.',
    skinTypes: ['Todo tipo de piel', 'Con celulitis', 'Con piel apagada'],
    variants: [
      { id: 'jabon-miel-karite', name: 'Miel & Karité', color: '#F5A623' },
      { id: 'jabon-lavanda-arnica', name: 'Lavanda & Árnica', color: '#9B8EC7' }
    ]
  }
};

// Funciones helper
function getProductById(id) {
  return FEFY_PRODUCTS[id] || null;
}

function getAllProducts() {
  return Object.values(FEFY_PRODUCTS);
}

function getProductsByCategory(category) {
  return Object.values(FEFY_PRODUCTS).filter(p => p.category === category);
}

function getFeaturedProducts() {
  return [
    FEFY_PRODUCTS['crema-macadamia-monoi'],
    FEFY_PRODUCTS['serum-pestanas'],
    FEFY_PRODUCTS['serum-capilar'],
    FEFY_PRODUCTS['serum-acido-hialuronico']
  ].filter(Boolean);
}

// Exportar para uso en script.js
if (typeof window !== 'undefined') {
  window.FEFY_PRODUCTS = FEFY_PRODUCTS;
  window.getProductById = getProductById;
  window.getAllProducts = getAllProducts;
  window.getProductsByCategory = getProductsByCategory;
  window.getFeaturedProducts = getFeaturedProducts;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FEFY_PRODUCTS, getProductById, getAllProducts, getProductsByCategory, getFeaturedProducts };
}
