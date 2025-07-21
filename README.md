# 📝 Node + React - App de Tareas

Esta aplicación fue construida con la arquitectura **Backend for Frontend (BFF)**. Permite a los usuarios:

- Crear tareas
- Marcar tareas como completadas
- Registrarse e iniciar sesión

## 🚀 Requisitos previos

Asegúrate de tener lo siguiente instalado antes de iniciar el proyecto:

- ✅ [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Tener Docker Desktop iniciado para que el script pueda levantar los servicios
- ✅ Node.js versión **22.11.0** instalada de forma global

## ⚙️ Archivos de entorno

Antes de ejecutar la aplicación, es necesario contar con los archivos de variables de entorno:

- En el directorio `/back`:
  - `.env.loc` con los siguientes valores
  
    ```env
        #NOMBRE DE LA VARIABLE PARA LEVANTAR DOCKER
        NODE_ENV=LOCAL

        # DB CONFIG
        POSTGRES_USER=root
        POSTGRES_PASSWORD=admin
        POSTGRES_DB=postgres

        # PRISMA CONFIG
        DATABASE_URL=postgresql://root:admin@localhost:54321/postgres?schema=public&sslmode=prefer

        # JWT CONFIG
        JWT_SECRET=NWfishingSecrets
        JWT_EXPIRES=3600

        # SERVER CONFIG
        PORT=3001
    ```

- En el directorio `/front`:
  - `.env.loc` Con el siguiente valor

    ```env
        VITE_API_URL=http://localhost:3001/api
    ```

  - `.env.prd` Con el siguiente valor
    ```env
        VITE_API_URL=/api
    ```


> ⚠️ Asegúrate de que estos archivos estén correctamente configurados para el entorno local y/o productivo.

## 🛠️ Instalación y despliegue

1. Clona este repositorio.
2. Navega a la raíz del proyecto.
3. Ejecuta el siguiente script para levantar todos los servicios con Docker:

```bash
node deploy.js
