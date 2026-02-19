import React from 'react';
import './MainBanner.css';

const MainBanner = ({ isDarkMode }) => {
    return (
        <div className={`banner-container ${isDarkMode ? 'dark' : 'light'}`}>
            <h1>
                {isDarkMode
                    ? "당신의 취향 바깥을 탐험해보세요"
                    : "나와 취향이 비슷한 사람을 추천받으세요"}
            </h1>
            <p>
                {isDarkMode
                    ? "당신과 정반대의 취향을 가진 유저를 통해 새로운 세계를 발견해보세요."
                    : "선택한 장르 태그를 기반으로 작품 취향이 비슷한 유저를 추천해드려요"}

            </p>
        </div>
    );
};

export default MainBanner;