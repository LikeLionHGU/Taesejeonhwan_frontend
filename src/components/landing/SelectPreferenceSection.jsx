import React, { useState } from 'react';
import './SelectPreferenceSection.css'; // CSS 분리

// 더미 이미지들 (경로를 맞춰주세요)
import m1 from '../../assets/landing/m1.png';
import m2 from '../../assets/landing/m2.png';
import m3 from '../../assets/landing/m3.png';
import m4 from '../../assets/landing/m4.png';
import m5 from '../../assets/landing/m5.png';
import m6 from '../../assets/landing/m6.png';
import m7 from '../../assets/landing/m7.png';
import m8 from '../../assets/landing/m8.png';
import m9 from '../../assets/landing/m9.png';
import m10 from '../../assets/landing/m10.png';
import m11 from '../../assets/landing/m11.png';
import m12 from '../../assets/landing/m12.png';

//더미 데이터
const DUMMY_MOVIES = [
    { id: 1, title: '올드보이', year: 2024, img: m1, keywords: ['스릴러', '드라마'] },
    { id: 2, title: '어바웃타임', year: 2024, img: m2, keywords: ['로맨스', '코미디'] },
    { id: 3, title: '그린북', year: 2019, img: m3, keywords: ['드라마', '음악'] },
    { id: 4, title: '에밀리 파리에 가다', year: 2023, img: m4, keywords: ['로맨스', '코미디'] },
    { id: 5, title: '30일', year: 2023, img: m5, keywords: ['코미디', '로맨스'] },
    { id: 6, title: '라라랜드', year: 2018, img: m6, keywords: ['뮤지컬', '로맨스'] },
    { id: 7, title: '극한직업', year: 2024, img: m7, keywords: ['코미디', '액션'] },
    { id: 8, title: '브리저튼', year: 2022, img: m8, keywords: ['로맨스', '시대극'] },
    { id: 9, title: '킬러의 보디가드', year: 2024, img: m9, keywords: ['액션', '코미디'] },
    { id: 10, title: '원더', year: 2024, img: m10, keywords: ['가족', '드라마'] },
    { id: 11, title: '더 글로리', year: 2024, img: m11, keywords: ['스릴러', '드라마'] },
    { id: 12, title: '신세계', year: 2024, img: m12, keywords: ['범죄', '액션'] },
];

const SelectPreferenceSection = ({ onNext }) => {
   
    const [ratedMovies, setRatedMovies] = useState({});
    const handleRateMovie = (movieId, rating, keywords) => {
        setRatedMovies(prev => ({
            ...prev,
            [movieId]: { rating, keywords }
        }));
    };

    const handleComplete = async () => {
        if (Object.keys(ratedMovies).length < 10) return;

        try {
            const payload = Object.entries(ratedMovies).map(([id, data]) => ({
                movieId: id,
                rating: data.rating,
                keywords: data.keywords
            }));

            await fetch('/users/onboarding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ratings: payload })
            });
            onNext();
        } catch (error) {
            console.error("제출 실패:", error);
        }
      

        console.log("제출된 데이터:", ratedMovies);
        onNext(); 
    };

    const ratedCount = Object.keys(ratedMovies).length;
    const isReady = ratedCount >= 10;

    return (
        <div className="pref-section-container">
            <header className="pref-header">Otte</header>

            <div className="pref-title-area">
                <h2>인상 깊게 본 작품이 있나요?</h2>
                <p>10개를 골라주시면, 흩어진 취향을 모아 정리해드릴게요 ({ratedCount}/10)</p>
            </div>

            <div className="pref-search-bar">
            <input type="text" placeholder="제목을 검색해 주세요." />
            </div>

            <div className="movie-grid">
                {DUMMY_MOVIES.map(movie => (
                 <MovieCard 
                 key={movie.id} 
                 movie={movie} 
                 currentRating={ratedMovies[movie.id]?.rating || 0}
                onRate={handleRateMovie}
                    />
                ))}
            </div>

            <div className="pref-floating-bar">
                <button 
                 className={`pref-submit-btn ${isReady ? 'active' : ''}`} 
                 onClick={handleComplete}
                disabled={!isReady}
                >
              등록하기
               </button>
            </div>
        </div>
    );
};

//영화 카드 컴포넌트 ->css확정하고 분리/별 이미지 확인하기
const MovieCard = ({ movie, currentRating, onRate }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div 
            className="movie-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setHoverRating(0); }}
        >
        <div className="poster-wrapper">
            <img src={movie.img} alt={movie.title} />
                
        {isHovered && (
        <div className="hover-overlay">
            <div className="stars">
             {[1, 2, 3, 4, 5].map(star => (
                    <span 
                    key={star}
                     className={`star ${star <= (hoverRating || currentRating) ? 'filled' : 'empty'}`}
                     onMouseEnter={() => setHoverRating(star)}
                 onClick={() => onRate(movie.id, star, movie.keywords)} >
                         ★
                     </span>
                ))}</div></div>
                )}
            </div>
            <div className="movie-info">
                <p className="title">{movie.title}</p>
                <p className="year">{movie.year}</p>
            </div>
        </div>
    );
};

export default SelectPreferenceSection;