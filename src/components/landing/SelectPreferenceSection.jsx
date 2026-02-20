import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SelectPreferenceSection.css";
import ContentCard from "../content/ContentCard";

const API_URL = import.meta.env.VITE_SERVICE_API_URL;

const SelectPreferenceSection = ({ onNext }) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratedMovies, setRatedMovies] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchInitialMovies();
  }, []);

  const fetchInitialMovies = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/users/contents`);
      setMovies(data);
    } catch (err) {
      console.error("초기 영화 로드 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

 
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      fetchInitialMovies();
      return;
    }

    try {
      const { data } = await axios.get(
        `${API_URL}/feeds/search-content`,
        { params: { keyword: value } }
      );
      setMovies(data);
    } catch (err) {
      console.error("검색 실패:", err);
    }
  };


  const handleRateMovie = (movieId, rating) => {
    setRatedMovies((prev) => ({
      ...prev,
      [movieId]: { rating },
    }));
  };


  const sortedMovies = useMemo(() => {
    return [...movies].sort((a, b) => {
      const aRated = ratedMovies[a.content_id];
      const bRated = ratedMovies[b.content_id];

      if (aRated && !bRated) return -1;
      if (!aRated && bRated) return 1;
      return 0;
    });
  }, [movies, ratedMovies]);











  const handleComplete = async () => {
    const ratedCount = Object.keys(ratedMovies).length;
    if (ratedCount < 10) return;

    try {
      const payload = Object.entries(ratedMovies).map(([id, data]) => ({
        movieId: Number(id),
        rating: data.rating,
      }));

      await axios.post(
        `${API_URL}/users/onboarding`,
        { ratings: payload },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      onNext ? onNext() : navigate("/main");
    } catch (err) {
      alert("저장 실패. 다시 시도해주세요.");
      console.error("온보딩 제출 실패:", err);
    }
  };

  const ratedCount = Object.keys(ratedMovies).length;
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

      <div className="pref-search-bar">
        <input
          type="text"
          placeholder="제목을 검색해 주세요."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="movie-grid">
        {isLoading ? (
          <p>영화를 불러오는 중... 🎞️</p>
        ) : (
          sortedMovies.map((movie) => (
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