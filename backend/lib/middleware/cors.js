/**
 * CORS Middleware
 * Handle Cross-Origin Resource Sharing for serverless functions
 */

export const corsHeaders = {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*', // In production, replace with your frontend URL
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization',
};

export const withCors = (handler) => async (req, res) => {
    // Set CORS headers
    Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
    });

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    return handler(req, res);
};
