import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header'; // 헤더에 토글 스위치 있음
import MainBanner from '../components/main/MainBanner';
import UserGrid from '../components/main/UserGrid';
import MainWishContent from '../components/main/MainWishContent';
import api from '../api/api';

import '../styles/pages/MainPage.css'; // 페이지 전용 CSS (레이아웃용)

const MainPage = () => {
    // 1. 상태 관리: false=Light(비슷한), true=Dark(정반대)
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [users, setUsers] = useState([]);

    // 2. 모드가 바뀔 때마다 데이터 새로 가져오기
    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                // API 명세서에 따라 mode 값 변경 (similar / diff)
                const mode = isDarkMode ? 'diff' : 'similar';
                // const res = await api.get(`/feeds/${mode}?page=1`);
                // setUsers(res.data.feeds);

                // (테스트용 더미 데이터 - 나중에 지우세요)
                console.log(`현재 모드: ${mode} 데이터를 가져옵니다.`);
                setUsers([/* ...아까 만든 더미 데이터... */]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchFeeds();
    }, [isDarkMode]);

    return (
        // 최상위 div에 클래스를 줘서 CSS에서 색상을 한방에 바꿈
        <div className={`main-page-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>

            {/* 헤더에 토글 함수 전달 */}
            <Header isDarkMode={isDarkMode} toggleMode={() => setIsDarkMode(prev => !prev)} />

            {/* 메인 배너 (텍스트가 바뀜) */}
            <MainBanner isDarkMode={isDarkMode} />

            <div className="main-content-area">
                {/* 왼쪽: 유저 추천 리스트 */}
                <div className="left-section">
                    <UserGrid users={users} />
                </div>

                {/* 오른쪽: 찜한 작품 (사이드바) */}
                <div className="right-section">
                    <MainWishContent />
                </div>
            </div>
        </div>
    );
};

export default MainPage;