# GenshinFan Admin

Aplicación web administradora del contenido para el sitio GenshinFan, desarrollada con React, Vite y TypeScript.

Esta app permite gestionar información del juego Genshin Impact (personajes, regiones, elementos, imágenes, animaciones, etc.) a través de una API REST creada con ASP.NET + Entity Framework.

## 💪 Tecnologías

- ⚛️ React
- ⚡ Vite
- 🧑‍💻 TypeScript
- 🌐 React Router
- 🧹 Estructura modular (components, pages, api, types)

## 📂 Estructura de carpetas

```
src/
├── api/         # Llamadas a la API REST
├── components/  # Componentes reutilizables
├── pages/       # Vistas o pantallas
├── types/       # Tipos TypeScript compartidos
└── App.tsx      # Rutas principales
```

## 🚀 Cómo iniciar el proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/AxelIanAlimonta/genshinfan-admin.git
   cd genshinfan-admin
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 🌐 API

Este proyecto se conecta a una API REST hecha con ASP.NET y Entity Framework. Asegurate de tenerla corriendo localmente o configurar la URL base en los servicios dentro de `src/api`.

## 🧾 Convención de commits

Este proyecto sigue la convención de Conventional Commits. Algunos ejemplos:

- `feat: agregar formulario de personaje`
- `fix: corregir error al obtener regiones`
- `chore: inicializar configuración de router`
- `refactor: extraer lógica de fetch a un hook`
- `docs: actualizar instrucciones de despliegue`
- `style: aplicar estilos base a formularios`
- `test: agregar tests para componente PersonajeForm`
- `build: configurar Vite para producción`
- `perf: optimizar renderizado de lista de personajes`

## 📌 Próximos pasos

- Implementar CRUD de personajes
- Agregar formularios para entidades relacionadas (regiones, elementos, etc.)
- Mejorar validaciones y manejo de errores
- Agregar autenticación y permisos si es necesario

---

### 📄 Autor

Actualmente en desarrollo por [Axel Ian Alimonta](https://github.com/axelianalimonta).  

