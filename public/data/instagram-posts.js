/**
 * FEFY COSMETICS - Posts de Instagram (@fefycosmetics)
 *
 * INSTRUCCIONES para agregar o actualizar posts:
 * 1. Guarda las imágenes/videos en: public/images/instagram/
 * 2. Agrega un objeto al array de abajo con los datos reales
 * 3. Todos los posts deben linkear a https://www.instagram.com/fefycosmetics/
 */

const FEFY_INSTAGRAM_POSTS = [
  {
    id: '1',
    url: 'https://www.instagram.com/fefycosmetics/',
    image: 'images/instagram/ig-post-1.mp4',
    thumbnail: 'images/instagram/ig-post-1.mp4',
    caption: 'Con mi serum para todos lados! 🌿✨',
    likes: 0,
    comments: 0,
    type: 'reel'
  },
  {
    id: '2',
    url: 'https://www.instagram.com/fefycosmetics/',
    image: 'images/instagram/ig-post-2.png',
    thumbnail: 'images/instagram/ig-post-2.png',
    caption: 'Fefy Cosmetics - Productos naturales',
    likes: 0,
    comments: 0,
    type: 'photo'
  },
  {
    id: '3',
    url: 'https://www.instagram.com/fefycosmetics/',
    image: 'images/instagram/ig-post-3.png',
    thumbnail: 'images/instagram/ig-post-3.png',
    caption: 'Cuidado natural para tu piel 💧',
    likes: 0,
    comments: 0,
    type: 'photo'
  },
  {
    id: '4',
    url: 'https://www.instagram.com/fefycosmetics/',
    image: 'images/instagram/ig-post-4.mp4',
    thumbnail: 'images/instagram/ig-post-4.mp4',
    caption: 'Shampoo sólido - Sin sal, sin silicona, 100% natural 🧼',
    likes: 0,
    comments: 0,
    type: 'reel'
  }
];

if (typeof window !== 'undefined') {
  window.FEFY_INSTAGRAM_POSTS = FEFY_INSTAGRAM_POSTS;
}
