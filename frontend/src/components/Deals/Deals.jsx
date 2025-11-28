import React, { useState, useEffect } from 'react';
import './Deals.css';
import MenuItem from '../Menu/MenuItem';
import { menuAPI } from '../../services/api';
import { FaFire } from 'react-icons/fa';

const Deals = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDeals();
    }, []);

    const fetchDeals = async () => {
        try {
            setLoading(true);
            const response = await menuAPI.getAllItems();
            if (response.success) {
                const allItems = response.data;
                const dealItems = allItems.filter(item =>
                    item.category === 'Simple Deal' || item.category === 'Family Deal'
                );
                setDeals(dealItems);
            }
        } catch (err) {
            console.error('Error fetching deals:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading || deals.length === 0) return null;

    return (
        <div className="deals-container">
            <div className="deals-header">
                <h2 className="deals-title">
                    <FaFire className="fire-icon" /> DEALS
                </h2>
                <p className="deals-subtitle">Hot offers just for you!</p>
            </div>

            {/* Simple Deals */}
            {deals.some(item => item.category === 'Simple Deal') && (
                <div className="deals-category">
                    <h3 className="category-title">Simple Deals</h3>
                    <div className="deals-grid">
                        {deals.filter(item => item.category === 'Simple Deal').map(item => (
                            <MenuItem key={item._id} item={item} />
                        ))}
                    </div>
                </div>
            )}

            {/* Family Deals */}
            {deals.some(item => item.category === 'Family Deal') && (
                <div className="deals-category">
                    <h3 className="category-title">Family Deals</h3>
                    <div className="deals-grid">
                        {deals.filter(item => item.category === 'Family Deal').map(item => (
                            <MenuItem key={item._id} item={item} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Deals;
