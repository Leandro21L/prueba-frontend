# 🏦 Sistema de Cajero Automático - Frontend

Interfaz de usuario desarrollada con **React 18** para el sistema de cajero automático.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js 16+ o superior** - [Descargar aquí](https://nodejs.org/)
- **npm 8+** (viene con Node.js)

### Verificar instalaciones

```bash
node -v
npm -v
```

## 🚀 Instalación

### 1. Crear el proyecto React

```bash
npx create-react-app atm-frontend
cd atm-frontend
```

### 2. Reemplazar el contenido de los archivos

#### **public/index.html**

Reemplazar el contenido con:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Sistema de Cajero Automático" />
    <title>Cajero Automático</title>
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <noscript>Necesitas habilitar JavaScript para ejecutar esta app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

#### **src/index.css**

Reemplazar el contenido con:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

#### **src/index.js**

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### **src/App.js**

Copiar todo el código del componente `ATMSystem` que se encuentra en el artifact de este chat.

### 3. Configurar la URL del backend

En el archivo `src/App.js`, verifica que la URL del backend sea correcta:

```javascript
const API_URL = 'http://localhost:8080/api';
```

Si el backend corre en otro puerto, modifica esta línea.

## ▶️ Ejecutar la Aplicación

```bash
# Instalar dependencias (si aún no se han instalado)
npm install

# Iniciar el servidor de desarrollo
npm start
```

La aplicación se abrirá automáticamente en: **http://localhost:3000**

## 👥 Usuarios de Prueba

Puedes iniciar sesión con cualquiera de estos usuarios:

| Usuario | Contraseña | Nombre | Saldo Inicial |
|---------|-----------|---------|---------------|
| usuario1 | pass123 | Juan Pérez | $5,000,000 |
| usuario2 | pass456 | María García | $3,000,000 |
| usuario3 | pass789 | Carlos López | $1,000,000 |

## 🎯 Funcionalidades

### 1. **Login**
- Ingresa con usuario y contraseña
- Validación de credenciales contra el backend

### 2. **Retiros**
- Visualiza tu saldo actual
- Ingresa el monto a retirar (mín: $1,000 - máx: $2,000,000)
- El sistema calcula automáticamente la cantidad mínima de billetes
- Denominaciones: $50,000, $20,000, $10,000, $5,000, $2,000, $1,000
- Validación de fondos suficientes

### 3. **Reporte**
- Historial completo de retiros
- Estadísticas por usuario:
  - Total de retiros
  - Máximo retiro exitoso
  - Promedio de retiros exitosos
  - Máximo retiro rechazado
  - Suma total de retiros exitosos
  - Suma total de retiros rechazados
  - Promedio de retiros rechazados
  - Suma total de todos los retiros
  - Fecha del último retiro exitoso

## 📱 Capturas de Pantalla

### Pantalla de Login
- Formulario de autenticación
- Diseño moderno con gradiente azul/morado

### Pantalla de Retiros
- Visualización del saldo
- Input para ingresar monto
- Resultado con desglose de billetes

### Pantalla de Reporte
- Tabla con estadísticas completas
- Formato de moneda colombiana (COP)

## 🛠️ Tecnologías Utilizadas

- **React 18**
- **Tailwind CSS** (vía CDN)
- **Fetch API** para comunicación con backend
- **React Hooks** (useState)

## 📦 Estructura del Proyecto

```
atm-frontend/
├── public/
│   └── index.html          ← Tailwind CSS CDN incluido aquí
├── src/
│   ├── App.js              ← Componente principal
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## ⚙️ Configuración Adicional (Opcional)

### Cambiar el puerto del frontend

Si el puerto 3000 está ocupado, puedes cambiarlo:

**Windows:**
```bash
set PORT=3001 && npm start
```

**Mac/Linux:**
```bash
PORT=3001 npm start
```

### Cambiar la URL del backend

Edita en `src/App.js`:

```javascript
const API_URL = 'http://localhost:8080/api'; // Cambia el puerto si es necesario
```

## 🧪 Flujo de Prueba Recomendado

1. **Login** con `usuario1` / `pass123`
2. **Verificar saldo** - Deberías ver $5,000,000
3. **Hacer un retiro exitoso** - Por ejemplo: $136,000
   - Verifica el desglose de billetes
   - Verifica que el saldo se actualice
4. **Hacer un retiro rechazado** - Por ejemplo: $10,000,000
   - Verifica el mensaje de fondos insuficientes
5. **Ver el reporte** - Click en "Reporte"
   - Verifica que aparezcan las estadísticas
   - Verifica los montos en formato de moneda

## 📝 Notas Adicionales

- La aplicación usa el **formato de moneda colombiana** (COP)
- Los mensajes de error se muestran con iconos emoji
- El diseño es **responsive** y se adapta a diferentes tamaños de pantalla
- Los datos se actualizan en **tiempo real** después de cada operación
- **No se usa LocalStorage** - todos los datos provienen del backend

## 🔄 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start

# Crear build de producción
npm run build

# Limpiar caché de npm
npm cache clean --force
```

## 📞 Requisitos para Ejecutar

**Antes de iniciar el frontend, asegúrate de:**

1. ✅ El **backend** está corriendo en `http://localhost:8080`
2. ✅ La **base de datos MySQL** está activa
3. ✅ Hay **usuarios creados** en la base de datos

**Orden de inicio:**
1. 🥇 Primero: Iniciar MySQL
2. 🥈 Segundo: Iniciar Backend (Spring Boot)
3. 🥉 Tercero: Iniciar Frontend (React)

## 🌐 Acceso

Una vez iniciado, accede a: **http://localhost:3000**

---