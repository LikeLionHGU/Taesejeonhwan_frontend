import React from 'react';

const MainBanner = ({ isDarkMode }) => {
    return (
        // 유사 선호도면 라이트, 반대 선호도면 다크
        <div className={`main-banner ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="diamond-shape">
                <h1>Otte</h1>
                <p>배너 수정되면 그거로 적용</p>
            </div>
        </div>
    );
};
export default MainBanner;