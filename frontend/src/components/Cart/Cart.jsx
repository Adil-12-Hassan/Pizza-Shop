import React from 'react';
import './Cart.css';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart, FaTimes, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const Cart = () => {
    const {
        cartItems,
        isCartOpen,
        toggleCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        getTotalItems,
        getTotalPrice,
    } = useCart();

    const handleCheckout = () => {
        if (cartItems.length > 0) {
            // Scroll to order form
            const orderSection = document.querySelector('.order-form-container');
            if (orderSection) {
                orderSection.scrollIntoView({ behavior: 'smooth' });
                toggleCart(); // Close cart
            }
        }
    };

    return (
        <>
            {/* Cart Button */}
            <button className="cart-toggle-btn" onClick={toggleCart}>
                <FaShoppingCart />
                {getTotalItems() > 0 && (
                    <span className="cart-badge">{getTotalItems()}</span>
                )}
            </button>

            {/* Cart Sidebar */}
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>
                        <FaShoppingCart /> Your Cart
                    </h2>
                    <button className="close-btn" onClick={toggleCart}>
                        <FaTimes />
                    </button>
                </div>

                <div className="cart-content">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <FaShoppingCart className="empty-icon" />
                            <p>Your cart is empty</p>
                            <button className="browse-btn" onClick={toggleCart}>
                                Browse Menu
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="cart-item">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="cart-item-image"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/80?text=Food';
                                            }}
                                        />

                                        <div className="cart-item-details">
                                            <h4>{item.name}</h4>
                                            <p className="cart-item-price">Rs. {item.price}</p>

                                            <div className="cart-item-actions">
                                                <div className="cart-quantity-selector">
                                                    <button
                                                        onClick={() => decreaseQuantity(item._id)}
                                                        className="cart-qty-btn"
                                                    >
                                                        <FaMinus />
                                                    </button>
                                                    <span className="cart-quantity">{item.quantity}</span>
                                                    <button
                                                        onClick={() => increaseQuantity(item._id)}
                                                        className="cart-qty-btn"
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </div>

                                                <button
                                                    className="remove-btn"
                                                    onClick={() => removeFromCart(item._id)}
                                                    title="Remove item"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="cart-item-subtotal">
                                            Rs. {item.price * item.quantity}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-footer">
                                <div className="cart-total">
                                    <span>Total:</span>
                                    <span className="total-amount">Rs. {getTotalPrice()}</span>
                                </div>

                                <button
                                    className="checkout-btn"
                                    onClick={handleCheckout}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Overlay */}
            {isCartOpen && <div className="cart-overlay" onClick={toggleCart}></div>}
        </>
    );
};

export default Cart;