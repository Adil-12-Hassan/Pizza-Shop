/**
 * Health Check API Endpoint
 * Used to verify the API is running and database is connected
 */

import connectDB from '../../lib/db';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed',
        });
    }

    try {
        // Test database connection
        await connectDB();

        res.status(200).json({
            success: true,
            message: 'API is healthy',
            timestamp: new Date().toISOString(),
            status: 'operational',
            database: 'connected',
        });
    } catch (error) {
        res.status(503).json({
            success: false,
            message: 'Service unavailable',
            error: error.message,
            database: 'disconnected',
        });
    }
}
