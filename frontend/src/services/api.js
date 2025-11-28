import axios from 'axios';

// Base URL for API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Menu API
export const menuAPI = {
    // Get all menu items
    getAllItems: async () => {
        try {
            const response = await api.get('/menu');
            return response.data;
        } catch (error) {
            console.error('Error fetching menu items:', error);
            throw error;
        }
    },

    // Get single menu item
    getItemById: async (id) => {
        try {
            const response = await api.get(`/menu/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching menu item:', error);
            throw error;
        }
    },
};

// Orders API
export const ordersAPI = {
    // Create new order
    createOrder: async (orderData) => {
        try {
            const response = await api.post('/orders', orderData);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    // Get order by ID
    getOrderById: async (id) => {
        try {
            const response = await api.get(`/orders/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching order:', error);
            throw error;
        }
    },

    // Get all orders (Admin)
    getAllOrders: async () => {
        try {
            const response = await api.get('/orders');
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },

    // Update order status
    updateOrderStatus: async (id, status, notes) => {
        try {
            const response = await api.put(`/orders/${id}`, { status, notes });
            return response.data;
        } catch (error) {
            console.error('Error updating order:', error);
            throw error;
        }
    },
};

// Contact API
export const contactAPI = {
    // Submit contact form
    submitContactForm: async (contactData) => {
        try {
            const response = await api.post('/contact', contactData);
            return response.data;
        } catch (error) {
            console.error('Error submitting contact form:', error);
            throw error;
        }
    },
};

export default api;