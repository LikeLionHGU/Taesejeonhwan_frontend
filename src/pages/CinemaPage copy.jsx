import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../components/cinema/UserInfo';
import ContentGrid from '../components/content/ContentGrid';
import '../styles/pages/CinemaPage.css';

// isDarkMode prop 제거 (항상 라이트모드)
const CinemaPage = ({ pageMode = 'MY' }) => {
    const { userId } = useParams();
    const [contents, setContents] = useState([]);
    const [userData, setUserData] = useState(null);

    // ... (더미 데이터 useEffect 코드는 기존과 동일 유지) ...
    // ...

    if (!userData) return null;

    return (
        // .dark-mode 클래스 로직 제거 -> 항상 .light-mode 스타일 적용됨
        <div className="cinema-page-wrapper">
            <div className="cinema-content-area">

                {pageMode === 'USER' && (
                    <h2 className="page-title">{userData.nickname}님의 영화관</h2>
                )}
                {pageMode === 'MY' && (
                    <h2 className="page-title">나의 영화관</h2>
                )}

                {/* UserInfo에도 isDarkMode 전달 안 함 */}
                <UserInfo
                    user={userData}
                    isMyPage={pageMode === 'MY'}
                />

                <div className="grid-section">
                    <div className="filter-row">
                        <button className="add-content-btn">+ 평 추가</button>
                    </div>

                    <ContentGrid
                        contents={contents}
                        pageMode={pageMode}
                        ownerId={userData.user_id}
                    />
                </div>
            </div>
        </div>
    );
};

export default CinemaPage;