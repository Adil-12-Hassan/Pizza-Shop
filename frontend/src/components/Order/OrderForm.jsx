import React, { useState } from 'react';
import './OrderForm.css';
import { useCart } from '../../context/CartContext';
import { ordersAPI } from '../../services/api';
import { FaCheckCircle, FaShoppingBag, FaUser, FaPhone, FaMapMarkerAlt, FaStickyNote } from 'react-icons/fa';

const OrderForm = () => {
    const { cartItems, getTotalPrice, clearCart } = useCart();

    const [formData, setFormData] = useState({
        customerName: '',
        phoneNumber: '',
        address: '',
        notes: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.customerName.trim()) {
            newErrors.customerName = 'Name is required';
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number format';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (cartItems.length === 0) {
            newErrors.cart = 'Your cart is empty';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Prepare order data
            const orderData = {
                customerName: formData.customerName.trim(),
                phoneNumber: formData.phoneNumber.trim(),
                address: formData.address.trim(),
                notes: formData.notes.trim(),
                items: cartItems.map(item => ({
                    menuItemId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    subtotal: item.price * item.quantity
                })),
                totalAmount: getTotalPrice()
            };

            // Submit order
            const response = await ordersAPI.createOrder(orderData);

            if (response.success) {
                setOrderSuccess(true);
                setOrderDetails(response.data);
                clearCart();

                // Reset form
                setFormData({
                    customerName: '',
                    phoneNumber: '',
                    address: '',
                    notes: ''
                });

                // Scroll to success message
                setTimeout(() => {
                    document.querySelector('.success-message')?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 100);
            }
        } catch (error) {
            console.error('Order submission error:', error);
            setErrors({
                submit: error.response?.data?.message || 'Failed to place order. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleNewOrder = () => {
        setOrderSuccess(false);
        setOrderDetails(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (orderSuccess) {
        return (
            <div className="order-form-container">
                <div className="success-message">
                    <FaCheckCircle className="success-icon" />
                    <h2>Order Placed Successfully! 🎉</h2>
                    <p>Thank you for your order, {orderDetails?.customerName}!</p>

                    <div className="order-summary-box">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Order ID:</span>
                            <span className="highlight">{orderDetails?._id}</span>
                        </div>
                        <div className="summary-row">
                            <span>Total Amount:</span>
                            <span className="highlight">Rs. {orderDetails?.totalAmount}</span>
                        </div>
                        <div className="summary-row">
                            <span>Status:</span>
                            <span className="status-badge">{orderDetails?.status}</span>
                        </div>
                        <div className="summary-row">
                            <span>Phone:</span>
                            <span>{orderDetails?.phoneNumber}</span>
                        </div>
                        <div className="summary-row full-width">
                            <span>Delivery Address:</span>
                            <span>{orderDetails?.address}</span>
                        </div>
                    </div>

                    <div className="success-actions">
                        <button className="new-order-btn" onClick={handleNewOrder}>
                            Place New Order
                        </button>
                    </div>

                    <p className="success-note">
                        We'll call you shortly to confirm your order. Expected delivery time: 30-45 minutes.
                    </p>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="order-form-container">
                <div className="empty-order">
                    <FaShoppingBag className="empty-icon" />
                    <h3>Your cart is empty!</h3>
                    <p>Add some delicious items to your cart before placing an order.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="order-form-container">
            <div className="order-form-wrapper">
                <h2 className="form-title">
                    <FaShoppingBag /> Complete Your Order
                </h2>

                {/* Cart Summary */}
                <div className="cart-summary">
                    <h3>Your Order</h3>
                    <div className="summary-items">
                        {cartItems.map(item => (
                            <div key={item._id} className="summary-item">
                                <div className="summary-item-info">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-quantity">x{item.quantity}</span>
                                </div>
                                <span className="item-total">Rs. {item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-total">
                        <span>Total Amount:</span>
                        <span className="total-price">Rs. {getTotalPrice()}</span>
                    </div>
                </div>

                {/* Order Form */}
                <form onSubmit={handleSubmit} className="order-form">
                    <div className="form-group">
                        <label htmlFor="customerName">
                            <FaUser /> Full Name *
                        </label>
                        <input
                            type="text"
                            id="customerName"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={errors.customerName ? 'error' : ''}
                        />
                        {errors.customerName && (
                            <span className="error-message">{errors.customerName}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">
                            <FaPhone /> Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="03XX-XXXXXXX"
                            className={errors.phoneNumber ? 'error' : ''}
                        />
                        {errors.phoneNumber && (
                            <span className="error-message">{errors.phoneNumber}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">
                            <FaMapMarkerAlt /> Delivery Address *
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your complete delivery address"
                            rows="3"
                            className={errors.address ? 'error' : ''}
                        />
                        {errors.address && (
                            <span className="error-message">{errors.address}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes">
                            <FaStickyNote /> Special Instructions (Optional)
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Any special requests? (e.g., extra cheese, no onions)"
                            rows="2"
                        />
                    </div>

                    {errors.submit && (
                        <div className="submit-error">
                            {errors.submit}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="submit-order-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="btn-spinner"></div>
                                Processing...
                            </>
                        ) : (
                            <>
                                <FaCheckCircle /> Place Order
                            </>
                        )}
                    </button>

                    <p className="form-note">
                        * By placing this order, you agree to our terms and conditions.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default OrderForm;