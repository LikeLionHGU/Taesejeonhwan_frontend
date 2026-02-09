import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>메인 페이지 🏠</h1>
            <p>처음 시작 페이지라고 생각하면 됨</p>
            <button onClick={() => navigate('/login')}>
                로그인 하러 가기
            </button>
        </div>
    );
};

export default Home;