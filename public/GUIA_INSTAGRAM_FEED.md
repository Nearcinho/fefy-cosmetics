# 📸 Guía Completa: Feed de Instagram en Fefy Cosmetics

## Opciones para Mostrar el Feed de @fefycosmetics

---

## 🌟 OPCIÓN 1: SnapWidget (RECOMENDADA - Gratuita)

La forma más fácil y rápida de mostrar tu feed de Instagram.

### Paso 1: Preparar la Cuenta de Instagram

**IMPORTANTE:** A partir de diciembre 2024, Instagram requiere que la cuenta sea **Business** o **Creator** (no personal).

#### Convertir @fefycosmetics a cuenta Business:

1. Abre Instagram en tu móvil
2. Ve al perfil @fefycosmetics
3. Toca el menú ☰ → **Configuración**
4. Ve a **Cuenta** → **Cambiar a cuenta profesional**
5. Selecciona **Negocio** (recomendado para ecommerce)
6. Elige una categoría: "Productos cosméticos" o "Belleza"
7. Conecta una página de Facebook (obligatorio)

### Paso 2: Crear Widget en SnapWidget

1. Ve a **https://snapwidget.com**
2. Crea una cuenta gratuita
3. Haz clic en **"Create Widget"**
4. Selecciona **Instagram** como fuente
5. Conecta la cuenta @fefycosmetics
6. Autoriza a SnapWidget (acepta todos los permisos)

### Paso 3: Configurar el Widget

| Opción | Valor Recomendado |
|--------|-------------------|
| **Widget Type** | Grid |
| **Columns** | 4 (Desktop) / 2 (Mobile) |
| **Rows** | 2 |
| **Photo Padding** | 8px |
| **Background Color** | Transparente |
| **Responsive** | ✅ Activado |
| **Image Size** | Medium |

#### Filtros Avanzados (Pro):
- Mostrar posts con más likes primero ✅
- Excluir ciertos hashtags
- Mostrar solo posts específicos

### Paso 4: Obtener el Código

1. Haz clic en **"Get Code"**
2. Copia el código iframe generado
3. Reemplaza en `instagram-feed.html`:

```html
<!-- REEMPLAZAR ESTO: -->
<div class="instagram-placeholder-widget">
    ...
</div>

<!-- POR EL CÓDIGO DE SNAPWIDGET: -->
<iframe src="https://snapwidget.com/embed/TU_ID" 
        class="snapwidget-widget" 
        allowtransparency="true" 
        frameborder="0" 
        scrolling="no" 
        title="Posts from Instagram">
</iframe>
```

---

## 🌟 OPCIÓN 2: LightWidget (Alternativa)

Similar a SnapWidget con más opciones de personalización.

1. Ve a **https://lightwidget.com**
2. Crea cuenta gratuita
3. Conecta @fefycosmetics
4. Configura:
   - **Layout:** Grid
   - **Columns:** 4
   - **Thumbnail Size:** 300px
   - **Hover Effect:** Show Info
5. Copia el código y pégalo en la web

---

## 🌟 OPCIÓN 3: Instagram Graph API (Avanzada)

Para desarrolladores que quieren control total.

### Requisitos:
- Cuenta de Instagram Business/Creator
- Página de Facebook vinculada
- Aplicación en Facebook Developers

### Pasos:

1. **Crear App en Facebook Developers:**
   - Ve a https://developers.facebook.com
   - Crea nueva app → Tipo: "Business"
   - Añade producto "Instagram Graph API"

2. **Obtener Access Token:**
   ```
   https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=TU_TOKEN
   ```

3. **Desarrollar componente JavaScript** para mostrar el feed

---

## 📊 Cómo Ver Posts con Más Likes

### Método 1: Instagram Insights (Nativo)

1. Ve al perfil @fefycosmetics
2. Toca **"Insights"** (barra superior)
3. Ve a **"Content You Shared"**
4. Ordena por **"Engagement"** o **"Likes"**
5. Identifica los posts top

### Método 2: Herramientas de Terceros

| Herramienta | Función | Precio |
|-------------|---------|--------|
| **Iconosquare** | Analytics completo | €29/mes |
| **Later** | Programación + Analytics | Gratis/Pago |
| **Hootsuite** | Gestión + Reportes | €49/mes |
| **Sprout Social** | Analytics avanzado | €89/mes |

### Método 3: Manual (Gratis)

1. Ve a tu perfil de Instagram
2. Revisa los últimos 20-30 posts
3. Anota los likes de cada uno
4. Crea lista de los top 8-12 posts
5. Actualiza cada mes

---

## 🎨 Personalización del Feed

### Posts Destacados Manuales (Mientras configuras widget)

Edita `instagram-feed.html` y reemplaza los posts de ejemplo:

```html
<!-- Post Destacado -->
<a href="URL_DEL_POST_REAL" target="_blank" class="featured-post" data-likes="X.Xk">
    <div class="post-image">
        <img src="URL_IMAGEN_POST.jpg" alt="Descripción">
    </div>
    <div class="post-overlay">
        <div class="post-stats">
            <span><i class="fas fa-heart"></i> X.Xk</span>
            <span><i class="fas fa-comment"></i> XX</span>
        </div>
        <p class="post-caption">Caption del post...</p>
    </div>
</a>
```

### Obtener URL de Posts Específicos:

1. Abre el post en Instagram (versión web)
2. Copia la URL: `https://www.instagram.com/p/CÓDIGO_DEL_POST/`
3. Pégala en el atributo `href`

---

## 📈 Posts que Deberías Destacar

Basado en análisis de cuentas similares, estos tipos de posts suelen tener mejor engagement:

### 🏆 Top Performers:

1. **Before/After** - Transformaciones de piel
2. **Producto en uso** - Videos cortos aplicando
3. **Urgency/Scarcity** - "Últimas unidades"
4. **Educational** - Tips de skincare
5. **UGC** - Clientes reales usando productos
6. **Behind the scenes** - Proceso de creación
7. **Giveaways** - Concursos/sorteos
8. **Testimonios** - Reviews de clientes

### 📊 Métricas a Seguir:

| Métrica | Bueno | Excelente |
|---------|-------|-----------|
| Likes | >500 | >2000 |
| Comentarios | >20 | >100 |
| Guardados | >50 | >200 |
| Compartidos | >10 | >50 |

---

## 🛠️ Implementación Técnica

### Opción A: Widget Automático (Recomendado)

```html
<!-- En index.html, reemplazar la sección instagram actual por: -->
<iframe src="https://snapwidget.com/embed/TU_ID" 
        style="width:100%; height:500px; border:none; overflow:hidden;"
        allowtransparency="true" 
        frameborder="0" 
        scrolling="no">
</iframe>
```

### Opción B: Posts Destacados Manuales

He creado `instagram-feed.html` con:
- 4 posts destacados con overlay de likes
- Sección de UGC (User Generated Content)
- Hashtag #FefyCosmetics
- CTA para seguir en Instagram

### Integrar en index.html:

```html
<!-- Reemplazar la sección instagram actual -->
<section class="instagram" id="instagram">
    <!-- Copiar contenido de instagram-feed.html -->
</section>
```

---

## ✅ Checklist de Implementación

- [ ] Convertir cuenta a Business/Creator
- [ ] Crear cuenta en SnapWidget
- [ ] Conectar Instagram a SnapWidget
- [ ] Configurar widget (4 columnas, 2 filas)
- [ ] Obtener código embed
- [ ] Pegar código en la web
- [ ] Verificar responsive en móvil
- [ ] Actualizar posts destacados manualmente
- [ ] Añadir hashtag #FefyCosmetics
- [ ] Crear CTA final

---

## 🚨 Solución de Problemas

### "No puedo conectar Instagram a SnapWidget"
- ✅ Verifica que la cuenta sea Business/Creator
- ✅ Desvincula y vuelve a vincular Facebook
- ✅ Revoca acceso en Instagram → Configuración → Apps y webs

### "El widget no se actualiza"
- ✅ Los widgets gratuitos se actualizan cada 2-6 horas
- ✅ Verifica que el token no haya expirado
- ✅ Reconecta la cuenta en SnapWidget

### "Aparece error de API"
- ✅ Instagram Basic Display API fue discontinuada en diciembre 2024
- ✅ Solo funciona con cuentas Business/Creator vía Graph API

---

## 💡 Tips para Maximizar Engagement

1. **Postea consistentemente** - 4-7 veces por semana
2. **Usa hashtags estratégicos:**
   - #FefyCosmetics (branded)
   - #SkincareRoutine
   - #NaturalCosmetics
   - #CrueltyFreeBeauty
   - #SkincareEspaña

3. **Mejores horarios para postear (España):**
   - Lunes-Viernes: 12:00-13:00 y 19:00-21:00
   - Fines de semana: 10:00-12:00

4. **Tipos de contenido más virales:**
   - Reels: 15-30 segundos
   - Carousels: 3-5 slides educativos
   - Stories diarias: 3-5 stories

---

## 📞 Soporte

| Servicio | Soporte |
|----------|---------|
| SnapWidget | help@snapwidget.com |
| Instagram | Centro de Ayuda Instagram |

---

**¡Listo! Una vez configurado, tu feed de Instagram se mostrará automáticamente en la web.** 🌸📸
