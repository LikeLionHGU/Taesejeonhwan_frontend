import React from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch';
import SearchBar from '../search/SearchBar';

const Header = ({ isDarkMode, toggleMode, isLoggedIn, showToggle = true }) => {
    const navigate = useNavigate();

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 20px',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: isDarkMode ? 'transparent' : 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(5px)',
            borderBottom: isDarkMode ? 'none' : '1px solid #F0F0F0'
        }}>
            <div
                className="logo"
                onClick={() => navigate('/main')}
                style={{ cursor: 'pointer', fontSize: '24px', fontWeight: '800', color: '#007AFF' }}
            >
                Otte
            </div>

            {isLoggedIn && <SearchBar />}

            <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {isLoggedIn ? (
                    <>
                        {showToggle && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '12px', color: isDarkMode ? '#ddd' : '#666' }}>
                                    {isDarkMode ? 'Dark' : 'Light'}
                                </span>
                                <ToggleSwitch isOn={isDarkMode} toggle={toggleMode} />
                            </div>
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