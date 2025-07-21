import fs from 'fs';
import path from 'path';

const routesPath = path.join(__dirname, '.');

export default function routeBuilder(app: any) {
    console.log(`Routes`);
    try {
        const files = fs.readdirSync(routesPath);

        const routeFiles = files.filter(file =>
            (file !== 'index.ts' && file !== 'index.js') &&
            (file.endsWith('.ts') || file.endsWith('.js')) &&
            !file.endsWith('.d.ts')
        );

        if (routeFiles.length === 0) return;

        let successCount = 0;
        let errorCount = 0;

        routeFiles.forEach(file => {
            try {
                const route = require(path.join(routesPath, file));
                const routeName = `/api/${path.parse(file).name}`; // ✅ Siempre sin extensión

                if (!route) {
                    throw new Error(`El archivo ${file} no exporta una ruta válida`);
                }

                const routeHandler = route.default || route;

                if (typeof routeHandler !== 'function') {
                    throw new Error(`El archivo ${file} debe exportar un router válido`);
                }

                app.use(routeName, routeHandler);
                console.log('\x1b[32m%s\x1b[0m', `- ${routeName}`);
                successCount++;

            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                console.error(`❌ Error al cargar ${file}: ${errorMessage}`);
                errorCount++;
            }
        });

        if (errorCount > 0) {
            console.warn(`⚠️  Se encontraron ${errorCount} errores durante la carga`);
        }

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('💥 Error crítico al leer el directorio de rutas:', errorMessage);
        if (error instanceof Error && error.stack) {
            console.error('Stack trace:', error.stack);
        }
    }
}
