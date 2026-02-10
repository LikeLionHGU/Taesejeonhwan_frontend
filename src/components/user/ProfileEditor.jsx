import React from 'react';

/*
프로필 사진 선택하고 닉네임 설정하는 컴포넌트
처음 랜딩페이지에도 쓰이고, 내 영화관 페이지에서 프로필 수정할 때도 쓰임
파람 가져올 때 API 명세서 잘 봐야 해!
*/
const ProfileEditor = ({ nickname, setNickname, selectedImgId, setSelectedImgId }) => {

    // 일단 아무 이미지나 5개 넣어놓고, 나중에 API로 불러오도록 변경하면 됨!
    const profileImages = [/* img1, img2... */];

    return (
        <div className="profile-editor">
            
        </div>
    );
};

export default ProfileEditor;