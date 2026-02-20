import React from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch';
import SearchBar from '../search/SearchBar';
import '../../styles/Header.css';

const Header = ({ isDarkMode, toggleMode, isLoggedIn, showToggle = true }) => {
    const navigate = useNavigate();

    return (
        <header className={`header-container ${isDarkMode ? 'dark-mode' : ''}`}>
            {/* 로고 영역 */}
            <div className="logo-wrapper" onClick={() => navigate('/main')}>
                <span className="logo-text">Otte</span>
                <div className="logo-dot"></div> 
            </div>

            {isLoggedIn && <SearchBar />}

            <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {isLoggedIn ? (
                    <>
                        {showToggle && (
                            <ToggleSwitch isOn={isDarkMode} toggle={toggleMode} />
                        )}
                        <button className="nav-btn" onClick={() => navigate('/my-cinema')}>나의 영화관</button>
                        <button className="nav-btn" onClick={() => navigate('/wishlist')}>찜한 콘텐츠</button>
                        <button className="nav-btn" onClick={() => navigate('/login')}>로그아웃</button>
                    </>
                ) : (
                    <button className="nav-btn" onClick={() => navigate('/login')}>로그인</button>
                )}
            </nav>
        </header>
    );
};

export default Header;