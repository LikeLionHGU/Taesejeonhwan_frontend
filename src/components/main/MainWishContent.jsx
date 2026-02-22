import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './MainWishContent.css';
import {WishApi} from '../../api/api';

const MainWishContent = () => {
    const [wishData, setWishData] = useState([]);//받아온 데이터 배열로 저장
    const navigate = useNavigate();

  const fetchWishMovies = async () => {//에이피아이 갱신 함수
        try {
        const myId = localStorage.getItem("myId");
            if (!myId) return;

            // API 호출
            const response = await WishApi.getWish(myId); 
            
            const filteredMovies = response.data.filter(movie => !movie.comment);
            
            setWishData(filteredMovies.slice(0,3)); //스케일 3

        } catch (err) {
            console.error("사이드바 위시리스트 호출 실패:", err);
        }
    };

    useEffect(() => {
        fetchWishMovies();//화면 처음 뜰때, 기존 찜 목록 받고

        window.addEventListener('wishlistChanged', fetchWishMovies);//위시 체인지 될 때마다 재실행
        return () => {
            window.removeEventListener('wishlistChanged', fetchWishMovies);
        };
    }, []);

    return (
        <div className="main-wish-container">
            <div className="wish-header">
                <div className="wish-title-area">
                    <span className="wish-title">찜한 작품</span>
                    {/* 💡 5. wishData의 실제 길이 넣기 */}
                    <span className="wish-count">({wishData.length})</span> 
                </div>
                {/* 💡 6. 버튼에 네비게이트 이벤트 연결 */}
                <div className="wish-view-all" style={{ cursor: 'pointer' }} onClick={() => navigate('/wishlist')}>
                    <span>전체 보기</span>
                    <span className="arrow-icon"></span>
                </div>
            </div>

            <div className="wish-list">
                {/* 💡 7. wishMovies 대신 wishData를 map으로 돌리기 */}
                {wishData.length > 0 ? (
                    wishData.map((movie) => (
                        <div key={movie.content_id || movie.id} className="wish-item">
                            <img src={movie.poster} alt={movie.title} className="wish-poster" />

                            <div className="wish-info">
                                <div className="wish-title-row">
                                    <span className="font-label wish-item-title">{movie.title}</span>
                                    {/* 연도 데이터 안전하게 뽑기 */}
                                    <span className="wish-item-year">
                                        {movie.year || movie.release_date?.substring(0, 4)}
                                    </span>
                                </div>
                                <div className="wish-tags">
                                    {(movie.tags || []).map((tag, idx) => (
                                        <span key={idx} className="wish-tag">#{tag}</span>
                                    ))}
                                </div>
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