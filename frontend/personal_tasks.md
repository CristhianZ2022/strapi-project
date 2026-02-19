# 📝 Lista de Tareas Personal para Mejorar el Proyecto

Este archivo es solo para tu uso personal y no se subirá al repositorio. Ve marcando las tareas a medida que las completes.

---

## 🟢 Nivel Fácil (Easy)

Estas tareas son para calentar motores y mejorar la UX básica.

- [ ] **1. Títulos de Página Dinámicos**
      _Objetivo:_ Que la pestaña del navegador muestre el nombre de la página actual (ej. "Dashboard | Mi App" en lugar de solo "Mi App").
  <details>
  <summary>💡 Opciones / Pistas</summary>
  - **Opción A (Recomendada):** Usa la API `generateMetadata` de Next.js 16 en cada `page.tsx` o `layout.tsx`.
  - **Opción B:** Configura un `template` en el `metadata` del `layout.tsx` raíz para que añada un sufijo automáticamente.
  - **Recurso:** [Next.js Metadata Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
  </details>

- [ ] **2. Skeletons de Carga**
      _Objetivo:_ Mostrar una estructura de "esqueleto" gris mientras cargan los datos de los clientes, en lugar de un spinner o nada.
  <details>
  <summary>💡 Opciones / Pistas</summary>
  - **Opción A:** Crea un componente `UsersSkeleton` con `div`s grises animados usando Tailwind (`animate-pulse`).
  - **Opción B:** Usa `shadcn/ui` (si está instalado o puedes instalarlo) que ya tiene un componente `Skeleton`.
  - **Implementación:** Muestra este componente condicionalmente en `useClients` cuando `isLoading` es `true`.
  </details>

- [ ] **3. Botón "Volver Arriba"**
      _Objetivo:_ Un botón flotante que aparezca cuando haces scroll hacia abajo y te lleve al inicio de la página suavemente.
  <details>
  <summary>💡 Opciones / Pistas</summary>
  - **Lógica:** Usa un `useEffect` para escuchar el evento `scroll` del `window`.
  - **Estilo:** `position: fixed`, `bottom: 4`, `right: 4`.
  - **Acción:** `window.scrollTo({ top: 0, behavior: 'smooth' })`.
  </details>

---

## 🟡 Nivel Medio (Medium)

Tareas que requieren un poco más de lógica y manejo de estado.

- [ ] **4. Debounce en el Buscador**
      _Objetivo:_ Que el buscador de clientes no haga una petición a la API por cada letra que escribes, sino que espere unos 300-500ms a que termines de escribir.
  <details>
  <summary>💡 Opciones / Pistas</summary>
  - **Opción A:** Usa un hook personalizado `useDebounce` que reciba el valor del input y el retardo.
  - **Opción B:** Usa una librería como `lodash.debounce` (o implementa una función simple de debounce).
  - **Beneficio:** Reduce drásticamente las llamadas innecesarias al backend.
  </details>

- [ ] **5. Paginación de Clientes**
      _Objetivo:_ Si tienes 100 clientes, no mostrarlos todos de golpe. Mostrar de 10 en 10.
  <details>
  <summary>💡 Opciones / Pistas</summary>
  - **Backend:** Strapi ya soporta paginación por defecto (`page` y `pageSize`).
  - **Frontend:** Necesitas guardar el número de página actual en un estado (`useState`).
  - **UI:** Botones "Anterior" y "Siguiente" que actualicen ese estado y vuelvan a llamar al hook `useClients` (pasándole el número de página).
  </details>

- [ ] **6. Ordenamiento de Tablas**
      _Objetivo:_ Poder hacer clic en "Nombre" o "Ciudad" en la tabla y que ordene ascendente/descendente.
  <details>
  <summary>💡 Opciones / Pistas</summary>
  - **Backend:** Strapi soporta `sort` (ej. `sort=nombres:asc`).
  - **Frontend:** Estado para `sortField` y `sortOrder`.
  - **UI:** Iconos de flechas en los headers de la tabla que cambien el estado y disparen el fetch.
  </details>

---

## 🔴 Nivel Difícil (Hard)

Retos complejos que tocan backend, frontend avanzado o nuevas librerías.

- [ ] **7. Exportar Clientes a CSV/Excel**
      _Objetivo:_ Un botón que descargue la lista actual de clientes (o todos) en un archivo `.csv` o `.xlsx`.
  <details>
  <summary>💡 Opciones / Pistas</summary>
  - **Opción A (Frontend puro):** Traer todos los datos al cliente y usar una librería como `xlsx` o crear un Blob de texto con formato CSV y forzar la descarga.
  - **Opción B (Backend):** Crear un endpoint personalizado en Strapi que genere el archivo y lo devuelva como stream.
  </details>

- [ ] **8. Dashboard de Estadísticas (Gráficos)**
      _Objetivo:_ Una página nueva `/dashboard/stats` que muestre gráficos: Clientes por Ciudad, Clientes Activos vs Inactivos.
  <details>
  <summary>💡 Opciones / Pistas</summary>
  - **Librería de Gráficos:** `Recharts` es muy popular en React y fácil de usar.
  - **Datos:** Necesitarás procesar los datos de los clientes para agruparlos (ej. contar cuántos hay por cada ciudad) o pedirle a Strapi que te de esos conteos (posiblemente requiera un controller custom en Strapi).
  </details>

- [ ] **9. Modo Oscuro / Claro (Persistente)**
      _Objetivo:_ Implementar un toggle de tema que cambie toda la UI y recuerde la preferencia del usuario.
  <details>
  <summary>💡 Opciones / Pistas</summary>
  - **Herramienta:** `next-themes` es el estándar para esto en Next.js.
  - **Tailwind:** Asegúrate de que `darkMode: 'class'` esté configurado (o por defecto en v4) y usa las clases `dark:bg-slate-900`, etc.
  - **Reto:** Evitar el "flash of unstyled content" (FOUC) al recargar la página.
  </details>

---

¡Ánimo! Completar estas tareas llevará tu proyecto al siguiente nivel profesional. 🚀
