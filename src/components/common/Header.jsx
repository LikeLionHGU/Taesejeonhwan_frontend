import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Logo from './Logo';
import ToggleSwitch from './ToggleSwitch';
import SearchBar from '../search/SearchBar';
import '../../styles/Header.css';

const Header = ({ isDarkMode, toggleMode, isLoggedIn }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const renderRightSection = () => {
        const path = location.pathname;

        if (path === '/') return null;

        // ✅ 메인 페이지: 항상 검색창, 나의 영화관, 토글 스위치 나열
        if (path.startsWith('/main')) {
            return (
                <div className="header-actions">
                    <div className="header-search-bar-wrapper">
                        <SearchBar />
                    </div>
                    <Link to="/my-cinema" className="header-link">나의 영화관</Link>
                    <ToggleSwitch isOn={isDarkMode} toggle={toggleMode} />
                </div>
            );
        }

        // 시네마 관련 페이지
        if (path.startsWith('/my-cinema') || path.startsWith('/user') || path.startsWith('/opposite')) {
            return (
                <div className="header-actions">
                    <Link to="/wishlist" className="header-link">찜한 작품</Link>
                    <button className="header-btn" onClick={handleLogout}>로그아웃</button>
                </div>
            );
        }

        // 찜한 작품 페이지
        if (path.startsWith('/wishlist')) {
            return (
                <div className="header-actions">
                    <Link to="/my-cinema" className="header-link">나의 영화관</Link>
                </div>
            );
        }

        return null;
    };

    return (
        <header className={`global-header ${isDarkMode ? 'dark' : ''}`}>
            <div className="header-inner">
                <div className="header-left">
                    {location.pathname === '/' ? (
                        <Logo isDarkMode={isDarkMode} />
                    ) : (
                        <Link to="/main"><Logo isDarkMode={isDarkMode} /></Link>
                    )}
                </div>

                <div className="header-center"></div>

                <div className="header-right">
                    {renderRightSection()}
                </div>
            </div>
        </header>
    );
};

export default Header;