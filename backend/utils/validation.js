// Validation helper functions

export const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateOrderItems = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
        return { valid: false, message: 'Order must contain at least one item' };
    }

    for (let item of items) {
        if (!item.menuItemId || !item.name || !item.price || !item.quantity) {
            return { valid: false, message: 'Invalid item data' };
        }

        if (item.quantity < 1) {
            return { valid: false, message: 'Quantity must be at least 1' };
        }

        if (item.price < 0) {
            return { valid: false, message: 'Price cannot be negative' };
        }
    }

    return { valid: true };
};

export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/[<>]/g, '');
};