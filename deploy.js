const { execSync } = require('child_process');
const path = require('path');

function run(command, cwd) {
    console.log(`\n🔧 Ejecutando: ${command} en ${cwd}`);
    try {
        execSync(command, {
            stdio: 'inherit',
            cwd,
            shell: true, 
        });
    } catch (error) {
        console.error(`❌ Error ejecutando: ${command}`);
        process.exit(1);
    }
}

const root = __dirname;
const frontendPath = path.join(root, 'front');
const backendPath = path.join(root, 'back');

(async () => {
    try {
        // Frontend
        console.log('\n🎨 Construyendo Frontend...');
        run('npm install', frontendPath);
        run('npm run build:prod', frontendPath);
        // Backend
        console.log('\n🛠️ Configurando Backend...');
        run('npm install', backendPath);
        run('npm run docker:build', backendPath);
        run('npm run docker:up', backendPath);
        run('npx prisma generate', backendPath);
        run('npm run migrate:loc', backendPath);
        run('npm run build', backendPath);
        run('npm run start', backendPath);
    } catch (err) {
        console.error('❌ Error en el deploy:', err);
        process.exit(1);
    }
})();
