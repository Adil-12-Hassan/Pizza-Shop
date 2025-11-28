/**
 * Response Utilities
 * Standardized response formats for API endpoints
 */

export const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

export const sendError = (res, message, statusCode = 400, errors = null) => {
    const response = {
        success: false,
        message,
    };

    if (errors) {
        response.errors = errors;
    }

    return res.status(statusCode).json(response);
};

export const sendCreated = (res, data, message = 'Resource created successfully') => {
    return sendSuccess(res, data, message, 201);
};

export const sendNotFound = (res, message = 'Resource not found') => {
    return sendError(res, message, 404);
};

export const sendUnauthorized = (res, message = 'Unauthorized access') => {
    return sendError(res, message, 401);
};

export const sendMethodNotAllowed = (res, method) => {
    return sendError(res, `Method ${method} not allowed`, 405);
};
