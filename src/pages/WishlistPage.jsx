import React from 'react';
import ContentGrid from '../components/content/ContentGrid';
import Header from '../components/common/Header';

/*
찜한 영화 페이지
ContentGrid 사용하면 됨!
*/
const WishlistPage = () => {
    // 찜한 영화 목록 API 호출 기능 추가해야 햄 (일단 없으면 더미값 넣어서!)
    // 그리고 가져올 때 param 같은 거 이름 통일하는 게 좋음
    const wishMovies = [ ];

    return (
        <div className="wishlist-page">
            <div className="page-content">
                <h1>찜한 영화 ({wishMovies.length})</h1>
                <ContentGrid
                    movies={wishMovies}
                    onMovieClick={(movie) => console.log("상세 페이지 ㄱ?", movie)}
                />
            </div>
        </div>
    );
};

export default WishlistPage;