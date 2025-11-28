import React, { useState } from 'react';
import './MenuItem.css';
import { useCart } from '../../context/CartContext';
import { FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';

const MenuItem = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // Add item to cart with selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }
    
    // Show added animation
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuantity(1); // Reset quantity after adding
    }, 1000);
  };

  return (
    <div className="menu-item-card">
      <div className="item-image-container">
        <img 
          src={item.image} 
          alt={item.name} 
          className="item-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Food+Image';
          }}
        />
        {!item.available && (
          <div className="unavailable-badge">Out of Stock</div>
        )}
      </div>

      <div className="item-details">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-description">{item.description}</p>
        
        <div className="item-footer">
          <div className="item-price">Rs. {item.price}</div>
          
          <div className="item-actions">
            <div className="quantity-selector">
              <button 
                className="quantity-btn" 
                onClick={handleDecrease}
                disabled={quantity <= 1}
              >
                <FaMinus />
              </button>
              <span className="quantity-display">{quantity}</span>
              <button 
                className="quantity-btn" 
                onClick={handleIncrease}
              >
                <FaPlus />
              </button>
            </div>

            <button 
              className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={!item.available || isAdded}
            >
              <FaShoppingCart />
              {isAdded ? 'Added!' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;