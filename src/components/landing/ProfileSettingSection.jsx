import React, { useState } from 'react';
import './profile.css';

//더미데이터(프사

import profileImg1 from '../../assets/landing/profile1.svg';
import profileImg2 from '../../assets/landing/profile2.svg';
import profileImg3 from '../../assets/landing/profile3.svg';
import profileImg4 from '../../assets/landing/profile4.svg';
import profileImg5 from '../../assets/landing/profile5.svg';

const ProfileSettingSection = ({ onNext }) => {
    const images = [profileImg1, profileImg2, profileImg3, profileImg4, profileImg5];

    const [nickname, setNickname] = useState('');
    const [selectedImgId, setSelectedImgId] = useState(null);//이미지 선택
    const [checkStatus, setCheckStatus] = useState('none'); //중복 체크
    const maxLength = 8;

    const handleNicknameChange = (e) => {
        const nicknamerule = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
        setNickname(nicknamerule);//위에서 제한값 받아오기
        setCheckStatus('none');
    };

    const handleCheckDuplicate = () => {
        if (!nickname.trim()) {
            return alert("닉네임을 입력해 주세요.");
        }
        //-> 여기 api 통신 코드 넣기
        setCheckStatus('available');//중복확인완료
    };

    const handleSubmit = () => {// 다음 버튼 클릭
        if (selectedImgId === null) {//이미지 눌일 경우
            return alert("프로필 캐릭터를 선택해주세요.");
        }
        if (checkStatus !== 'available') {//닉네임확인 안했을 경우
            return alert("닉네임 중복 확인을 해주세요.");
        }
            if (nickname.length > maxLength) {
        return alert("닉네임은 8자 이하여야 합니다!");

       }
       

        const userProfileData = {//선택한 정보들 유저 프로픽 박스에 저장
            profileImageIndex: selectedImgId, // 1~5 중 하나
            profileImageUrl: images[selectedImgId - 1],
            nickname: nickname
        };
        
        localStorage.setItem('userProfile',JSON.stringify(userProfileData));
        console.log("저장 완료!", userProfileData);

        onNext?.();

    };

    return (
        <div className="profile-setup-container">
    <h1 className="title">
    반가워요! 👋<br/>
    먼저 프로필을 설정해볼까요? </h1>
      
      <div className="avatar-list">
      {images.map((img, index) => {
       const id = index + 1;
       const isSelected = selectedImgId === id;
                    
     return (
             <div 
              key={id} 
              className={`avatar-item ${isSelected ? 'selected' : ''}`}
            onClick={() => setSelectedImgId(id)}>
              <div className={`check-badge ${isSelected ? 'active' : ''}`}>
                 ✔
              </div>
              <img src={img} alt={`profile-${id}`} />
              </div>
                    );
                })}
            </div>

            <div className="input-section">
                <div className="input-wrapper">
                    <input 
                        type="text" 
                        placeholder="닉네임을 입력해 주세요" 
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                    <button className="check-btn" onClick={handleCheckDuplicate}>
                        중복확인
                    </button>
                </div>
                {checkStatus === 'available' && (
                    <p className="success-msg">사용 가능한 닉네임 입니다.</p>
                )}
            </div>

            <button className="next-btn" onClick={handleSubmit}>
                다음 &gt;
            </button>
        </div>
    );
};

export default ProfileSettingSection;