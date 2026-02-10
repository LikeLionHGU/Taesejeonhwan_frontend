import React, { useState } from 'react';
import ContentGrid from '../components/content/ContentGrid';
import UserInfo from '../components/cinema/UserInfo';
import MyContent from '../components/cinema/modals/MyContent';
import UserContent from '../components/cinema/modals/UserContent';

/*
나의 영화관 + 남의 영과관 페이지
UserInfo 컴포넌트랑 ContentGrid 컴포넌트 사용
유저아이디에 따라 남인지 아닌지 구분
내 영과환이면 MyContent 모달, 남의 영화관이면 UserContent 모달 띄우기
*/
const CinemaPage = ({ pageMode = 'MY' }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 누구 영화관인지 파악 후 데이터 가져올 예쩡
    const userData = { };
    const movieList = [ ];

    // 영화 클릭 핸들러
    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

};

export default CinemaPage;