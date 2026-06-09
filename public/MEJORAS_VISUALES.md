# 🎨 Mejoras Visuales y Estructurales - Fefy Cosmetics

> Guía visual de implementación para las mejoras críticas

---

## 1. PÁGINA DE PRODUCTO (PDP) - Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER (Fijo)                                                  │
│  [Logo]    [Search]    [Account] [Wishlist] [Cart]              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  BREADCRUMBS: Inicio > Cuidado Facial > Serums                  │
│                                                                 │
│  ┌──────────────────────┐  ┌──────────────────────────────┐     │
│  │                      │  │ SERUM VITAMINA C ILUMINADOR  │     │
│  │   [Imagen Principal] │  │ ⭐⭐⭐⭐⭐ (128 reviews)      │     │
│  │                      │  │                              │     │
│  │   [●] [○] [○] [○]   │  │ €34.90                      │     │
│  │   Miniaturas        │  │ o €29.67 con suscripción    │     │
│  │                      │  │                              │     │
│  │   🔍 Zoom           │  │ [Seleccionar tamaño:]       │     │
│  │                      │  │ [30ml] [50ml] [100ml]       │     │
│  │                      │  │                              │     │
│  │                      │  │ Cantidad: [-] 1 [+]         │     │
│  │                      │  │                              │     │
│  │                      │  │ [🛒 AÑADIR AL CARRITO]      │     │
│  │                      │  │ [⚡ COMPRAR AHORA]          │     │
│  │                      │  │                              │     │
│  │                      │  │ ♡ Añadir a favoritos        │     │
│  │                      │  │ 🚚 Envío gratis >€50        │     │
│  │                      │  │ 🎁 3 muestras gratis         │     │
│  └──────────────────────┘  └──────────────────────────────┘     │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  DESCRIPCIÓN  |  INGREDIENTES  |  REVIEWS  |  ENVÍOS   │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │                                                         │   │
│  │  ✨ BENEFICIOS                                          │   │
│  │  • Ilumina y unifica el tono de piel                   │   │
│  │  • Reduce manchas y signos de fatiga                   │   │
│  │  • Potente antioxidante                                  │   │
│  │                                                         │   │
│  │  Serum con 15% Vitamina C pura formulado con...         │   │
│  │                                                         │   │
│  │  [VER MÁS DETALLES ↓]                                   │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🎬 VIDEO DEL PRODUCTO                                  │   │
│  │  [▶ Play] Ver textura y aplicación                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ⭐ REVIEWS DE CLIENTES                                  │   │
│  │  4.8/5 estrellas - 128 opiniones                         │   │
│  │                                                         │   │
│  │  ┌─────────────────┐ ┌─────────────────┐                │   │
│  │  │ ⭐⭐⭐⭐⭐       │ │ ⭐⭐⭐⭐⭐       │                │   │
│  │  │ "Increíble..."  │ │ "Mi piel nunca │                │   │
│  │  │ - María G.      │ │ se vio tan     │                │   │
│  │  │ ✅ Verificado   │ │ radiante"      │                │   │
│  │  │ 📷 Foto incl.   │ │ - Laura M.     │                │   │
│  │  └─────────────────┘ └─────────────────┘                │   │
│  │                                                         │   │
│  │  [VER TODAS LAS OPINIONES]                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🛍️ COMPLETA TU RUTINA                                  │   │
│  │  Compra los 3 y ahorra 15%                              │   │
│  │  [Producto 1] + [Producto 2] + [Producto 3] = €89      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. COMPONENTES UI - Especificaciones

### Botón Primario (Add to Cart)
```css
/* Estado Normal */
background: linear-gradient(135deg, #FFB6C1 0%, #E8A4B8 100%);
color: #FFFFFF;
border-radius: 50px;
padding: 16px 32px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 1px;
box-shadow: 0 4px 15px rgba(255, 182, 193, 0.4);
transition: all 0.3s ease;

/* Hover */
transform: translateY(-2px);
box-shadow: 0 8px 25px rgba(255, 182, 193, 0.5);

/* Active/Click */
transform: translateY(0) scale(0.98);
```

### Tarjeta de Producto Mejorada
```css
.product-card {
  background: #FFFFFF;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(255, 182, 193, 0.2);
}

/* Badge flotante */
.product-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #FFB6C1, #E8A4B8);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  z-index: 2;
}

/* Acciones flotantes (aparecen en hover) */
.product-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s ease;
}

.product-card:hover .product-actions {
  opacity: 1;
  transform: translateX(0);
}
```

### Sistema de Reviews
```css
.review-card {
  background: #FAFAFA;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #F0F0F0;
}

.review-stars {
  color: #FFD700; /* Dorado */
  font-size: 14px;
}

.review-verified {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #22C55E;
  font-size: 12px;
  font-weight: 500;
}

.review-photo {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  margin-top: 12px;
}
```

---

## 3. QUIZ DE PERSONALIZACIÓN - Flujo

```
┌─────────────────────────────────────────────────────────────┐
│  ENCUESTA: ENCUENTRA TU RUTINA IDEAL                        │
│  Paso 2 de 5                                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ¿Qué tipo de piel tienes?                                  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  😊                                                 │   │
│  │  NORMAL                                             │   │
│  │  Equilibrada, ni muy seca ni muy grasa              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  💧                                                 │   │
│  │  SECA                                               │   │
│  │  Tirante, descamación, necesita hidratación         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ✨                                                 │   │
│  │  GRASA                                              │   │
│  │  Brillo en zona T, poros dilatados                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🌸                                                 │   │
│  │  MIXTA                                              │   │
│  │  Seca en mejillas, grasa en frente/nariz            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🌿                                                 │   │
│  │  SENSIBLE                                           │   │
│  │  Se irrita fácilmente, reactiva                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│              [ANTERIOR]        [SIGUIENTE →]                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Resultado Final:**
```
┌─────────────────────────────────────────────────────────────┐
│  TU RUTINA PERSONALIZADA 🌟                                  │
│                                                             │
│  Según tu piel MIXTA y preocupación ANTI-EDAD:              │
│                                                             │
│  RUTINA DE MAÑANA                                           │
│  1. Gel Limpiador Suave    - €22.90                        │
│  2. Serum Vitamina C       - €34.90  ⭐ Bestseller          │
│  3. Crema Hidratante Ligera - €29.90                       │
│                                                             │
│  RUTINA DE NOCHE                                            │
│  1. Gel Limpiador Suave    - €22.90                        │
│  2. Serum Retinol Natural  - €38.90                        │
│  3. Crema Regeneradora     - €42.90                        │
│                                                             │
│  ─────────────────────────────────────────────────────     │
│  Total: €169.50    Tu precio: €144.10 (-15%)               │
│                                                             │
│  [🛒 COMPRAR RUTINA COMPLETA]                               │
│  [📧 ENVIAR A MI EMAIL]                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. CHECKOUT OPTIMIZADO - 3 Pasos

### Paso 1: Información y Envío
```
┌─────────────────────────────────────────────────────────────┐
│  CHECKOUT                              [Logo]               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [1]────[2]────[3]                                          │
│   ●      ○      ○                                           │
│  INFO   PAGO  CONFIRM                                       │
│                                                             │
│  ┌────────────────────────┐  ┌─────────────────────────┐    │
│  │ CONTACTO               │  │ RESUMEN DEL PEDIDO      │    │
│  │                        │  │                         │    │
│  │ Email:                 │  │ Serum Vitamina C   €34.90│   │
│  │ [email@ejemplo.com   ] │  │ x1                      │    │
│  │                        │  │                         │    │
│  │ [✓ Quiero recibir...]  │  │ ───────────────────────│    │
│  │                        │  │ Subtotal:          €34.90│   │
│  │ ENVÍO                  │  │ Envío:              €0.00│   │
│  │                        │  │ ───────────────────────│    │
│  │ Nombre: [          ]   │  │ TOTAL:             €34.90│   │
│  │ Apellidos: [       ]   │  │                         │    │
│  │ Dirección: [       ]   │  │ [Código promocional  ]  │    │
│  │ Ciudad: [          ]   │  │                         │    │
│  │ CP: [     ]            │  │                         │    │
│  │ Teléfono: [        ]   │  │                         │    │
│  │                        │  │                         │    │
│  │ Método de envío:       │  │                         │    │
│  │ ○ Estándar (3-5 días)  │  │                         │    │
│  │ ● Express (24-48h) +€5 │  │                         │    │
│  │                        │  │                         │    │
│  │      [CONTINUAR →]     │  │                         │    │
│  └────────────────────────┘  └─────────────────────────┘    │
│                                                             │
│  🔒 Pago seguro SSL    💳 Métodos: Visa MC PayPal...       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Paso 2: Pago
```
┌─────────────────────────────────────────────────────────────┐
│  [1]────[2]────[3]                                          │
│   ✓      ●      ○                                           │
│                                                             │
│  PAGO                                                       │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  Tarjeta de crédito/débito                         │   │
│  │  [●]                                                │   │
│  │                                                     │   │
│  │  [Número de tarjeta      ] [MM/AA  ] [CVC   ]      │   │
│  │                                                     │   │
│  │  [Nombre en la tarjeta                          ]  │   │
│  │                                                     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                     │   │
│  │  PayPal                                            │   │
│  │  [○] [PayPal Logo]                                 │   │
│  │                                                     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                     │   │
│  │  Google Pay                                        │   │
│  │  [○] [G Pay Logo]                                  │   │
│  │                                                     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                     │   │
│  │  💳 Pago en 3 cuotas sin intereses con Klarna      │   │
│  │  [○] 3 x €11.63/mes                               │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [← VOLVER]              [PAGAR €34.90 →]                   │
│                                                             │
│  🔒 Transacción segura encriptada                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. CHATBOT FLOTANTE

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                          ┌─────────────────────────────┐   │
│                          │  💬 ¿Necesitas ayuda?       │   │
│                          │  Te ayudo a encontrar tu    │   │
│                          │  producto ideal             │   │
│                          │                             │   │
│                          │  [Empezar chat]             │   │
│                          └─────────────────────────────┘   │
│                                                             │
│     ┌─────────┐                                             │
│     │   🤖    │                                             │
│     │  Fefy   │                                             │
│     │  Bot    │                                             │
│     └─────────┘                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘

/* Chat abierto */
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────────────────────────────────┐               │
│  │  Fefy Assistant              [_] [X]   │               │
│  ├─────────────────────────────────────────┤               │
│  │                                         │               │
│  │  🤖 Hola, soy tu asistente virtual.    │               │
│  │     ¿En qué puedo ayudarte hoy?        │               │
│  │                                         │               │
│  │  ┌─────────────────────────────────┐   │               │
│  │  │ 💁‍♀️ Buscar productos            │   │               │
│  │  ├─────────────────────────────────┤   │               │
│  │  │ 🧴 Recomendarme una rutina      │   │               │
│  │  ├─────────────────────────────────┤   │               │
│  │  │ 📦 Estado de mi pedido          │   │               │
│  │  ├─────────────────────────────────┤   │               │
│  │  │ 💬 Hablar con una experta       │   │               │
│  │  └─────────────────────────────────┘   │               │
│  │                                         │               │
│  │  ─────────────────────────────────────  │               │
│  │  [Escribe tu mensaje...        ] [➤]  │               │
│  │                                         │               │
│  └─────────────────────────────────────────┘               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. SISTEMA DE SUSCRIPCIÓN

```
┌─────────────────────────────────────────────────────────────┐
│  SELECCIONA TU OPCIÓN                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  ○ Compra única: €34.90                            │   │
│  │                                                     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  🌟 MÁS POPULAR                                     │   │
│  │                                                     │   │
│  │  ● Suscribirse y ahorrar 15%                       │   │
│  │                                                     │   │
│  │    €29.67 / envío                                  │   │
│  │                                                     │   │
│  │    [Cada 30 días ▼]                                │   │
│  │                                                     │   │
│  │    ✓ Envío siempre gratis                          │   │
│  │    ✓ 15% descuento permanente                      │   │
│  │    ✓ Regalo sorpresa cada 3 envíos                 │   │
│  │    ✓ Pausa o cancela cuando quieras                │   │
│  │                                                     │   │
│  │    [🎁 SUSCRIBIRME]                                │   │
│  │                                                     │   │
│  │    💡 Ahorras €61.56 al año                        │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [ℹ️ ¿Cómo funciona la suscripción?]                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. NOTIFICACIONES SOCIAL PROOF

```
/* Toast notification flotante */
┌────────────────────────────────────────┐
│  🛒 María de Madrid acaba de comprar   │
│     Serum Vitamina C                   │
│                            hace 2 min  │
└────────────────────────────────────────┘

/* Urgencia stock */
┌────────────────────────────────────────┐
│  ⚠️ ¡Solo quedan 3 unidades!           │
│     12 personas están viendo esto      │
└────────────────────────────────────────┘

/* Envío gratis progreso */
┌────────────────────────────────────────┐
│  🚚 ¡Te faltan €15.10 para envío gratis!│
│  ████████████████░░░░░░░░  €34.90/€50  │
│  Agrega algo más →                     │
└────────────────────────────────────────┘
```

---

## 8. PROGRAMA DE LEALTAD - Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  MI CUENTA - FEFY REWARDS 🌸                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  Nivel: ✨ ORO                                      │   │
│  │  450 puntos                                         │   │
│  │                                                     │   │
│  │  ████████████████████████░░░░░░  450/500           │   │
│  │  Te faltan 50 puntos para PLATINO                   │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  TUS PUNTOS: 450 = €22.50 de descuento                     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  CANJEAR PUNTOS                                     │   │
│  │                                                     │   │
│  │  [€5  ] [€10 ] [€15 ] [€20 ] [€25 ]                │   │
│  │   100    200    300    400    500   pts             │   │
│  │                                                     │   │
│  │        [CANJEAR €20 DE DESCUENTO]                   │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  GANA MÁS PUNTOS:                                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ 🛒 Comprar  │ │ ⭐ Review   │ │ 👥 Referir  │          │
│  │   1€ = 1pt  │ │   +50 pts   │ │   +100 pts  │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                             │
│  BENEFICIOS ORO:                                            │
│  ✓ Envío gratis siempre                                     │
│  ✓ 10% descuento permanente                                 │
│  ✓ Acceso anticipado a novedades                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. MODO OSCURO

```css
/* Variables para Dark Mode */
:root {
  /* Light mode (default) */
  --bg-primary: #FFFFFF;
  --bg-secondary: #FFF5F7;
  --text-primary: #1A1A1A;
  --text-secondary: #666666;
  --accent: #FFB6C1;
  --accent-dark: #E8A4B8;
  --card-bg: #FFFFFF;
  --border: #F0F0F0;
}

[data-theme="dark"] {
  --bg-primary: #1A1A1A;
  --bg-secondary: #2D2D2D;
  --text-primary: #FFFFFF;
  --text-secondary: #B0B0B0;
  --accent: #FFB6C1; /* Mantener rosa pero más brillante */
  --accent-dark: #FFD1DC;
  --card-bg: #252525;
  --border: #3D3D3D;
}
```

```
/* Preview Dark Mode */
┌─────────────────────────────────────────────────────────────┐
│ [🌙 Toggle]                                                 │
├─────────────────────────────────────────────────────────────┤
│  Dark Mode                                                  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  FEFY COSMETICS                                     │   │
│  │                                                     │   │
│  │  Descubre tu radiancia natural                      │   │
│  │                                                     │   │
│  │  [Descubrir Productos]                              │   │
│  │                                                     │   │
│  │  Productos en fondo oscuro #1A1A1A                  │   │
│  │  Texto blanco #FFFFFF                               │   │
│  │  Cards en #252525                                   │   │
│  │  Rosa más brillante para contrastar                 │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 10. FILTROS AVANZADOS

```
┌─────────────────────────────────────────────────────────────┐
│  FILTRAR PRODUCTOS                              [X]         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  TIPO DE PIEL                                               │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐            │
│  │Todas │ │Seca  │ │Grasa │ │Mixta │ │Sensib│            │
│  │  ✓   │ │      │ │  ✓   │ │      │ │      │            │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘            │
│                                                             │
│  PREOCUPACIÓN                                               │
│  ☑ Hidratación      ☐ Anti-edad       ☐ Acné             │
│  ☐ Manchas          ☑ Luminosidad     ☐ Poros            │
│                                                             │
│  INGREDIENTE CLAVE                                          │
│  [Buscar ingrediente...                      ]              │
│                                                             │
│  ☑ Vitamina C     ☐ Retinol       ☐ Ác. Hialurónico      │
│  ☐ Niacinamida    ☐ Péptidos      ☐ AHA/BHA              │
│                                                             │
│  PRECIO                                                     │
│  €0 ──────────────────────────────── €100                  │
│        [══════●────────────]                                │
│        €15              €45                                 │
│                                                             │
│  CERTIFICACIONES                                            │
│  ☑ Vegano         ☑ Cruelty-free    ☐ Orgánico            │
│                                                             │
│  VALORACIÓN                                                 │
│  ☑ 4★ y más                                               │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  [VER 24 RESULTADOS]         [LIMPIAR FILTROS]     │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Paleta de Colores Actualizada

```
PRIMARY PALETTE:
┌────────────┬────────────┬────────────┬────────────┐
│  #FFB6C1   │  #FFD1DC   │  #E8A4B8   │  #D18A9E   │
│  Principal │  Claro     │  Oscuro    │  Más oscuro│
│  (Rosa     │  (Fondo)   │  (Hover)   │  (Texto)   │
│  pastel)   │            │            │            │
└────────────┴────────────┴────────────┴────────────┘

ACCENT COLORS:
┌────────────┬────────────┬────────────┐
│  #D4AF37   │  #A8E6CF   │  #FF6B9D   │
│  Dorado    │  Verde     │  Rosa      │
│  (Reviews) │  (Éxito)   │  (Alerta)  │
└────────────┴────────────┴────────────┘

NEUTRALS:
┌────────────┬────────────┬────────────┬────────────┐
│  #1A1A1A   │  #666666   │  #F5F5F5   │  #FFFFFF   │
│  Texto     │  Secundario│  Fondo     │  Blanco    │
│  principal │            │            │            │
└────────────┴────────────┴────────────┴────────────┘
```

---

*Documento visual para guía de desarrollo - Fefy Cosmetics*
