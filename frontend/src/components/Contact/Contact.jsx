import React, { useState } from 'react';
import './Contact.css';
import { contactAPI } from '../../services/api';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTwitter, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

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

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number format';
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
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
            const response = await contactAPI.submitContactForm(formData);

            if (response.success) {
                setSuccess(true);
                setFormData({
                    name: '',
                    email: '',
                    phoneNumber: '',
                    message: ''
                });

                // Hide success message after 5 seconds
                setTimeout(() => {
                    setSuccess(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Contact form error:', error);
            setErrors({
                submit: error.response?.data?.message || 'Failed to send message. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h2 className="contact-title">Get In Touch</h2>
                <p className="contact-subtitle">Have questions? We'd love to hear from you!</p>
            </div>

            <div className="contact-content">
                {/* Contact Information */}
                <div className="contact-info">
                    <div className="info-card">
                        <div className="info-icon">
                            <FaPhone />
                        </div>
                        <h3>Call Us</h3>
                        <p>+92 328 151 1293</p>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <FaEnvelope />
                        </div>
                        <h3>Email Us</h3>
                        <p>syedadilhassan06@gmail.com</p>
                        <p>syedadilhassan27@gmail.com</p>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <FaMapMarkerAlt />
                        </div>
                        <h3>Visit Us</h3>
                        <p>123 Main Street</p>
                        <p>Faisalabad, Punjab, Pakistan</p>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <FaClock />
                        </div>
                        <h3>Working Hours</h3>
                        <p>Monday - Sunday</p>
                        <p>11:00 AM - 11:00 PM</p>
                    </div>

                    {/* Social Media */}
                    <div className="social-media">
                        <h3>Follow Us</h3>
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                                <FaFacebook />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="contact-form-wrapper">
                    <h3 className="form-heading">Send us a Message</h3>

                    {success && (
                        <div className="success-alert">
                            <FaPaperPlane />
                            <p>Thank you! Your message has been sent successfully. We'll get back to you soon!</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className={errors.name ? 'error' : ''}
                            />
                            {errors.name && (
                                <span className="error-message">{errors.name}</span>
                            )}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number *</label>
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
                                <label htmlFor="email">Email (Optional)</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && (
                                    <span className="error-message">{errors.email}</span>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Your Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Write your message here..."
                                rows="5"
                                className={errors.message ? 'error' : ''}
                            />
                            {errors.message && (
                                <span className="error-message">{errors.message}</span>
                            )}
                        </div>

                        {errors.submit && (
                            <div className="submit-error">
                                {errors.submit}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="submit-contact-btn"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="btn-spinner"></div>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <FaPaperPlane /> Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Map Section (Optional) */}
            <div className="map-section">
                <h3>Find Us Here</h3>
                <div className="map-container">
                    <iframe
                        title="Pizza Paradise Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d435519.22741992396!2d72.67815193593748!3d31.42415245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392242a895a55ca9%3A0x75d38260b075d6a8!2sFaisalabad%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                        width="100%"
                        height="400"
                        style={{ border: 0, borderRadius: '15px' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;