import React, { useState, useEffect } from 'react';
import { userApi } from '../../api/api';
import './MainBanner.css';

const MainBanner = ({ isDarkMode }) => {
    const [myKeywords, setMyKeywords] = useState([]);

    useEffect(() => {
        const fetchMyKeywords = async () => {
            const userId = localStorage.getItem('userId') || 1;
            try {
                const res = await userApi.getUserProfile(userId);

                if (res.data?.table) {
                    const keywords = res.data.table.map(item => item.keyword);
                    setMyKeywords(keywords);
                } else if (res.data?.genre_keyword) {
                    setMyKeywords(res.data.genre_keyword);
                } else {
                    setMyKeywords(['로맨스', '액션', '코미디', '드라마', 'SF']); 
                }
            } catch (error) {
                console.error("내 장르 키워드를 불러오는데 실패했습니다.", error);
                setMyKeywords(['로맨스', '액션', '코미디', '드라마', 'SF']); 
            }
        };

        fetchMyKeywords();
    }, []);

    return (
        <div className={`main-banner-container ${isDarkMode ? 'dark' : ''}`}>
            <div className="main-banner-bg"></div>

            <div className="main-banner-content">
                <h1 className="main-banner-title">
                    {isDarkMode
                        ? '당신의 취향 바깥을 탐험해보세요'
                        : '나와 취향이 비슷한 사람을 추천받으세요'}
                </h1>

                <p className="main-banner-subtitle">
                    {isDarkMode
                        ? '당신과 정반대의 취향을 가진 유저를 통해 새로운 세계를 발견해보세요.'
                        : '선택한 장르 태그를 기반으로 작품 취향이 비슷한 유저를 추천해드려요'}
                </p>

                <div className="main-banner-keywords">
                    {myKeywords.map((keyword, index) => (
                        <div key={index} className="main-banner-keyword-badge">
                            #{keyword}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainBanner;