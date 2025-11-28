/**
 * Local Development Server
 * This file is optional and only for testing purposes
 * Vercel uses Next.js built-in server for deployment
 */

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 5000;

// Create Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true);
            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    }).listen(port, (err) => {
        if (err) throw err;
        console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🍕 Pizza.com Backend API Server                     ║
║                                                       ║
║   Status: Running                                     ║
║   Port: ${port}                                      ║
║   URL: http://${hostname}:${port}                    ║
║   Environment: ${dev ? 'Development' : 'Production'}  ║
║                                                       ║
║   API Endpoints:                                      ║
║   - Health: http://${hostname}:${port}/api/health     ║
║   - Menu: http://${hostname}:${port}/api/menu         ║
║   - Orders: http://${hostname}:${port}/api/orders     ║
║   - Contact: http://${hostname}:${port}/api/contact   ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
        `);
    });
});
