import React, { useState, useEffect } from "react";
import "./SelectPreferenceSection.css";
import ContentCard from "../content/ContentCard";
import { contentApi } from '../../api/api';

const SelectPreferenceSection = ({ onNext }) => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [ratedMovies, setRatedMovies] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchInitialMovies();
    }, []);

    const fetchInitialMovies = async () => {
        setIsLoading(true);
        try {
            const response = await contentApi.getOnboardingContents();
            const movieData = response.data.results || response.data || [];
            setMovies(movieData);
        } catch (err) {
            console.error("초기 영화 리스트 호출 실패:", err);
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
            const response = await contentApi.searchContent(value);
            const searchData = response.data.results || response.data || [];
            setMovies(searchData);
        } catch (err) {
            console.error("검색 실패:", err);
        }
    };

    const handleRateMovie = (movie, rating) => {
        setRatedMovies((prev) => {
            if (rating === 0) {
                const newState = { ...prev };
                delete newState[movie.content_id];
                return newState;
            }
            return {
                ...prev,
                [movie.content_id]: { rating, movie },
            };
        });
    };

    const handleRemoveSelected = (contentId) => {
        setRatedMovies((prev) => {
            const newState = { ...prev };
            delete newState[contentId];
            return newState;
        });
    };

    const handleComplete = async () => {
        const ratedCount = Object.keys(ratedMovies).length;
        if (ratedCount < 10) return;

        try {
            const currentUserId = localStorage.getItem("userId");
            const profileData = JSON.parse(localStorage.getItem('userProfile')) || {};
            const currentNickname = profileData.nickname || "임시닉네임";

            if (!currentUserId) {
                return alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
            }

            const payloadContents = Object.entries(ratedMovies).map(([id, data]) => ({
                content_id: parseInt(id),
                rating: data.rating,
            }));

            const postData = {
                user_id: Number(currentUserId),
                nickname: currentNickname,
                user_contents: payloadContents
            };

            const response = await contentApi.getOnboardingKeywords(postData);

            if (response.data.result === 'success' || response.data) {
                if (response.data.top5_genres) {
                    const tags = response.data.top5_genres.map((item) => item.genre_name);
                    localStorage.setItem("userTags", JSON.stringify(tags));
                }
                if (onNext) onNext();
            }

        } catch (error) {
            alert("등록 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const ratedCount = Object.keys(ratedMovies).length;
    const selectedMoviesList = Object.values(ratedMovies);
    const isReady = ratedCount >= 10;

    return (
        <div className="pref-section-container">
            {/* Header (Otte) */}
            {/* <div className="pref-header-wrapper">
                <span className="pref-header-dot"></span>
                <span className="pref-header-text">Otte</span>
            </div> */}

            {selectedMoviesList.length === 0 ? (
                <div className="pref-title-area">
                    <h2>인상 깊게 본 작품이 있나요?</h2>
                    <p>
                        10개를 골라주시면, 흩어진 취향을 모아 정리해드릴게요. ({ratedCount}/10)
                    </p>
                </div>
            ) : (
                <div className="selected-movies-area">
                    <div className="selected-movies-list">
                        {selectedMoviesList.map(({ movie }) => (
                            <div key={movie.content_id} className="selected-movie-item">
                                <img src={movie.poster} alt={movie.title} />
                                <button
                                    className="remove-btn"
                                    onClick={() => handleRemoveSelected(movie.content_id)}
                                    title="선택 취소"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

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
                    <p className="loading-msg">영화를 불러오는 중... 🎞️</p>
                ) : movies.length > 0 ? (
                    movies.map((movie) => (
                        <ContentCard
                            key={movie.content_id}
                            movie={movie}
                            movieRating={ratedMovies[movie.content_id]?.rating || 0}
                            onRate={handleRateMovie}
                            isRatingMode={true}
                        />
                    ))
                ) : (
                    <p className="empty-msg">검색 결과가 없습니다.</p>
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