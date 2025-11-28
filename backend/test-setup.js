/**
 * Backend Setup Verification Script
 * Run this to check if everything is configured correctly
 * Usage: node test-setup.js
 */

const https = require('https');
const http = require('http');

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

console.log(`${colors.cyan}
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🍕 Pizza.com Backend Setup Verification             ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
${colors.reset}`);

// Check if .env.local exists
const fs = require('fs');
const path = require('path');

console.log(`${colors.blue}📋 Checking configuration files...${colors.reset}\n`);

const checks = {
    envLocal: { path: '.env.local', required: true },
    envExample: { path: '.env.example', required: false },
    vercelJson: { path: 'vercel.json', required: true },
    packageJson: { path: 'package.json', required: true },
    nextConfig: { path: 'next.config.js', required: true },
};

let allPassed = true;

Object.entries(checks).forEach(([key, { path: filePath, required }]) => {
    const exists = fs.existsSync(filePath);
    const status = exists ? '✅' : (required ? '❌' : '⚠️');
    const message = exists ? 'Found' : (required ? 'MISSING (Required)' : 'Not found (Optional)');
    
    console.log(`${status} ${filePath}: ${message}`);
    
    if (required && !exists) allPassed = false;
});

console.log();

// Check environment variables
if (fs.existsSync('.env.local')) {
    console.log(`${colors.blue}🔐 Checking environment variables...${colors.reset}\n`);
    
    const envContent = fs.readFileSync('.env.local', 'utf-8');
    const requiredEnvVars = ['MONGODB_URI', 'FRONTEND_URL'];
    
    requiredEnvVars.forEach(varName => {
        const regex = new RegExp(`^${varName}=.+`, 'm');
        const exists = regex.test(envContent);
        const isEmpty = envContent.match(new RegExp(`${varName}=\\s*$`, 'm'));
        
        if (exists && !isEmpty) {
            console.log(`✅ ${varName}: Set`);
        } else if (exists && isEmpty) {
            console.log(`⚠️  ${varName}: Defined but empty`);
            allPassed = false;
        } else {
            console.log(`❌ ${varName}: Missing`);
            allPassed = false;
        }
    });
    
    console.log();
}

// Check project structure
console.log(`${colors.blue}📁 Checking project structure...${colors.reset}\n`);

const requiredDirs = [
    'lib',
    'lib/models',
    'lib/middleware',
    'pages',
    'pages/api',
    'pages/api/menu',
    'pages/api/orders',
    'pages/api/contact',
    'utils',
];

requiredDirs.forEach(dir => {
    const exists = fs.existsSync(dir);
    console.log(`${exists ? '✅' : '❌'} ${dir}/`);
    if (!exists) allPassed = false;
});

console.log();

// Check required files
console.log(`${colors.blue}📄 Checking required files...${colors.reset}\n`);

const requiredFiles = [
    'lib/db.js',
    'lib/models/MenuItem.js',
    'lib/models/Order.js',
    'lib/models/Contact.js',
    'lib/middleware/errorHandler.js',
    'lib/middleware/responseHandler.js',
    'lib/middleware/cors.js',
    'pages/api/health.js',
    'pages/api/menu/index.js',
    'pages/api/orders/index.js',
    'pages/api/orders/[id].js',
    'pages/api/contact/index.js',
    'utils/validation.js',
];

requiredFiles.forEach(file => {
    const exists = fs.existsSync(file);
    console.log(`${exists ? '✅' : '❌'} ${file}`);
    if (!exists) allPassed = false;
});

console.log();

// Check dependencies
console.log(`${colors.blue}📦 Checking dependencies...${colors.reset}\n`);

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const requiredDeps = ['next', 'react', 'react-dom', 'mongoose'];

requiredDeps.forEach(dep => {
    const exists = packageJson.dependencies && packageJson.dependencies[dep];
    console.log(`${exists ? '✅' : '❌'} ${dep}${exists ? ` (${packageJson.dependencies[dep]})` : ' - MISSING'}`);
    if (!exists) allPassed = false;
});

console.log();

// Test MongoDB connection (optional, commented out by default)
console.log(`${colors.blue}🗄️  MongoDB Connection...${colors.reset}\n`);
console.log(`⚠️  Skipping MongoDB connection test (requires running server)`);
console.log(`   Run 'npm run dev' and visit http://localhost:5000/api/health to test\n`);

// Final summary
console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}`);

if (allPassed) {
    console.log(`${colors.green}
✅ All checks passed! Your backend is ready.

Next steps:
1. Install dependencies: npm install
2. Start dev server: npm run dev
3. Test health endpoint: http://localhost:5000/api/health
4. Deploy to Vercel: vercel --prod
${colors.reset}`);
} else {
    console.log(`${colors.red}
❌ Some checks failed. Please fix the issues above.

Common solutions:
- Missing files: They should have been created automatically
- Missing .env.local: Copy from .env.example and fill in your values
- Missing dependencies: Run 'npm install'
${colors.reset}`);
}

console.log(`${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}\n`);
