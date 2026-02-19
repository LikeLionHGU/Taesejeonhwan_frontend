import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../components/cinema/UserInfo';
import ContentGrid from '../components/content/ContentGrid';
import '../styles/pages/CinemaPage.css';

// pageMode: 'MY' (나의 영화관), 'USER' (타인 영화관)
const CinemaPage = ({ pageMode = 'MY' }) => {
    const { userId } = useParams();
    const [contents, setContents] = useState([]);
    const [userData, setUserData] = useState(null);

    const fetchUserData = useCallback(async () => {
        console.log("데이터를 불러옵니다...");

        // 더미 데이터........
        setUserData({
            user_id: userId || 1,
            nickname: pageMode === 'MY' ? "happyday" : "@moovie7",
            profile_img: "../src/assets/profile.png",
            follower_count: 134,
            following_count: 10,
            genre_keywords: ["로맨스", "가족", "드라마", "코미디", "액션"]
        });

        setContents([
            { content_id: 1, title: "나우유씨미", poster: "../src/assets/movie1.png", rating: 5.0, year: "2024" },
            { content_id: 2, title: "원더", poster: "../src/assets/movie2.png", rating: 5.0, year: "2023" },
            { content_id: 3, title: "그린북", poster: "../src/assets/movie3.png", rating: 5.0, year: "2018" },
            { content_id: 4, title: "어바웃타임", poster: "../src/assets/movie4.png", rating: 5.0, year: "1997" },
            { content_id: 5, title: "대도시의 사랑법", poster: "../src/assets/movie5.png", rating: 4.5, year: "2023" },
            { content_id: 6, title: "폴아웃", poster: "../src/assets/movie1.png", rating: 4.8, year: "2024" },
            { content_id: 7, title: "킬러의 보디가드", poster: "../src/assets/movie2.png", rating: 4.2, year: "2017" },
            { content_id: 8, title: "곡성", poster: "../src/assets/movie3.png", rating: 5.0, year: "2016" },
            { content_id: 9, title: "국제시장", poster: "../src/assets/movie4.png", rating: 4.5, year: "2014" },
            { content_id: 10, title: "검은 사제들", poster: "../src/assets/movie5.png", rating: 4.0, year: "2015" },
        ]);
    }, [pageMode, userId]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    if (!userData) return null;

    return (
        <div className="cinema-page-wrapper">
            <div className="cinema-content-area">

                {pageMode === 'USER' && (
                    <h2 className="page-title">{userData.nickname}님의 영화관</h2>
                )}
                {pageMode === 'MY' && (
                    <h2 className="page-title">나의 영화관</h2>
                )}

                <UserInfo
                    user={userData}
                    isMyPage={pageMode === 'MY'}
                    onUpdate={fetchUserData}
                />

                <div className="grid-section">
                    <div className="filter-row">
                        <button className="add-content-btn">+ 등록하기</button>
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