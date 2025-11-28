import React, { useState, useEffect } from 'react';
import './Menu.css';
import MenuItem from './MenuItem';
import { menuAPI } from '../../services/api';
import { FaUtensils } from 'react-icons/fa';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Starters', 'Pizza', 'Burger', 'Pasta', 'Sides', 'Dessert', 'Drinks'];

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            setLoading(true);
            const response = await menuAPI.getAllItems();

            if (response.success) {
                setMenuItems(response.data);
            } else {
                // If API fails, use sample data
                setMenuItems(getSampleMenuData());
            }
            setError(null);
        } catch (err) {
            console.error('Error fetching menu:', err);
            setError('Failed to load menu. Showing sample items.');
            // Use sample data as fallback
            setMenuItems(getSampleMenuData());
        } finally {
            setLoading(false);
        }
    };

    const getSampleMenuData = () => {
        return [
            {
                _id: '1',
                name: 'Margherita Pizza',
                description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
                price: 599,
                category: 'Pizza',
                image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
                available: true
            },
            {
                _id: '2',
                name: 'Pepperoni Pizza',
                description: 'Loaded with pepperoni and extra cheese',
                price: 799,
                category: 'Pizza',
                image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
                available: true
            },
            {
                _id: '3',
                name: 'BBQ Chicken Pizza',
                description: 'Grilled chicken with BBQ sauce and onions',
                price: 899,
                category: 'Pizza',
                image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
                available: true
            },
            {
                _id: '4',
                name: 'Beef Burger',
                description: 'Juicy beef patty with lettuce, tomato, and special sauce',
                price: 349,
                category: 'Burger',
                image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
                available: true
            },
            {
                _id: '5',
                name: 'Chicken Burger',
                description: 'Crispy chicken breast with mayo and lettuce',
                price: 299,
                category: 'Burger',
                image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400',
                available: true
            },
            {
                _id: '6',
                name: 'Zinger Burger',
                description: 'Spicy fried chicken with cheese and jalapenos',
                price: 399,
                category: 'Burger',
                image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400',
                available: true
            },
            {
                _id: '7',
                name: 'Chicken Shawarma',
                description: 'Marinated chicken wrapped in fresh pita bread',
                price: 199,
                category: 'Shawarma',
                image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400',
                available: true
            },
            {
                _id: '8',
                name: 'Beef Shawarma',
                description: 'Tender beef with tahini sauce and vegetables',
                price: 249,
                category: 'Shawarma',
                image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',
                available: true
            },
            {
                _id: '9',
                name: 'Coca Cola',
                description: 'Chilled soft drink - 500ml',
                price: 80,
                category: 'Drinks',
                image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400',
                available: true
            },
            {
                _id: '10',
                name: 'Fresh Orange Juice',
                description: 'Freshly squeezed orange juice',
                price: 150,
                category: 'Drinks',
                image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
                available: true
            },
            {
                _id: '11',
                name: 'French Fries',
                description: 'Crispy golden fries with ketchup',
                price: 120,
                category: 'Sides',
                image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
                available: true
            },
            {
                _id: '12',
                name: 'Chocolate Brownie',
                description: 'Warm chocolate brownie with ice cream',
                price: 180,
                category: 'Desserts',
                image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
                available: true
            },
            // Simple Deals
            {
                _id: '13',
                name: "Burger Buddy",
                description: "2 Chicken Burgers + 2 Fries + 2 Cokes",
                price: 899,
                category: "Simple Deal",
                image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400",
                available: true
            },
            {
                _id: '14',
                name: "Pizza for Two",
                description: "1 Medium Pizza + 2 Drinks",
                price: 799,
                category: "Simple Deal",
                image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
                available: true
            },
            // Family Deals
            {
                _id: '15',
                name: "Mega Feast",
                description: "2 Large Pizzas + 2 Sides + 1.5L Drink",
                price: 1999,
                category: "Family Deal",
                image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
                available: true
            }
        ];
    };

    const filteredItems = selectedCategory === 'All'
        ? menuItems
        : menuItems.filter(item => item.category === selectedCategory);

    if (loading) {
        return (
            <div className="menu-container">
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="menu-container">
            <div className="menu-header">
                <h2 className="menu-title">
                    <FaUtensils /> Our Menu
                </h2>
                <p className="menu-subtitle">Choose from our delicious selection</p>

                {error && <div className="error-message">{error}</div>}
            </div>

            {/* Category Filter */}
            <div className="category-filter">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Menu Items Grid */}
            <div className="menu-grid">
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <MenuItem key={item._id} item={item} />
                    ))
                ) : (
                    <p className="no-items">No items available in this category.</p>
                )}
            </div>

            {/* Deals sections removed — deals are now included in the main menu grid */}
        </div>
    );
};

export default Menu;