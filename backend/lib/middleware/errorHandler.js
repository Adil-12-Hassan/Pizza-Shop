/**
 * Error Handler Middleware
 * Centralized error handling for API routes
 */

export class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ApiError';
    }
}

export const errorHandler = (error, req, res) => {
    console.error('API Error:', error);

    // Mongoose validation error
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors,
        });
    }

    // Mongoose duplicate key error
    if (error.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Duplicate field value entered',
        });
    }

    // Mongoose CastError
    if (error.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID format',
        });
    }

    // API Error
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }

    // Default error
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Internal Server Error',
    });
};

export const asyncHandler = (fn) => async (req, res) => {
    try {
        await fn(req, res);
    } catch (error) {
        errorHandler(error, req, res);
    }
};
