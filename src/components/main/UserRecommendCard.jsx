import React from 'react';
import './UserRecommendCard.css';
import defaultProfileImg from '../../assets/profile.png';
import dummyMoviePoster from '../../assets/movie1.png';

const UserRecommendCard = ({ user }) => {
    const dummyMovies = [
        { id: 1, title: '나우유씨미', year: '2013', poster: dummyMoviePoster },
        { id: 2, title: '원더', year: '2013', poster: dummyMoviePoster },
        { id: 3, title: '그린북', year: '2013', poster: dummyMoviePoster },
        { id: 4, title: '어바웃타임', year: '2013', poster: dummyMoviePoster },
        { id: 5, title: '대도시의 사랑법', year: '2013', poster: dummyMoviePoster },
    ];

    return (
        <div className="user-recommend-card">
            <div className="card-top-section">
                <div className="user-profile-area">
                    <img
                        src={user?.profile_img || defaultProfileImg}
                        alt="profile"
                        className="user-profile-img"
                    />
                    <div className="user-info-text">
                        <span className="user-name">{user?.nickname || '@moovie7'}</span>
                        <div className="tags-row">
                            {(user?.genre_keyword || ["로맨스", "가족", "드라마", "코미디", "액션"]).map((tag, idx) => (
                                <span key={idx} className="user-tag">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <button className="follow-btn">+ 팔로우</button>
            </div>

            <div className="movies-row">
                {dummyMovies.map((movie) => (
                    <div key={movie.id} className="movie-item">
                        <img src={movie.poster} alt={movie.title} className="movie-poster" />
                        <div className="movie-info-row">
                            <span className="movie-title">{movie.title}</span>
                            <span className="movie-year">{movie.year}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserRecommendCard;