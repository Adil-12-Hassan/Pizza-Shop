import React from 'react';
import './Hero.css';
import { FaPizzaSlice, FaShoppingCart, FaPhone } from 'react-icons/fa';

const Hero = ({ scrollToSection }) => {
    return (
        <div className="hero-container">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="hero-title">
                    <FaPizzaSlice className="pizza-icon" />
                    Pizza Paradise
                </h1>
                <p className="hero-description">
                    Delicious pizzas, burgers, and shawarmas made fresh just for you!
                    <br />
                    Fast delivery | Quality ingredients | Unbeatable taste
                </p>

                <div className="hero-buttons">
                    <button
                        className="hero-btn order-btn"
                        onClick={() => scrollToSection('menu')}
                    >
                        <FaShoppingCart /> Order Now
                    </button>

                    <button
                        className="hero-btn menu-btn"
                        onClick={() => scrollToSection('menu')}
                    >
                        <FaPizzaSlice /> View Menu
                    </button>

                    <button
                        className="hero-btn contact-btn"
                        onClick={() => scrollToSection('contact')}
                    >
                        <FaPhone /> Contact Us
                    </button>
                </div>

                <div className="hero-features">
                    <div className="feature">
                        <span className="feature-icon">🚀</span>
                        <span>Fast Delivery</span>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">🔥</span>
                        <span>Hot & Fresh</span>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">⭐</span>
                        <span>Top Quality</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;