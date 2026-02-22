import React, { useEffect, useState } from 'react';
import ContentGrid from '../components/content/ContentGrid'; 
import ContentInfo from '../../src/components/review/ContentInfo';
import AddReview from '../../src/components/review/AddReview';
import { contentApi } from '../api/api';

/*
찜한 영화 페이지
ContentGrid 사용하면 됨!

체크리스트
1. api 넣고 -> 확인
 1-1. 삭제 기능 -> 성공

2. 후기 작성 모달 받아와서 수정
3. 모달 완료하면 이미지 이동하게
*/
    
const WishlistPage = () => {
    const [setData, unsetData] = useState([]); // get해온 값
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 온오픈
    const [selectedMovieId, setSelectedMovieId] = useState(null); // 포스트할값

    const getWishlist = async () => {
        try {
            const userWish = localStorage.getItem("userId");
            if (!userWish) return;

            // 찜한 영화 목록 API 호출 기능 추가해야 햄 ->네! 
            const response = await contentApi.getWish(userWish);
            const wishlist = (response.data);

            unsetData(wishlist);
            console.log("위시리스트 영화 데이터:", wishlist);
        } catch(err) {
            console.log("위시리스트 갱신 실패", err);
        }
    };

    // get
    useEffect(() => { // 시작할 때 목록 한번 불러오기
        getWishlist([]);
        window.addEventListener('wishlistChanged', getWishlist);
        return () => {
            window.removeEventListener('wishlistChanged', getWishlist);
        };
    }, []);

    /* 모달 띄우기 체크리스트 ////AddReview
    1. 받아오는 위시리스트 배열에서, 리뷰 작성 모달을 불러오는데 
       필요한 객체만 꺼내서 받는 코드 짜기 -> 아마 콘텐츠 아이디+유저 아이디면 충분할 것 같은데?
       1-1 명세서 확인, 백엔드 이중확인
    2. 받아온 모달 화면에 뿌리기
    */

    const handleMovieClick = (contentId) => {
        setSelectedMovieId(contentId);
        setIsModalOpen(true);
    };

    return (
        <div className="wishlist-page">
            <div className="page-content">
                <div className="wishlist-header">
                    <h1 className="wishHead">찜한 작품 <span className="count">({setData.length})</span></h1>
                    <p className="wishP">더 이상 미루지 말고, 오늘 바로 만나보세요</p>
                </div>

                <ContentGrid
                    contents={setData}
                    /*=> console.log("영화 정보를 더 상세히 보시겠어요?😍", movie)*/
                    onContentClick={handleMovieClick}
                />    
            </div>

            <ContentInfo
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}   
                contentId={selectedMovieId}
                onWishChange={getWishlist} 
                pageMode="MY"
            />
        </div>
    );
};

export default WishlistPage;