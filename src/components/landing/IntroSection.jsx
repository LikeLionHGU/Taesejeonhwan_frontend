import React, { useState } from 'react';
import styled from 'styled-components';
import Login from '../../pages/Login';
import '../../styles/LandingPageStyle.css';

//더미데이터 불러오기
import Profile from '../../assets/profile.png';
//더미데이터 -일반 모드
import Movie1 from '../../assets/movie1.png';
import Movie2 from '../../assets/movie2.png';
import Movie3 from '../../assets/movie3.png';
import Movie4 from '../../assets/movie4.png';
import Movie5 from '../../assets/movie5.png';

//더미데이터- 다크 모드
import Movie6 from '../../assets/movie6.svg';
import Movie7 from '../../assets/movie7.svg';
import Movie8 from '../../assets/movie8.svg';
import Movie9 from '../../assets/movie9.svg';
import Movie10 from '../../assets/movie10.svg';

const IntroSection = () => {
    const [toggle, setToggle] = useState(false);

    const clickedToggle = () => {
        setToggle((prev) => !prev); };

    const lightUser = [{
        nickname: "@moovie7",
        profileimg: Profile,
        tags: ["#로맨스", "#가족", "#드라마"],
        poster: [Movie1, Movie2, Movie3, Movie4, Movie5],
        movies: ["나우유씨미", "원더", "그린북", "어바웃타임", "대도시의 사랑법"],
        year: "2013"
    }];

    const DarkUser = [{
        nickname: "@popcorn",
        profileimg: Profile,
        tags: ["#액션", "#SF", "#스릴러"],
        poster: [Movie6, Movie7, Movie8, Movie9, Movie10],
        movies: ["극한직업", "킬러의 보디가드", "올드보이", "더글로리", "신세계"],
        year: "2013"
    }];

    const currentUser = toggle ? DarkUser[0] : lightUser[0];

    return (
        <div className={`intro-section ${toggle ? 'dark-theme' : 'light-theme'}`} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="intro-Eng">switch for less time</h1>
            <p className="intro-Kor">흩어진 ott 작품 정보를 찾아보면서 수많은 선택의 고민을 줄여보세요</p>

           <Login />

            <ToggleBtn onClick={clickedToggle} toggle={toggle} style={{ margin: '40px 0' }}>
                <Circle toggle={toggle} />
            </ToggleBtn>

            <GridContainer>
                {[1, 2, 3].map((cardNumber) => (
                    <CardWrapper key={cardNumber} isDark={toggle}>
                        <CardHeader>
                            <ProfileInfo>
                                <ProfileImage src={currentUser.profileimg} alt="profile" />
                                <div>
                                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{currentUser.nickname}</div>
                                    <div style={{ color: '#4A6AFF', fontSize: '13px', marginTop: '4px' }}>{currentUser.tags.join(' ')}</div>
                                </div>
                            </ProfileInfo>
                            <FollowButton>+ 팔로우</FollowButton>
                        </CardHeader>

                        <MovieList>
                            {currentUser.poster.map((imgSrc, idx) => (
                                <MovieItem key={idx}>
                                    <MoviePoster src={imgSrc} alt="movie" />
                                    <MovieTitle>{currentUser.movies[idx]}</MovieTitle>
                                    <MovieYear>{currentUser.year}</MovieYear>
                                </MovieItem>
                            ))}
                        </MovieList>
                    </CardWrapper>
                ))}
            </GridContainer>

          
        </div>
    );
};

// ==========================================
// 🎨 스타일 변경 영역 (여기만 보시면 됩니다!)
// ==========================================

// 💡 1. 토글 버튼: 심플한 파란색 바
const ToggleBtn = styled.button`
    width: 60px;  
    height: 30px;
    background-color: ${(props) => (props.toggle ? '#4A6AFF' : '#dde0ea')}; 
    border-radius: 30px;
    position: relative;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s ease;
`;

const Circle = styled.div`
    width: 24px; 
    height: 24px;
    background-color: #ffffff;
    border-radius: 50%;
    position: absolute;
    top: 3px; 
    left: 3px;
    transition: transform 0.3s ease;
    ${(props) => props.toggle && `transform: translateX(30px);`}
`;

const GridContainer = styled.div`
    display: flex;
    gap: 30px; 
    justify-content: center;
    margin-bottom: 60px;
    width: 100%; 
    max-width: 12000px; /* 너무 퍼지지 않게 최대 너비 제한 (원하는 만큼 조절 가능) */
    padding: 0 20px;  /* 양옆 여백 추가 */
    box-sizing: border-box;
`;

// 💡 4. 카드 껍데기: 너비를 훨씬 넓게 설정
const CardWrapper = styled.div`
    background-color: ${(props) => (props.isDark ? '#1E1E2A' : '#FFFFFF')};
    color: ${(props) => (props.isDark ? '#FFFFFF' : '#222222')};
    border-radius: 20px;
    padding: 25px;
    flex: 1; 
    min-width: 600px; 
    max-width: 1500px;
    box-shadow: ${(props) => (props.isDark ?'0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.08)')};
    text-align: left;
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const ProfileInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const ProfileImage = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
`;

const FollowButton = styled.button`
    background-color: #4A6AFF;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
`;

const MovieList = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
`;

const MovieItem = styled.div`
    flex: 1; 
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const MoviePoster = styled.img`
    width: 100%;
    height: auto;
    aspect-ratio: 2 / 3;
    border-radius: 10px;
    object-fit: cover;
`;

const MovieTitle = styled.div`
    font-size: 12px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const MovieYear = styled.div`
    font-size: 11px;
    color: #999;
`;

export default IntroSection;