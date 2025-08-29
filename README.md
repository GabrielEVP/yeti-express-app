# 🐾 Yeti Express App

[![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Una interfaz web moderna y reactiva construida con Vue 3 para el sistema de gestión de deliveries y servicios de mensajería Yeti Express. La aplicación frontend está diseñada con una arquitectura modular que permite el manejo integral de clientes, empleados, servicios de entrega, facturación y más a través de una interfaz intuitiva y responsive.

## 🚀 Características Principales

- **🔐 Sistema de Autenticación**: Interfaz completa de login y gestión de sesiones con integración a Laravel Sanctum
- **👥 Gestión de Clientes**: Dashboard intuitivo para administración completa de clientes
- **👨‍💼 Gestión de Empleados**: Control visual de personal y asignación de roles
- **📦 Servicios de Entrega**: Interfaz para seguimiento en tiempo real y administración de entregas
- **🧾 Sistema de Facturación**: Generación y visualización de facturas con reportes financieros
- **💰 Gestión de Deudas**: Control visual de pagos pendientes y seguimiento de cuentas
- **🚴‍♂️ Mensajería**: Dashboard para gestión de mensajeros y visualización de rutas
- **📊 Dashboard Interactivo**: Panel de control con métricas en tiempo real y gráficos dinámicos
- **📄 Generación de PDFs**: Visualización y descarga de reportes automatizados
- **🎨 UI/UX Moderna**: Interfaz responsive con componentes reutilizables y animaciones fluidas
- **🔄 Estado Reactivo**: Gestión centralizada del estado con Pinia

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Vue 3** - Framework principal con Composition API
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Vue Router 4** - Enrutamiento SPA
- **Pinia** - Gestión de estado
- **TailwindCSS** - Framework CSS utilitario
- **Chart.js & Vue-ChartJS** - Gráficos y visualizaciones
- **Vee-Validate + Yup** - Validación de formularios
- **Axios** - Cliente HTTP
- **Lucide Vue Next** - Iconografía
- **Date-fns & DayJS** - Manipulación de fechas

### UI/UX
- **PrimeVue** - Componentes UI
- **Material Tailwind** - Componentes Material Design
- **TailwindCSS Animate** - Animaciones
- **Class Variance Authority** - Gestión de variantes CSS

### Herramientas de Desarrollo
- **Vitest** - Testing framework
- **Prettier** - Formateo de código
- **PostCSS & Autoprefixer** - Procesamiento CSS
- **Vue TSC** - Type checking para Vue
- **Bun** - Package manager

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- Bun (recomendado) o npm
- Docker (opcional)

## 🚀 Instalación y Configuración

### Método 1: Instalación Tradicional

**1. Clonar el repositorio**

```bash
git clone https://github.com/GabrielEVP/yeti-express-app.git
cd yeti-express-app
```

**2. Instalar dependencias**

```bash
# Con Bun (recomendado)
bun install

# Con npm
npm install

# Con yarn
yarn install
```

**3. Configurar variables de entorno**

```bash
# Copiar archivo de ejemplo (si existe)
cp .env.example .env

# Configurar la URL de la API backend
echo "VITE_API_URL=http://localhost:8000/api" >> .env
```

**4. Ejecutar en modo desarrollo**

```bash
# Con Bun
bun run dev

# Con npm
npm run dev

# Con yarn
yarn dev
```

**5. Construir para producción**

```bash
# Con Bun
bun run build

# Con npm
npm run build
```

**6. Vista previa de producción**

```bash
# Con Bun
bun run preview

# Con npm
npm run preview
```

### Método 2: Con Docker

**1. Clonar y preparar**

```bash
git clone https://github.com/GabrielEVP/yeti-express-app.git
cd yeti-express-app
```

**2. Levantar con Docker Compose**

```bash
# Construir y ejecutar en modo desarrollo
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

**3. Usando Docker directamente**

```bash
# Construir imagen
docker build -t yeti-express-app .

# Ejecutar contenedor
docker run -p 5173:5173 -v $(pwd):/app yeti-express-app
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```bash
# URL de la API backend
VITE_API_URL=http://localhost:8000/api

# URL base de la aplicación
VITE_APP_URL=http://localhost:5173

# Entorno de desarrollo
VITE_APP_ENV=development

# Nombre de la aplicación
VITE_APP_NAME="Yeti Express App"
```

### Scripts Disponibles

```bash
# Desarrollo
bun run dev          # Servidor de desarrollo con hot reload
bun run dev --host   # Servidor accesible desde red local

# Construcción
bun run build        # Build optimizado para producción
bun run preview      # Vista previa del build de producción

# Calidad de código
bun run lint         # Linting con ESLint
bun run type-check   # Verificación de tipos TypeScript

# Testing (si está configurado)
bun run test         # Ejecutar pruebas unitarias
bun run test:ui      # Interfaz visual de testing
bun run coverage     # Reporte de cobertura
```

## 🧪 Testing

Ejecutar las pruebas unitarias y de componentes:

```bash
# Instalación tradicional
bun run test

# Con watch mode
bun run test --watch

# Con coverage
bun run test --coverage

# UI de testing
bun run test:ui
```

## 🌐 Integración con Backend

Esta aplicación frontend está diseñada para integrarse con la **Yeti Express API** (Laravel). 

### Endpoints Principales

La aplicación consume los siguientes endpoints de la API:

- **Auth**: `/api/auth/*` - Autenticación y gestión de sesiones
- **Clients**: `/api/clients/*` - Gestión de clientes
- **Employees**: `/api/employees/*` - Gestión de empleados  
- **Deliveries**: `/api/deliveries/*` - Servicios de entrega
- **Bills**: `/api/bills/*` - Sistema de facturación
- **Debts**: `/api/debts/*` - Gestión de deudas
- **Couriers**: `/api/couriers/*` - Gestión de mensajeros
- **Services**: `/api/services/*` - Servicios generales

### Configuración de CORS

Asegúrate de que tu API backend tenga configurado CORS para permitir peticiones desde el frontend:

```php
// En tu API Laravel
'allowed_origins' => ['http://localhost:5173', 'https://tu-dominio.com'],
```

## 📁 Estructura del Proyecto

```
src/
├── assets/           # Recursos estáticos (imágenes, logos, iconos)
├── components/       # Componentes reutilizables organizados por funcionalidad
│   ├── buttons/      # Componentes de botones (Accept, Cancel, Delete, etc.)
│   ├── charts/       # Gráficos y visualizaciones (ChartLine)
│   ├── dashboard/    # Componentes específicos del dashboard
│   ├── forms/        # Componentes de formularios y validación
│   ├── modals/       # Ventanas modales reutilizables
│   └── ui/           # Componentes UI base (Button, Card, Input, etc.)
├── composables/      # Lógica reutilizable de Vue Composition API
│   ├── filter/       # Composables para filtros
│   ├── form/         # Composables para formularios
│   └── modal/        # Composables para modales
├── layouts/          # Layouts principales de la aplicación
├── models/           # Interfaces TypeScript y tipos de datos
├── router/           # Configuración de rutas y navegación
├── services/         # Servicios de API y comunicación con backend
├── stores/           # Stores de Pinia para gestión de estado
├── utils/            # Utilidades y funciones helper
└── views/            # Páginas/Vistas principales organizadas por módulo
    ├── auth/         # Autenticación y login
    ├── clients/      # Gestión de clientes
    ├── company-bills/# Sistema de facturación
    ├── couriers/     # Gestión de mensajeros
    ├── debts/        # Control de deudas
    ├── deliveries/   # Servicios de entrega
    ├── employees/    # Gestión de empleados
    ├── home/         # Dashboard principal
    ├── services/     # Gestión de servicios
    └── users/        # Gestión de usuarios
```

## 🛠️ Tecnologías Utilizadas

### Frontend Core

- **Vue 3.5** - Framework reactivo con Composition API
- **TypeScript 5.6** - Tipado estático para JavaScript
- **Vite 6.0** - Build tool y servidor de desarrollo ultrarrápido
- **Vue Router 4** - Enrutamiento SPA oficial de Vue
- **Pinia 3.0** - Store oficial de Vue para gestión de estado

### UI/UX & Styling

- **TailwindCSS 3.4** - Framework CSS utilitario
- **PrimeVue 4.2** - Biblioteca de componentes UI rica
- **Material Tailwind** - Componentes Material Design
- **Lucide Vue Next** - Iconografía moderna y consistente
- **TailwindCSS Animate** - Animaciones CSS predefinidas
- **Class Variance Authority** - Gestión de variantes de componentes

### Formularios & Validación

- **Vee-Validate 4.15** - Validación de formularios para Vue
- **Yup 1.6** - Schema validation con TypeScript
- **@vee-validate/yup** - Integración Vee-Validate con Yup

### Gráficos & Visualización

- **Chart.js 4.4** - Biblioteca de gráficos flexible
- **Vue-ChartJS 5.3** - Wrapper oficial de Chart.js para Vue
- **@unovis/vue** - Componentes de visualización avanzados

### HTTP & Estado

- **Axios 1.7** - Cliente HTTP para comunicación con API
- **@vueuse/core** - Colección de utilidades Vue Composition API
- **JS-Cookie** - Manejo de cookies del navegador

### Herramientas de Desarrollo

- **Vitest** - Framework de testing nativo para Vite
- **Vue TSC** - Type checking para componentes Vue
- **Prettier** - Formateo automático de código
- **PostCSS & Autoprefixer** - Procesamiento y prefijos CSS
- **Bun** - Runtime y package manager ultrarrápido

## 📋 Requisitos del Sistema

- **Node.js 18+** - Runtime de JavaScript
- **Bun** (recomendado) o **npm/yarn** - Package manager
- **Git** - Control de versiones
- **Docker** (opcional) - Para desarrollo containerizado
- **VS Code** (recomendado) - Editor con extensiones Vue/TypeScript

## 🔧 Scripts Disponibles

- `bun run dev` - Ejecuta el servidor de desarrollo
- `bun run build` - Construye la aplicación para producción
- `bun run preview` - Vista previa de la build de producción
- `bun run test` - Ejecuta las pruebas (si están configuradas)

## 🌐 Características Principales

## 🌟 Características de la Interfaz

### 🔐 Sistema de Autenticación
- Login seguro con validación en tiempo real
- Gestión de sesiones con tokens JWT
- Protección de rutas y autorización por roles
- Interfaz de recuperación de contraseña

### 📊 Dashboard Interactivo
- Métricas en tiempo real con gráficos dinámicos
- KPIs visuales del negocio
- Tablas de datos con paginación y filtros
- Widgets personalizables por rol

### 📱 Interfaz Responsiva
- Diseño mobile-first optimizado
- Componentes adaptativos a cualquier pantalla
- Navegación intuitiva en dispositivos móviles
- PWA ready para instalación en dispositivos

### 🔄 Gestión de Estado Reactivo
- Store centralizado con Pinia
- Estado sincronizado entre componentes
- Persistencia automática de datos críticos
- Optimización de re-renders

### 📋 Formularios Inteligentes
- Validación en tiempo real con Vee-Validate
- Componentes reutilizables y tipados
- Manejo automático de errores de API
- UX optimizada para entrada de datos

### 📄 Sistema de Reportes
- Visualización de PDFs integrada
- Descarga automática de reportes
- Filtros avanzados para reportes personalizados
- Exportación de datos en múltiples formatos

## � Despliegue

La aplicación está optimizada para desplegarse en:

### Plataformas Recomendadas
- **Vercel** - Deploy automático desde Git con optimizaciones
- **Netlify** - CI/CD integrado con preview de branches
- **AWS S3 + CloudFront** - Distribución global con CDN
- **Digital Ocean App Platform** - Simplicidad y escalabilidad

### Deploy con Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Deploy con Netlify

```bash
# Build local
bun run build

# Deploy con Netlify CLI
npx netlify deploy --dir=dist --prod
```

## 🤝 Contribución

¡Contribuciones son bienvenidas! Por favor, sigue estos pasos:

### Proceso de Contribución

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. **Commit** tus cambios (`git commit -m 'feat: agrega nueva característica'`)
4. **Push** a la rama (`git push origin feature/nueva-caracteristica`)
5. **Abre** un Pull Request

### Estándares de Código

- **Seguir** las convenciones de Vue 3 Composition API
- **Usar** TypeScript para todos los componentes nuevos
- **Mantener** consistencia con TailwindCSS para estilos
- **Escribir** pruebas para componentes críticos
- **Documentar** props y emits en componentes reutilizables

### Conventional Commits

Usar formato de commits convencionales:

```bash
feat: nueva funcionalidad
fix: corrección de bug
docs: actualización de documentación
style: cambios de formato/estilo
refactor: refactorización de código
test: agregar o modificar tests
chore: tareas de mantenimiento
```

## 📝 Changelog

Ver [CHANGELOG.md](CHANGELOG.md) para ver los cambios en cada versión.

## � Reportar Issues

Si encuentras un bug o tienes una sugerencia, por favor crea un issue en GitHub incluyendo:

- **Descripción detallada** del problema o sugerencia
- **Pasos para reproducir** (si es un bug)
- **Capturas de pantalla** (si es relevante)
- **Información del entorno**:
  - Navegador y versión
  - Sistema operativo
  - Versión de Node.js
  - Versión de la aplicación

## 📚 Recursos Adicionales

- [Documentación de Vue 3](https://vuejs.org/)
- [Guía de TypeScript con Vue](https://vuejs.org/guide/typescript/overview.html)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Pinia Store Documentation](https://pinia.vuejs.org/)
- [Vite Build Tool](https://vitejs.dev/)

## 👥 Equipo

**Gabriel Vargas** - *Desarrollador Principal* - [@GabrielEVP](https://github.com/GabrielEVP)

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT** - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- **Vue.js Team** por el excelente framework y ecosistema
- **Vite Team** por la herramienta de build ultrarrápida
- **TailwindCSS Team** por el framework CSS utilitario
- **Comunidad Open Source** por las increíbles librerías utilizadas
- **Contribuidores** que han ayudado a mejorar el proyecto

---

**Desarrollado con ❤️ por Gabriel Vargas**

⭐ *Si este proyecto te fue útil, ¡no olvides darle una estrella!*

## 🚀 Despliegue

La aplicación está configurada para desplegarse fácilmente en:
- **Vercel**
- **Docker containers**
- **Servidores tradicionales**

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Gabriel Vargas** - [@GabrielEVP](https://github.com/GabrielEVP)

## 🙏 Agradecimientos

- Vue.js team por el excelente framework
- Vite team por la herramienta de build
- Comunidad open source por las librerías utilizadas

---

⭐ Si este proyecto te fue útil, ¡no olvides darle una estrella!
