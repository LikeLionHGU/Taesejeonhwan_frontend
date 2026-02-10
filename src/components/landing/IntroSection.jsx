import React from 'react';

const IntroSection = ({ onNext }) => {
    return (
        <div className="intro-section">
            <h1>첫 시작점!</h1>
            <button onClick={onNext}>시작하기</button>
        </div>
    );
};
export default IntroSection;