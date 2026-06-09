/**
 * API Endpoint: GET /api/instagram-feed
 * Obtiene las últimas publicaciones de @fefycosmetics desde Instagram
 * Usa múltiples estrategias: API pública, scraping, o embed fallback
 */

const axios = require('axios');

// ==========================================
// CONFIGURACIÓN
// ==========================================
const INSTAGRAM_USERNAME = 'fefycosmetics';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos en ms

// Cache simple en memoria
let cache = {
  data: null,
  timestamp: 0
};

// ==========================================
// MÉTODO 1: Intentar API pública de Instagram (__a=1)
// ==========================================
async function fetchFromInstagramAPI() {
  try {
    const url = `https://www.instagram.com/${INSTAGRAM_USERNAME}/?__a=1&__d=dis`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'Referer': 'https://www.instagram.com/'
      },
      timeout: 8000
    });

    const data = response.data;
    
    // Extraer posts del formato de respuesta
    let posts = [];
    
    if (data.graphql && data.graphql.user && data.graphql.user.edge_owner_to_timeline_media) {
      const edges = data.graphql.user.edge_owner_to_timeline_media.edges;
      posts = edges.slice(0, 12).map(edge => ({
        id: edge.node.id,
        shortcode: edge.node.shortcode,
        url: `https://www.instagram.com/p/${edge.node.shortcode}/`,
        image: edge.node.display_url || edge.node.thumbnail_src,
        thumbnail: edge.node.thumbnail_src,
        caption: edge.node.edge_media_to_caption?.edges?.[0]?.node?.text || '',
        likes: edge.node.edge_liked_by?.count || edge.node.edge_media_preview_like?.count || 0,
        comments: edge.node.edge_media_to_comment?.count || 0,
        type: edge.node.__typename === 'GraphSidecar' ? 'carousel' : 
              edge.node.__typename === 'GraphVideo' ? 'reel' : 'photo',
        timestamp: edge.node.taken_at_timestamp
      }));
    }
    
    return posts.length > 0 ? posts : null;
  } catch (error) {
    console.log('[Instagram] API method failed:', error.message);
    return null;
  }
}

// ==========================================
// MÉTODO 2: Scraping de la página HTML
// ==========================================
async function fetchFromScraping() {
  try {
    const url = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9'
      },
      timeout: 8000
    });

    const html = response.data;
    
    // Buscar el script que contiene _sharedData o additionalDataLoaded
    const sharedDataMatch = html.match(/<script[^>]*>window\._sharedData\s*=\s*({.+?});<\/script>/);
    const additionalDataMatch = html.match(/<script[^>]*>window\.__additionalDataLoaded\s*\(\s*'[^']+'\s*,\s*({.+?})\s*\);<\/script>/);
    
    let data = null;
    
    if (additionalDataMatch) {
      data = JSON.parse(additionalDataMatch[1]);
    } else if (sharedDataMatch) {
      data = JSON.parse(sharedDataMatch[1]);
    }
    
    if (!data) return null;
    
    // Extraer posts
    let posts = [];
    const user = data.entry_data?.ProfilePage?.[0]?.graphql?.user || 
                 data.require?.[0]?.[3]?.[0]?.__bbox?.require?.[0]?.[3]?.[1]?.__bbox?.result?.data?.user;
    
    if (user && user.edge_owner_to_timeline_media) {
      const edges = user.edge_owner_to_timeline_media.edges;
      posts = edges.slice(0, 12).map(edge => ({
        id: edge.node.id,
        shortcode: edge.node.shortcode,
        url: `https://www.instagram.com/p/${edge.node.shortcode}/`,
        image: edge.node.display_url || edge.node.thumbnail_src,
        thumbnail: edge.node.thumbnail_resources?.[2]?.src || edge.node.thumbnail_src,
        caption: edge.node.edge_media_to_caption?.edges?.[0]?.node?.text?.substring(0, 120) || '',
        likes: edge.node.edge_media_preview_like?.count || 0,
        comments: edge.node.edge_media_to_comment?.count || 0,
        type: edge.node.__typename === 'GraphSidecar' ? 'carousel' : 
              edge.node.__typename === 'GraphVideo' ? 'reel' : 'photo',
        timestamp: edge.node.taken_at_timestamp
      }));
    }
    
    return posts.length > 0 ? posts : null;
  } catch (error) {
    console.log('[Instagram] Scraping method failed:', error.message);
    return null;
  }
}

// ==========================================
// MÉTODO 3: Posts de respaldo (manual/demo)
// ==========================================
function getFallbackPosts() {
  // Posts reales de @fefycosmetics que podemos mostrar
  // Estos son placeholders que se reemplazan cuando la API funciona
  return [
    {
      id: 'fallback_1',
      shortcode: 'C0xYzAbC123',
      url: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
      image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop',
      caption: '✨ Descubre la magia de la cosmética natural con Fefy',
      likes: 1240,
      comments: 89,
      type: 'photo',
      isFallback: true
    },
    {
      id: 'fallback_2',
      shortcode: 'C0xYzAbC124',
      url: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      caption: 'Tu piel merece lo mejor 🌿 Productos 100% naturales',
      likes: 2156,
      comments: 142,
      type: 'carousel',
      isFallback: true
    },
    {
      id: 'fallback_3',
      shortcode: 'C0xYzAbC125',
      url: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      caption: 'Rutina de skincare AM completa 💧',
      likes: 987,
      comments: 67,
      type: 'reel',
      isFallback: true
    },
    {
      id: 'fallback_4',
      shortcode: 'C0xYzAbC126',
      url: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
      caption: 'Antes y después usando nuestro sérum de pestañas 👁️✨',
      likes: 3421,
      comments: 234,
      type: 'carousel',
      isFallback: true
    },
    {
      id: 'fallback_5',
      shortcode: 'C0xYzAbC127',
      url: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop',
      caption: 'Nuevos jabones de masaje 🧼💜💛',
      likes: 876,
      comments: 45,
      type: 'photo',
      isFallback: true
    },
    {
      id: 'fallback_6',
      shortcode: 'C0xYzAbC128',
      url: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
      caption: 'Ingredientes que tu piel amará 🥥🌸',
      likes: 1567,
      comments: 98,
      type: 'reel',
      isFallback: true
    }
  ];
}

// ==========================================
// HANDLER PRINCIPAL
// ==========================================
module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  
  try {
    // Verificar cache
    const now = Date.now();
    if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
      return res.status(200).json({
        success: true,
        source: 'cache',
        username: INSTAGRAM_USERNAME,
        posts: cache.data
      });
    }
    
    let posts = null;
    let source = 'fallback';
    
    // Intentar método 1: API pública
    posts = await fetchFromInstagramAPI();
    if (posts) {
      source = 'instagram_api';
      console.log(`[Instagram] Fetched ${posts.length} posts via API`);
    }
    
    // Intentar método 2: Scraping
    if (!posts) {
      posts = await fetchFromScraping();
      if (posts) {
        source = 'scraping';
        console.log(`[Instagram] Fetched ${posts.length} posts via scraping`);
      }
    }
    
    // Fallback: usar posts de respaldo
    if (!posts || posts.length === 0) {
      posts = getFallbackPosts();
      console.log('[Instagram] Using fallback posts');
    }
    
    // Guardar en cache
    cache = { data: posts, timestamp: now };
    
    return res.status(200).json({
      success: true,
      source: source,
      username: INSTAGRAM_USERNAME,
      profileUrl: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
      posts: posts,
      fetchedAt: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('[Instagram] Error:', error);
    
    // En caso de error total, devolver fallback
    const fallbackPosts = getFallbackPosts();
    return res.status(200).json({
      success: true,
      source: 'error_fallback',
      username: INSTAGRAM_USERNAME,
      profileUrl: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
      posts: fallbackPosts,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
