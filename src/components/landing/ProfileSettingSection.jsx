import React, { useState } from 'react';
import ProfileEditor from '../user/ProfileEditor';

const ProfileSettingSection = ({ onNext }) => {
    const [nickname, setNickname] = useState('');
    const [imgId, setImgId] = useState(0);

    return (
        <div className="section-container">
            <h2>프로필 설정하고 닉네임 설정하는 구간</h2>
            <ProfileEditor
                nickname={nickname} setNickname={setNickname}
                selectedImgId={imgId} setSelectedImgId={setImgId}
            />
            <button onClick={onNext}>다음</button>
        </div>
    );
};
export default ProfileSettingSection;