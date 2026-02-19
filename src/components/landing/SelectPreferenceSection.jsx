import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './SelectPreferenceSection.css';
import ContentCard from '../content/ContentCard';

const SelectPreferenceSection = ({ onNext }) => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]); // 백엔드에서 받은 영화 목록
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
    const [ratedMovies, setRatedMovies] = useState({});
    const [isLoading, setIsLoading] = useState(true);
//함수 크게 두가지로 구분(백과의 소통)
    // 1. 컴포넌트 마운트 시 초기 영화 목록(추천 또는 인기작) 불러오기
    useEffect(() => {
        const fetchInitialMovies = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVICE_API_URL}/users/contents`);
                setMovies(response.data); 
            } catch (error) {
                console.error("영화 로드 실패:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitialMovies();
    }, []);

    // 2. 검색어 입력 시 백엔드 검색 API 호출
    const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length === 0) return;

  try {
     const response = await axios.get(`${import.meta.env.VITE_SERVICE_API_URL}/feeds/search-content`,
            {params: { keyword: value }} //-> 키워드 밸류 주기
        );
        setMovies(response.data);
    } catch (error) {
        console.error("검색 오류:", error);
    }
};


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
                movieId: parseInt(id),
                rating: data.rating,
            }));

            await axios.post(`${import.meta.env.VITE_SERVICE_API_URL}/users/onboarding`, { 
                ratings: payload 
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (onNext) {
                    onNext();}
            else navigate('/main');
        } catch (error) {
            alert("저장에 실패했습니다. 다시 시도해주세요.");
            console.error("제출 실패:", error);
        }
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
                <input 
                    type="text" 
                    placeholder="제목을 검색해 주세요." 
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <div className="movie-grid">
                {isLoading ? <p>영화를 불러오는 중...🎞️</p> : 
            movies.map(movie => (
          <ContentCard
           key={movie.id}
           movie={movie}
           currentRating={ratedMovies[movie.id]?.rating || 0}
           onRate={handleRateMovie}
          />))
            
                }
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
export default SelectPreferenceSection;