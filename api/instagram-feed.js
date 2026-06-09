/**
 * API Endpoint: GET /api/instagram-feed
 *
 * Instagram bloquea scraping sin autenticación. Las únicas formas
 * de obtener posts reales son:
 * 1. Instagram Basic Display API (requiere token de Meta)
 * 2. Grid manual con imágenes descargadas
 *
 * Este endpoint devuelve posts manuales desde data/instagram-posts.js
 * o un estado indicando que se necesita configuración.
 */

const fs = require('fs');
const path = require('path');

const INSTAGRAM_USERNAME = 'fefycosmetics';
const CACHE_DURATION = 5 * 60 * 1000;

let cache = { data: null, timestamp: 0 };

function getManualPosts() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'instagram-posts.js');
    if (!fs.existsSync(filePath)) return [];

    const content = fs.readFileSync(filePath, 'utf8');
    // Extraer el array con una regex simple
    const match = content.match(/const FEFY_INSTAGRAM_POSTS = (\[[\s\S]*?\]);/);
    if (!match) return [];

    // Evaluar de forma segura (es un array literal)
    const posts = eval(match[1]);
    return Array.isArray(posts) ? posts : [];
  } catch (e) {
    console.log('[Instagram] Error reading manual posts:', e.message);
    return [];
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const now = Date.now();
  if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
    return res.status(200).json({
      success: true,
      source: 'cache',
      username: INSTAGRAM_USERNAME,
      posts: cache.data.posts,
      configured: cache.data.configured
    });
  }

  const posts = getManualPosts();
  const configured = posts.length > 0;

  const result = {
    success: true,
    source: 'manual',
    username: INSTAGRAM_USERNAME,
    profileUrl: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
    posts: posts,
    configured: configured,
    message: configured
      ? null
      : 'No hay posts configurados. Agrega posts reales en public/data/instagram-posts.js',
    fetchedAt: new Date().toISOString()
  };

  cache = { data: result, timestamp: now };
  return res.status(200).json(result);
};
