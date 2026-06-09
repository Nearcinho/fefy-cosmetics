/**
 * FEFY COSMETICS - Posts de Instagram (@fefycosmetics)
 *
 * INSTRUCCIONES para agregar posts reales:
 * 1. Ve a https://www.instagram.com/fefycosmetics/
 * 2. Descarga la imagen de cada post que quieras mostrar
 *    (botón derecho → "Guardar imagen como...")
 * 3. Guarda las imágenes en: public/images/instagram/
 *    Con nombres descriptivos: post-1.jpg, post-2.jpg, etc.
 * 4. Copia el enlace del post (ej: https://www.instagram.com/p/ABC123/)
 * 5. Agrega un objeto al array de abajo con los datos reales
 *
 * Ejemplo:
 * {
 *   id: '1',
 *   url: 'https://www.instagram.com/p/ABC123DEF/',
 *   image: 'images/instagram/post-1.jpg',
 *   thumbnail: 'images/instagram/post-1.jpg',
 *   caption: 'Nueva crema hidratante ✨ disponible ya en la web',
 *   likes: 1240,
 *   comments: 89,
 *   type: 'photo' // 'photo', 'carousel', o 'reel'
 * }
 */

const FEFY_INSTAGRAM_POSTS = [
  // Agrega aquí los posts reales de @fefycosmetics siguiendo las instrucciones de arriba.
  // Mientras esté vacío, la sección mostrará un CTA para seguir la cuenta.
];

if (typeof window !== 'undefined') {
  window.FEFY_INSTAGRAM_POSTS = FEFY_INSTAGRAM_POSTS;
}
