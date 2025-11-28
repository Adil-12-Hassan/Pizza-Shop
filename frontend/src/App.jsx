import React, { useState, useRef } from 'react';
import './App.css';
import { CartProvider } from './context/CartContext';
import Hero from './components/Hero/Hero';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';
import OrderForm from './components/Order/OrderForm';
import Contact from './components/Contact/Contact';
import Deals from './components/Deals/Deals';

function App() {
    const [activeSection, setActiveSection] = useState('hero');
    const menuRef = useRef(null);
    const contactRef = useRef(null);
    const dealsRef = useRef(null);

    const scrollToSection = (section) => {
        setActiveSection(section);

        if (section === 'menu' && menuRef.current) {
            menuRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (section === 'contact' && contactRef.current) {
            contactRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (section === 'deals' && dealsRef.current) {
            dealsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <CartProvider>
            <div className="App">
                <Hero scrollToSection={scrollToSection} />

                <div ref={menuRef}>
                    <Menu />
                </div>

                <div ref={dealsRef}>
                    <Deals />
                </div>

                <Cart />

                <OrderForm />

                <div ref={contactRef}>
                    <Contact />
                </div>

                {/* Footer */}
                <footer className="footer">
                    <p>&copy; 2024 Pizza Shop. All rights reserved. Made with ❤️</p>
                </footer>
            </div>
        </CartProvider>
    );
}

export default App;