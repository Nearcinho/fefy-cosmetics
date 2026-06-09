# 🌸 Fefy Cosmetics - Mercado Pago Checkout Pro

[![Website](https://img.shields.io/badge/Website-Live-pink?style=flat-square)](https://fefy-cosmetics.vercel.app)
[![Mercado Pago](https://img.shields.io/badge/Pago-Mercado%20Pago-00B1EA?style=flat-square&logo=mercadopago)](https://www.mercadopago.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

> **Cosmética Natural de Lujo** - Tienda online con pagos seguros mediante Mercado Pago Checkout Pro.

---

## ✨ Características

- 🎨 **Diseño Premium** - Estética elegante con tonos rosa pastel
- 📱 **Totalmente Responsive** - Adaptable a todos los dispositivos
- 🛒 **Carrito de Compras** - Funcionalidad completa con localStorage
- 💳 **Mercado Pago Checkout Pro** - Pagos seguros sin capturar tarjetas
- 🔔 **Webhooks** - Confirmación automática de pagos
- 🔄 **Páginas de Retorno** - Éxito, pendiente y fallo
- 💝 **Wishlist** - Guarda tus productos favoritos
- 📧 **Newsletter** - Suscripción con validación
- 🔍 **SEO Optimizado** - Meta tags y estructura semántica

---

## 🚀 Stack Tecnológico

| Tecnología | Descripción |
|------------|-------------|
| HTML5 | Estructura semántica moderna |
| CSS3 | Flexbox, Grid, Variables CSS, Animaciones |
| JavaScript | ES6+, Interacciones dinámicas |
| Node.js | Runtime para backend |
| Mercado Pago SDK | Integración de pagos |
| Vercel | Hosting con serverless functions |

---

## 📁 Estructura del Proyecto

```
fefy-cosmetics/
├── api/
│   ├── create-preference.js    # API: Crea preferencia de pago en MP
│   └── webhook.js              # API: Recibe notificaciones IPN
├── public/
│   ├── data/
│   │   └── products.js         # Catálogo de productos (fuente de verdad)
│   ├── index.html              # Página principal
│   ├── product.html            # Página de producto
│   ├── checkout.html           # Checkout con resumen
│   ├── pago-exitoso.html       # Página de pago aprobado
│   ├── pago-pendiente.html     # Página de pago pendiente
│   ├── pago-fallido.html       # Página de pago rechazado
│   ├── quiz.html               # Quiz de rutina
│   ├── instagram-feed.html     # Feed de Instagram
│   ├── styles.css              # Estilos globales
│   ├── checkout-styles.css     # Estilos de checkout
│   ├── product-styles.css      # Estilos de producto
│   ├── script.js               # JavaScript principal
│   ├── checkout-script.js      # Lógica de checkout
│   └── product-script.js       # Lógica de producto
├── .env.example                # Variables de entorno de ejemplo
├── package.json                # Dependencias
├── vercel.json                 # Configuración de Vercel
└── README.md                   # Documentación
```

---

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (NO lo subas al repositorio):

```env
# Mercado Pago (obligatorias)
MERCADOPAGO_ACCESS_TOKEN=TEST-xxxxxxxx...
MERCADOPAGO_PUBLIC_KEY=TEST-xxxxxxxx...

# Webhook secreto opcional
MERCADOPAGO_WEBHOOK_SECRET=

# URL del sitio
SITE_URL=https://fefy-cosmetics.vercel.app

# Moneda
CURRENCY=EUR

# Entorno
NODE_ENV=production
```

### Cómo obtener credenciales de Mercado Pago

1. Ve a [Mercado Pago Developers](https://www.mercadopago.com/developers)
2. Inicia sesión con tu cuenta de Mercado Pago
3. Ve a **Tu aplicación > Credenciales**
4. Copia el **Access Token** y la **Public Key**
5. Pega los valores en tu archivo `.env`

---

## 🛠️ Instalación Local

### Requisitos
- Node.js 18+
- Cuenta en [Vercel](https://vercel.com)

### Pasos

1. **Clona el repositorio**
```bash
git clone https://github.com/Nearcinho/fefy-cosmetics.git
cd fefy-cosmetics
```

2. **Instala dependencias**
```bash
npm install
```

3. **Configura variables de entorno**
```bash
cp .env.example .env
# Edita .env con tus credenciales reales
```

4. **Ejecuta en desarrollo**
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

---

## 🚀 Deploy en Vercel

1. **Instala Vercel CLI**
```bash
npm i -g vercel
```

2. **Login y deploy**
```bash
vercel login
vercel --prod
```

3. **Configura variables de entorno en Vercel**
- Ve al dashboard de tu proyecto en Vercel
- Ve a **Settings > Environment Variables**
- Agrega cada variable del archivo `.env`

4. **Configura el webhook en Mercado Pago**
- Ve a [Mercado Pago Developers](https://www.mercadopago.com/developers)
- Edita tu aplicación
- En **Webhooks**, agrega la URL:
  ```
  https://tu-dominio.vercel.app/api/webhook
  ```
- Selecciona el evento `payment`

---

## 🧪 Testing

### Probar en modo Sandbox

Mercado Pago proporciona tarjetas de prueba para simular diferentes escenarios:

| Tarjeta | Número | CVV | Fecha | Resultado |
|---------|--------|-----|-------|-----------|
| Mastercard | 5031 7557 3453 0604 | 123 | 11/30 | Aprobado |
| Visa | 4509 9535 6623 3704 | 123 | 11/30 | Aprobado |
| American Express | 3711 803032 57522 | 1234 | 11/30 | Aprobado |
| Mastercard | 5031 7557 3453 0604 | 123 | 11/30 | Rechazado* |

*Para rechazado, usa un monto como `10000.00` o un CVV `002`.

### Escenarios de prueba

1. **Compra aprobada**
   - Agrega productos al carrito
   - Clic en "Pagar con Mercado Pago"
   - Usa tarjeta de prueba aprobada
   - Deberías llegar a `/pago-exitoso`

2. **Compra pendiente**
   - En MP, selecciona "Pago en efectivo" o "Transferencia"
   - Deberías llegar a `/pago-pendiente`

3. **Compra fallida**
   - Usa tarjeta con fondos insuficientes
   - Deberías llegar a `/pago-fallido`

4. **Carrito vacío**
   - Intenta pagar con carrito vacío
   - Debería mostrar error

5. **Webhook**
   - Realiza un pago
   - Verifica los logs de Vercel para ver la notificación recibida

---

## 🔒 Seguridad

- ✅ Access Token nunca expuesto en frontend
- ✅ Validación de precios en backend (catálogo local)
- ✅ No se capturan datos de tarjeta en la web
- ✅ El pago se procesa en Mercado Pago
- ✅ Webhooks validan estado real del pago
- ✅ HTTPS obligatorio en producción

---

## 📋 Flujo de Compra

1. Usuario navega productos en `index.html`
2. Agrega productos al carrito (localStorage)
3. Clic en "Pagar con Mercado Pago"
4. Frontend envía carrito a `/api/create-preference`
5. Backend valida productos contra catálogo
6. Backend crea preferencia en Mercado Pago
7. Usuario es redirigido al checkout seguro de MP
8. Usuario completa el pago en MP
9. MP redirige a `/pago-exitoso`, `/pago-pendiente` o `/pago-fallido`
10. MP envía webhook a `/api/webhook`
11. Backend registra y procesa el pago

---

## 📝 Notas Importantes

### Migración desde GitHub Pages
Este proyecto fue migrado desde GitHub Pages a Vercel porque **GitHub Pages no soporta backend**. Mercado Pago Checkout Pro requiere un servidor seguro para crear preferencias y recibir webhooks.

### Catálogo de productos
Los productos y precios se definen en:
- `public/data/products.js` (frontend)
- `api/create-preference.js` (backend - validación)

Si agregas/modificas productos, actualiza **ambos archivos**.

### Pasar a producción
1. Cambia las credenciales de Mercado Pago a producción
2. Actualiza `SITE_URL` a tu dominio real
3. Configura el webhook con la URL de producción
4. Cambia `NODE_ENV=production`

---

## 🔗 Links

- 🌐 **Website**: [https://fefy-cosmetics.vercel.app](https://fefy-cosmetics.vercel.app)
- 📸 **Instagram**: [@fefycosmetics](https://instagram.com/fefycosmetics)
- 💼 **GitHub**: [nearcinho](https://github.com/nearcinho)
- 💳 **Mercado Pago Developers**: [developers.mercadopago.com](https://www.mercadopago.com/developers)

---

## 📝 Licencia

Este proyecto está desarrollado exclusivamente para **Fefy Cosmetics**.

Copyright © 2024 Fefy Cosmetics. Todos los derechos reservados.

---

<p align="center">
  <strong>Hecho con 💖 y 🌿 ingredientes naturales</strong>
</p>
