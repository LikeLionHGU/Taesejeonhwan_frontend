import React from 'react';
import '../../styles/Common.css';

const Logo = ({ isDarkMode }) => {
    return (
        <div className={`logo-container ${isDarkMode ? 'dark' : ''}`}>
            <div className="logo-dot"></div>
            <span className="logo-text">Otte</span>
        </div>
    );
};

export default Logo;