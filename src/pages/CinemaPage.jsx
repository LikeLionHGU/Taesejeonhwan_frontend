import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../components/cinema/UserInfo';
import ContentGrid from '../components/content/ContentGrid';
import '../styles/pages/CinemaPage.css';

// pageMode: 'MY' (나의 영화관), 'USER' (타인 영화관)
const CinemaPage = ({ pageMode = 'MY' }) => {
    const { userId } = useParams(); // URL 파라미터 (타인 페이지일 때 ID)
    const [contents, setContents] = useState([]);
    const [userData, setUserData] = useState(null);

    // 1. 데이터 로딩 함수 (UserInfo에서 수정 완료 시 다시 호출하기 위해 함수로 분리)
    const fetchUserData = useCallback(async () => {
        // ★ TODO: 실제 API 연동 시에는 여기서 axios.get(...) 호출
        // const targetId = pageMode === 'MY' ? localStorage.getItem('userId') : userId;
        // const res = await userApi.getProfile(targetId); ...

        console.log("데이터를 불러옵니다...");

        // [더미 데이터 설정]
        setUserData({
            user_id: userId || 1,
            nickname: pageMode === 'MY' ? "happyday" : "@moovie7",
            profile_img: "https://via.placeholder.com/150",
            follower_count: 134,
            following_count: 10,
            genre_keywords: ["로맨스", "가족", "드라마", "코미디", "액션"]
        });

        // [콘텐츠 더미 데이터]
        setContents([
            { content_id: 1, title: "대도시의 사랑법", poster: "https://via.placeholder.com/200x300", rating: 5.0, year: "2024" },
            { content_id: 2, title: "킹더랜드", poster: "https://via.placeholder.com/200x300", rating: 5.0, year: "2023" },
            { content_id: 3, title: "나의 아저씨", poster: "https://via.placeholder.com/200x300", rating: 5.0, year: "2018" },
            { content_id: 4, title: "타이타닉", poster: "https://via.placeholder.com/200x300", rating: 5.0, year: "1997" },
            { content_id: 5, title: "30일", poster: "https://via.placeholder.com/200x300", rating: 4.5, year: "2023" },
            { content_id: 6, title: "폴아웃", poster: "https://via.placeholder.com/200x300", rating: 4.8, year: "2024" },
            { content_id: 7, title: "킬러의 보디가드", poster: "https://via.placeholder.com/200x300", rating: 4.2, year: "2017" },
            { content_id: 8, title: "곡성", poster: "https://via.placeholder.com/200x300", rating: 5.0, year: "2016" },
            { content_id: 9, title: "국제시장", poster: "https://via.placeholder.com/200x300", rating: 4.5, year: "2014" },
            { content_id: 10, title: "검은 사제들", poster: "https://via.placeholder.com/200x300", rating: 4.0, year: "2015" },
        ]);
    }, [pageMode, userId]);

    // 2. 초기 로딩 및 조건 변경 시 실행
    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    if (!userData) return null;

    return (
        <div className="cinema-page-wrapper">
            <div className="cinema-content-area">

                {/* 페이지 타이틀 */}
                {pageMode === 'USER' && (
                    <h2 className="page-title">{userData.nickname}님의 영화관</h2>
                )}
                {pageMode === 'MY' && (
                    <h2 className="page-title">나의 영화관</h2>
                )}

                {/* 유저 정보 (프로필) */}
                {/* ★ onUpdate에 fetchUserData를 넘겨서, 수정 후 새로고침 되도록 함 */}
                <UserInfo
                    user={userData}
                    isMyPage={pageMode === 'MY'}
                    onUpdate={fetchUserData}
                />

                {/* 콘텐츠 그리드 영역 */}
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