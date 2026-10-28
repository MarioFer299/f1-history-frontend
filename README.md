### 📄 2. Contenido 

# 🏎️ F1 History - Frontend

Interfaz de usuario del proyecto final de Desarrollo Web. Es la evolución full-stack del sitio original, reconstruido utilizando **Next.js (App Router), TypeScript y Tailwind CSS**.

El frontend consume la API REST del backend, maneja la sesión de usuario con JWT y protege las rutas según el rol del usuario, manteniendo la misma identidad visual y dominio del proyecto inicial.

## 🛠️ Requisitos Previos
- Node.js (v18 o superior)
- El Backend (`f1-history-Back`) debe estar corriendo previamente en `http://localhost:4000`

## 🚀 Instalación y Configuración Local

1. **Clonar el repositorio y entrar a la carpeta:**
   ```bash
   git clone <url-del-repositorio>
   cd f1-history-frontend

2. **Instalar dependencias:**
    ```bash
    npm install

3. Configurar variables de entorno:
  - Crea un archivo .env.local en la raíz del proyecto para conectar con tu backend local:
    ```bash
     NEXT_PUBLIC_API_HOST=http://localhost:4000

4. **Ejecutar el servidor de desarrollo:**
    ```bash
       npm run dev
 El sitio web estará disponible y corriendo en: http://localhost:3000



