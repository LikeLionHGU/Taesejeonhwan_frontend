import React, { useState, useEffect } from 'react';
import ContentGrid from '../components/content/ContentGrid';

const WishlistPage = () => {
    const [wishMovies, setWishMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // TODO: 백엔드 찜한 영화 목록 API 연동
        const fetchWishlist = async () => {
            setIsLoading(true);
            try {
                // const res = await contentApi.getWishlist();
                // setWishMovies(res.data);

                // 일단 에러 안 나게 빈 배열 처리
                setWishMovies([]);
            } catch (error) {
                console.error("찜한 작품 로딩 실패:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    return (
        <div className="wishlist-page">
            <div className="page-content">
                <div className="wishlist-header">
                    <h1>찜한 작품 <span className="count">({wishMovies.length})</span></h1>
                    <p>더 이상 미루지 말고, 오늘 바로 만나보세요</p>
                </div>

                {isLoading ? (
                    <div className="loading-spinner">로딩 중입니다...</div>
                ) : (
                    <ContentGrid
                        contents={wishMovies}
                        onContentClick={(contentId) => console.log("모달 열기 요청, ID:", contentId)}
                    />
                )}
            </div>
        </div>
    );
};

export default WishlistPage;