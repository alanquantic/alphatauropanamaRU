# Prompt para clonar una página WordPress a React

Usa este prompt exactamente o adáptalo cambiando la URL, la ruta y el nombre de la página:

```md
Necesito que clones localmente la página `https://jessicahandal.com/` dentro de este proyecto React/Vite y que el resultado quede independiente del WordPress original.

Requisitos:

1. Haz un mirror local completo de esa página:
   - descarga HTML, CSS, fuentes, imágenes, videos y assets necesarios
   - guarda todo localmente dentro del proyecto
   - no dejes dependencias visuales del sitio en producción

2. Convierte la página espejada a React JSX:
   - crea una página real en `src/pages/jessicahandal/MirroredPage.jsx`
   - conserva el layout pixel a pixel lo más fiel posible
   - respeta orden de elementos, imágenes, textos, tamaños, paddings, margins y estructura original
   - corrige atributos inválidos de JSX si aparecen (`class` a `className`, `for` a `htmlFor`, `autoplay` a `autoPlay`, etc.)
   - corrige textos con acentos o problemas de encoding

3. Assets:
   - mueve o conserva los assets en una carpeta local tipo `public_clean/jessicahandal`
   - actualiza todas las rutas para que carguen desde local
   - asegúrate de que si elimino el WordPress original la página React siga viéndose bien

4. CSS y comportamiento visual:
   - conserva los estilos originales lo más exacto posible
   - si hay partes que en WordPress dependían de JS de Elementor, MetForm o plugins, replícalas en JSX para que visualmente se vean igual
   - si un formulario o bloque dinámico no aparece porque WordPress lo inyectaba con JS, reconstruye el markup necesario en React para que el estilo original sí aplique

5. Integración:
   - conecta la nueva página en `src/App.jsx`
   - si hace falta, agrega o ajusta rutas para que funcione con Vercel al refrescar
   - deja la página lista para editarse desde React, no desde HTML crudo

6. Limpieza:
   - una vez que el JSX quede funcionando, elimina los HTML intermedios que ya no se usen
   - no dejes páginas finales renderizadas desde `body.html`
   - el resultado final debe vivir en JSX y CSS dentro de `src/pages/...`

7. Validación:
   - compila con `npm run build`
   - corrige cualquier error de React o JSX
   - al final dime exactamente qué archivos quedaron como fuente editable principal

Importante:
- no hagas una reinterpretación del diseño, lo necesito como clon visual
- no quiero que React cargue la web remota; todo debe quedar hospedable localmente
- si detectas diferencias visuales, ajústalas comparando contra la página original
- antes de editar, revisa bien estructura, espaciados, hero, header, formularios y footer

Al terminar:
- resume qué clonaste
- indica qué assets quedaron locales
- indica qué HTML eliminaste
- confirma si ya no depende del WordPress original
```

## Versión corta

```md
Clona `URL_DE_LA_PAGINA` a este proyecto React como una copia visual local exacta. Haz mirror de assets, convierte el HTML a JSX editable en `src/pages/...`, conecta la ruta en React, deja todos los assets locales, elimina los HTML intermedios que ya no se usen y valida con `npm run build`. No quiero que cargue la página remota ni una reinterpretación del diseño: lo necesito lo más pixel-perfect posible.
```
