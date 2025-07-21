# Instalar dependencias
npm install

# Creamos el contenedor con la base de datos (asegurarse de tener instalado docker desktop)
npm run docker:build

# Migramos las tablas
npm run migrate:loc