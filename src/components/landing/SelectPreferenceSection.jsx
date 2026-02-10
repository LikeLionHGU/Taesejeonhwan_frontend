import React, { useState } from 'react';

const SelectPreferenceSection = ({ onNext }) => {
    const [selectedKeywords, setSelectedKeywords] = useState([]);

    return (
        <div>
            <h2>영화 선택하는 페이지..? 같은 거</h2>
            <button onClick={onNext}>완료</button>
        </div>
    );
};
export default SelectPreferenceSection;