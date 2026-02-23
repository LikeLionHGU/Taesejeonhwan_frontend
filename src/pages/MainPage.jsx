import React, { useState, useEffect } from 'react';
import MainBanner from '../components/main/MainBanner';
import UserGrid from '../components/main/UserGrid';
import MainWishContent from '../components/main/MainWishContent';
import { contentApi } from '../api/api';
import '../styles/pages/MainPage.css';
//더미용 프사
import defaultProfileImg from '../assets/profile.png';

const MainPage = ({ isDarkMode }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const userId = localStorage.getItem("userId") || 1;
                const mode = isDarkMode ? 'diff' : 'sim';

                const res = await contentApi.getMainFeeds(mode, userId, 1);
                console.log(`서버 응답 데이터 (${mode}):`, res.data);

                if (res.data.feeds && res.data.feeds.length > 0) {
                    setUsers(res.data.feeds);
                } else {
                    alert("같은 취향을 찾지 못했어요...ㅠㅠ 더 많은 영화를 평가해주시면 비슷한 취향의 친구를 더 잘 찾아드릴 수 있어요!");
                    console.log("같은 취향을 찾지 못해 더미 데이터를 띄웁니다.");
                    setUsers([
                        {
                            user_id: 101,
                            nickname: "@movie_lover",
                            profile_img: defaultProfileImg,
                            genre_keyword: ["액션", "SF"]
                        },
                        {
                            user_id: 102,
                            nickname: "@popcorn_killer",
                            profile_img: defaultProfileImg,
                            genre_keyword: ["로맨스", "코미디"]
                        },
                        {
                            user_id: 103,
                            nickname: "@indie_fan",
                            profile_img: defaultProfileImg,
                            genre_keyword: ["다큐", "드라마"]
                        }
                    ]);
                }

            } catch (err) {
                console.error("데이터 로딩 실패,,, 얼른 고쳐볼게유...ㅠ", err);

                setUsers([                ]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [isDarkMode]);

    return (
        <div className={`main-page-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <MainBanner isDarkMode={isDarkMode} />

            <div className="main-content-area">
                <div className="left-section">
                    {isLoading ? (
                        <div>로딩 중입니다... 조오금만 기다려 줘어ㅓ어어유...⏳</div>
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