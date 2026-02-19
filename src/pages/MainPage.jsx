import React, { useState, useEffect } from 'react';
import MainBanner from '../components/main/MainBanner';
import UserGrid from '../components/main/UserGrid';
import MainWishContent from '../components/main/MainWishContent';
import { contentApi } from '../api/api';

const MainPage = ({ isDarkMode }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await contentApi.getMainFeeds();
                console.log("서버 응답 데이터:", res.data);
                setUsers(res.data.results || res.data);
            } catch (err) {
                console.error("데이터 로딩 실패:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={`main-page-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <MainBanner isDarkMode={isDarkMode} />

            <div className="main-content-area">
                <div className="left-section">
                    {isLoading ? (
                        <div>로딩 중입니다... 기다려줘어ㅓㅓ어ㅓㅓㅓ⏳</div>
                    ) : (
                        <UserGrid users={users} />
                    )}
                </div>
                <div className="right-section">
                    <MainWishContent />
                </div>
            </div>
        </div>
    );
};

export default MainPage;