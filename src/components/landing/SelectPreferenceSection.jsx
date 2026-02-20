import React, { useState, useEffect } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import "./SelectPreferenceSection.css";
import ContentCard from "../content/ContentCard";
import { contentApi } from "../../api/api";

const SelectPreferenceSection = ({ onNext }) => {
  //메인 갈때 쓴 임시루트 주석const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratedMovies, setRatedMovies] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInitialMovies();
  }, []);

  const fetchInitialMovies = async () => {
    try {
    //직접 호출하지 말고, api,js 통해서 호출하기->최적화
    const responseMovie = await contentApi.getOnboardingContents()
    
   setMovies(responseMovie.data.List); 
    } catch (err) {
      console.error("초기 영화 리스트 호출 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };
//위쪽 수정 완료




  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);//유저의 입력값을 받기

    if (!value.trim()) {//입력값 비어있으면 다시 영화api호출
      fetchInitialMovies();
      return;
    }

    try {
    const searchMovie =await contentApi.searchContent(value);
    setMovies(searchMovie.data.results);
    
    } 
    catch (err){console.error("검색 실패:", err);
    }
  };


//검새 수정 완료
  
  const handleRateMovie = (movie, rating) => {
    setRatedMovies((prev) => ({
      ...prev,
      [movie.content_id]: { rating, movie },
    }));
  };




  const handleComplete = async () => {
    const ratedCount = Object.keys(ratedMovies).length;
    if (ratedCount < 10) return;

    try {
      const userContentsPayload = Object.entries(ratedMovies).map(([id, data]) => ({
        content_id: Number(id),
        rating: data.rating,
      }));

//임시 호출
const topKeywords = await contentApi.getOnboardingKeywords();


      onNext(topKeywords.data);
/*
       const topKeywords =await contentApi.getOnboardingKeywords()
      
/*온보딩 리스트 받는 코드
      await axios.post(`${API_URL}/users/onboarding`,
        { 
            user_id: Number(id),
            nickname: String(), 
            user_contents: userContentsPayload,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
     /*메인가는임시루트 onNext ? onNext() : navigate("/main");*/
     
     onNext();
    } catch (err) {
      alert("저장 실패. 다시 시도해주세요.");
      console.error("유저 정보 제출 실패:", err);
    }
  };




  const ratedCount = Object.keys(ratedMovies).length;
  const selectedMoviesList = Object.values(ratedMovies);
  const isReady = ratedCount >= 10;

  return (
    <div className="pref-section-container">
      <header className="pref-header">Otte</header>

      <div className="pref-title-area">
        <h2>인상 깊게 본 작품이 있나요?</h2>
        <p>
          10개를 골라주시면, 흩어진 취향을 모아 정리해드릴게요. ({ratedCount}/10)
        </p>
      </div>

      {selectedMoviesList.length > 0 && (
        <div className="selected-movies-area">
          <div className="selected-movies-list">
            {selectedMoviesList.map(({ movie, rating }) => (
              <div key={movie.content_id} className="selected-movie-item">
                <img
                 src={movie.poster} 
                alt={movie.title} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pref-search-bar">
        <input
          type="text"
          placeholder="🔎  제목을 검색해 주세요."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="movie-grid">
        {isLoading ? (
          <p>영화를 불러오는 중... 🎞️</p>
        ) : (
          movies.map((movie) => (
            <ContentCard
              key={movie.content_id}
              movie={movie}
              movieRating={ratedMovies[movie.content_id]?.rating || 0}
              onRate={handleRateMovie}
              showRating={true}
            />
          ))
        )}
      </div>

      <div className="pref-floating-bar">
        <button
          className={`pref-submit-btn ${isReady ? "active" : ""}`}
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