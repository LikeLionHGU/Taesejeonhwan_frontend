import React, { useEffect } from 'react';
import ContentGrid from '../components/content/ContentGrid';
import ContentInfo from '../../src/components/review/ContentInfo';

//

// 테스트용 더미 이미지
/*
import m1 from '../assets/landing/m1.png';
import m2 from '../assets/landing/m2.png';
import m3 from '../assets/landing/m3.png';
*/
/*
찜한 영화 페이지
ContentGrid 사용하면 됨!

체크리스트
1. api 넣고
2. 후기 작성 모달 받아와서 수정
3. 모달 완료하면 이미지 이동하게
*/
    
const  WishlistPage= () =>{
const [setData, unsetData] =useState();
useEffect(()=>{

    const getWishlist = async() => {

try 
{
const uesrWish = localStorage.getItem("userId");
if(!uesrWish) return;

    // 찜한 영화 목록 API 호출 기능 추가해야 햄 -> 
const response = await contentApi.getWishlist(uesrWish);
unsetData(response.data); 

console.log("위시리스트 영화 데이터:", response.data);

const Wishlist =response.data;//만약 배열값이면[]변경

setWishMovies(Wishlist);

    }

    catch(err) {
        console.log("위시리스트 불러오기 실패", err)
    }
    


};
getWishlist();



},[]);

    return (
        <div className="wishlist-page">
            <div className="page-content">
                <div className="wishlist-header">
             <h1>찜한 작품 <span className="count">({wishMovies.length})</span></h1>
             <p>더 이상 미루지 말고, 오늘 바로 만나보세요</p>
         </div>

    <ContentGrid
         movies={setData}

        onMovieClick={(movie) => console.log("영화 정보를 더 상세히 보시겠어요?😍", movie)}/>
            </div></div>
    );
};

export default WishlistPage;