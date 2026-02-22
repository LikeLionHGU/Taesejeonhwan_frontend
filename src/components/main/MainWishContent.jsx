import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './MainWishContent.css';
import  {contentApi } from '../../api/api';

const MainWishContent = () => {
    const [wishData, setWishData] = useState([]);//받아온 데이터 배열로 저장
    const navigate = useNavigate();

  const fetchWishMovies = async () => {//에이피아이 갱신 함수
        try {
        const myId = localStorage.getItem("userId");
            if (!myId) return;

            // API 호출
            const response = await contentApi.getWish(myId); 
            
            const wishedMovies = (response.data);
            
            setWishData(wishedMovies); //3개까지만 배열에넣기

        } catch (err) {
            console.error("사이드바 위시리스트 호출 실패:", err);
            console.log("호출 데이터 순서", err);
        }
    };

    useEffect(() => {
        fetchWishMovies();//화면 처음 뜰때, 기존 찜 목록 받고

        window.addEventListener('wishlistChanged', fetchWishMovies);//위시 체인지 될 때마다 재실행
        return () => {
            window.removeEventListener('wishlistChanged', fetchWishMovies);
        };
    }, []);

    return (//위시카운트변경 -> 위시데이터.길이
        <div className="main-wish-container">
            <div className="wish-header">
                <div className="wish-title-area">
                    <span className="wish-title">찜한 작품</span>
                    <span className="wish-count">({wishData.length})</span> 
                </div>
                <div className="wish-view-all"onClick={( )=>navigate('/wishlist')}>
                    <span>전체 보기</span>
                    <span className="arrow-icon"></span>
                </div>
            </div>

            <div className="wish-list">
                {wishData.length > 0 ?(wishData.map((movie) => (
                        <div key={movie.content_id || movie.id} className="wish-item">
                            <img src={movie.poster} alt={movie.title} className="wish-poster" />

                            <div className="wish-title-year">
                                <div className="wish-title-row">
                                    <span className="font-label wish-item-title">
                                       
                                       {movie.title&& movie.title.length >10 
                                        ? movie.title.substring(0,10) + '...' : movie.title}
                                       
                                       </span>
                                   
                                    <span className="wish-item-year">
                                        {movie.year || movie.release_date?.substring(0, 4)}
                                    </span>
                                </div>


                                 <span className = "wish-overveiw">
                                          {movie.overview}
                                    </span>
                               
                                <p className="font-user-name wish-desc">{movie.desc || movie.summary}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    // 데이터가 하나도 없을 때 보여줄 화면
                    <div style={{ padding: '20px', color: '#888', fontSize: '14px' }}>
                        아직 찜한 작품이 없습니다. 새로운 영화를 찾아보세요!
                    </div>
                )}

            </div>
        </div>
    );
};

export default MainWishContent;