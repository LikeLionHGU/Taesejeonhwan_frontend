import React, { useState, useEffect } from 'react';
import MainBanner from '../components/main/MainBanner';
import UserGrid from '../components/main/UserGrid';
import MainWishContent from '../components/main/MainWishContent';
import ContentInfo from '../components/review/ContentInfo'; // ★ 모달 import
import '../styles/pages/MainPage.css';

const MainPage = ({ isDarkMode }) => {
    const [users, setUsers] = useState([]);

    // ★ 모달 상태 관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContentId, setSelectedContentId] = useState(null);
    const [selectedOwnerId, setSelectedOwnerId] = useState(null);

    // 더미 데이터 (기존 유지)
    const dummyData = [
        // ... (보내주신 더미 데이터 그대로 사용) ...
        {
            user_id: 1,
            nickname: "디자인테스트",
            profile_img: "https://via.placeholder.com/150",
            genre_keyword: ["로맨스", "SF", "판타지"],
            content: [
                { content_id: 1, title: "어바웃타임", poster: "https://via.placeholder.com/200x300", rating: 4.5 },
                { content_id: 2, title: "인셉션", poster: "https://via.placeholder.com/200x300", rating: 5.0 },
                { content_id: 3, title: "인터스텔라", poster: "https://via.placeholder.com/200x300", rating: 4.8 },
                { content_id: 4, title: "기생충", poster: "https://via.placeholder.com/200x300", rating: 4.2 },
                { content_id: 5, title: "조커", poster: "https://via.placeholder.com/200x300", rating: 4.9 }
            ]
        },
        // ... 나머지 더미 데이터 ...
    ];

    useEffect(() => {
        setUsers(dummyData);
    }, [isDarkMode]);

    // ★ 포스터 클릭 핸들러
    const handlePosterClick = (contentId, ownerId) => {
        setSelectedContentId(contentId);
        setSelectedOwnerId(ownerId);
        setIsModalOpen(true);
    };

    return (
        <div className={`main-page-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <MainBanner isDarkMode={isDarkMode} />

            <div className="main-content-area">
                <div className="left-section">
                    <UserGrid
                        users={users}
                        onPosterClick={handlePosterClick} // 함수 전달
                    />
                </div>

                <div className="right-section">
                    <MainWishContent />
                </div>
            </div>

            {/* ★ 모달 렌더링 */}
            {selectedContentId && (
                <ContentInfo
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    contentId={selectedContentId}
                    ownerId={selectedOwnerId}
                    pageMode="MAIN" // 메인 페이지 모드 (읽기 전용, 찜하기 가능)
                />
            )}
        </div>
    );
};

export default MainPage;