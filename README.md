# Surco Adopta - Sitio de Adopción de Mascotas

Surco Adopta es una aplicación web diseñada para conectar familias amorosas con perros y gatos que necesitan un hogar. El sitio permite explorar mascotas disponibles, conocer su información detallada y seguir un proceso de adopción sencillo.

## Tabla de Contenidos

- [Demo](#demo)  
- [Características](#características)  
- [Tecnologías](#tecnologías)  
- [Instalación](#instalación)  
- [Uso](#uso)  
- [Estructura del Proyecto](#estructura-del-proyecto)  
- [Contribución](#contribución)  
- [Licencia](#licencia)  

## Demo

El sitio permite a los usuarios:

- Explorar perros y gatos disponibles para adopción.  
- Filtrar mascotas por tipo (perro/gato) y categoría (cachorro/adulto).  
- Ver información detallada de cada mascota mediante un modal interactivo.  
- Conocer el proceso de adopción paso a paso.  

## Características

- Listado dinámico de mascotas obtenidas desde TheDogAPI y TheCatAPI.  
- Filtrado de mascotas por tipo y categoría.  
- Modal interactivo con detalles de cada mascota.  
- Diseño responsivo y accesible.  
- Footer con información de contacto y enlaces a redes sociales.  

## Tecnologías

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)  
- **Framework/Build:** Vite  
- **APIs externas:** [TheDogAPI](https://thedogapi.com/) y [TheCatAPI](https://thecatapi.com/)  
- **Gestión de dependencias:** npm  

## Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/alusilcof5/pet-adoption.git
   ```

2. **Ingresa al directorio del proyecto:**
   ```bash
   cd pet-adoption
   ```

3. **Instala las dependencias:**
   ```bash
   npm install
   ```

4. **Crea un archivo `.env` con tus claves de API:**
   ```env
   VITE_API_KEY_DOG=tu_api_key_de_dogs
   VITE_API_KEY_CAT=tu_api_key_de_cats
   ```

5. **Ejecuta la aplicación en modo desarrollo:**
   ```bash
   npm run dev
   ```

## Uso

- Accede a `http://localhost:5173` (o el puerto indicado en tu terminal) para ver la aplicación.
- Haz clic en las tarjetas de las mascotas para abrir el modal con información detallada.
- Usa los botones de filtro para mostrar solo perros, gatos o todos los animales.

## Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del proyecto.
2. Crea una rama con tu feature:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz commit:
   ```bash
   git commit -m 'Agrega nueva funcionalidad'
   ```
4. Envía tus cambios al repositorio remoto:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un Pull Request explicando tus cambios.

## Licencia

Este proyecto está destinado a fines educativos y académicos. No se recolectan datos de usuarios y todo el contenido relacionado con mascotas proviene de APIs externas.