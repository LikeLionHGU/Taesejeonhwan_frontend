import React from 'react';
import ContentGrid from '../components/content/ContentGrid';

// 테스트용 더미 이미지
import m1 from '../assets/landing/m1.png';
import m2 from '../assets/landing/m2.png';
import m3 from '../assets/landing/m3.png';

/*
찜한 영화 페이지
ContentGrid 사용하면 됨!

체크리스트
1. api 넣고
2. 후기 작성 모달 받아와서 수정
3. 모달 완료하면 이미지 이동하게
*/
const WishlistPage = () => {
    // 찜한 영화 목록 API 호출 기능 추가해야 햄 -> 
    const wishMovies = [
        { id: 1, title: '어바웃타임', year: 2024, img: m1, rating: 5.0 },
        { id: 2, title: '대도시의 사랑법', year: 2024, img: m2, rating: 5.0 },
        { id: 3, title: '그린북', year: 2024, img: m3, rating: 5.0 },
    ];
    return (
        <div className="wishlist-page">
            
            <div className="page-content">
                <div className="wishlist-header">
             <h1>찜한 작품 <span className="count">({wishMovies.length})</span></h1>
             <p>더 이상 미루지 말고, 오늘 바로 만나보세요</p>
         </div>

    <ContentGrid
         movies={wishMovies}
        onMovieClick={(movie) => console.log("영화 정보를 더 상세히 보시겠어요?😍", movie)}/>
            </div></div>
    );
};

export default WishlistPage;