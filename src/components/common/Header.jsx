import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('accessToken');

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
            <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                Otte
            </div>

            <nav>
                {isLoggedIn ? (
                    // 로그인 했을 때 보일 메뉴
                    <>
                        <button onClick={() => navigate('/my-cinema')}>나의 영화관</button>
                        <button onClick={() => navigate('/wishlist')}>찜한 콘텐츠</button>
                        <button onClick={() => {
                            localStorage.removeItem('accessToken');
                            navigate('/login');
                        }}>로그아웃</button>
                    </>
                ) : (
                    <button onClick={() => navigate('/login')}>로그인</button>
                )}
            </nav>
        </header>
    );
};

export default Header;