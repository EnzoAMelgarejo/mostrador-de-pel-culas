# Mostrador de Películas 🎬

**Mostrador de Películas** es una aplicación **fullstack** desarrollada en un entorno **monorepo**, que permite a los usuarios registrarse, iniciar sesión y gestionar listas personalizadas de películas. Utiliza tecnologías modernas como **React con TypeScript** en el frontend y **Node.js con Express y MongoDB** en el backend, e implementa autenticación basada en **JWT** con manejo de **refresh tokens mediante cookies**.

Este proyecto también está pensado para escalar a una arquitectura basada en **microservicios**, aunque actualmente funciona como una app monolítica dividida en `Frontend` y `Backend`.

Este proyecto se encuentra aún en desarrollo.

---

## 🧰 Tecnologías utilizadas

### 🔙 Backend
- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **JavaScript**
- **JWT** para autenticación
- **cookie-parser** para manejo de tokens de sesión
- **Postman** para testing de la API
- **Docker** (contemplado para entorno de despliegue)

### 🔜 Frontend
- **React**
- **TypeScript**
- **Axios** para llamadas HTTP

---

## 📦 Estructura del proyecto

```
Mostrador-de-peliculas/
│
├── Backend/         → Servidor Express, lógica de autenticación y conexión con MongoDB
│
├── Frontend/        → Aplicación React con TypeScript, UI para usuarios, manejo de listas
│
└── README.md        → Este archivo
```

---

## ⚙️ Instalación

### Requisitos previos
- Node.js y npm
- MongoDB en ejecución local o Atlas
- Docker
- Git

### 1. Clonar el repositorio

```bash
git clone https://github.com/EnzoAMelgarejo/mostrador-de-peliculas.git
cd mostrador-de-peliculas
```

---

### 2. Configurar el Backend

```bash
cd Backend
Docker compose up -d
npm install
```

Crear un archivo `.env` dentro de la carpeta `Backend` con el siguiente contenido (ajustar tus propias claves si es necesario):

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/mostrador
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

Luego levantar el backend:

```bash
npm start
```

---

### 3. Configurar el Frontend

```bash
cd ../Frontend
npm install
npm run dev
```

> Por defecto, el frontend corre en `http://localhost:5173` y el backend en `http://localhost:3001`.

---

## 🚧 Por hacer

- Migrar a microservicios
- Mejorar UI/UX
- Agregar tests automáticos
- Agregar sistema de recomendaciones
- Completar screen movie
- Implementar funciones admin (En el frontend)
- Implementar funcnion "Explorar" (Para explorar la pagina sin loguearse)
- Agregar sistema de puntuacion para peliculas
- Hacer funcional el botón "Compartir"
- ...

---
