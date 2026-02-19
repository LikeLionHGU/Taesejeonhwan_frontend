import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../components/cinema/UserInfo';
import ContentGrid from '../components/content/ContentGrid';
import '../styles/pages/CinemaPage.css';

// 더미 데이터
import movie1 from '../assets/movie1.png';
import movie2 from '../assets/movie2.png';
import movie3 from '../assets/movie3.png';
import movie4 from '../assets/movie4.png';
import movie5 from '../assets/movie5.png';
import profileImg from '../assets/profile.png';

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
            profile_img: profileImg,
            follower_count: 134,
            following_count: 10,
            genre_keywords: ["로맨스", "가족", "드라마", "코미디", "액션"]
        });

        setContents([
            { content_id: 1, title: "나우유씨미", poster: movie1, rating: 5.0, year: "2024" },
            { content_id: 2, title: "원더", poster: movie2, rating: 5.0, year: "2023" },
            { content_id: 3, title: "그린북", poster: movie3, rating: 5.0, year: "2018" },
            { content_id: 4, title: "어바웃타임", poster: movie4, rating: 5.0, year: "1997" },
            { content_id: 5, title: "대도시의 사랑법", poster: movie5, rating: 4.5, year: "2023" },
            { content_id: 6, title: "폴아웃", poster: movie1, rating: 4.8, year: "2024" },
            { content_id: 7, title: "킬러의 보디가드", poster: movie2, rating: 4.2, year: "2017" },
            { content_id: 8, title: "곡성", poster: movie3, rating: 5.0, year: "2016" },
            { content_id: 9, title: "국제시장", poster: movie4, rating: 4.5, year: "2014" },
            { content_id: 10, title: "검은 사제들", poster: movie5, rating: 4.0, year: "2015" },
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