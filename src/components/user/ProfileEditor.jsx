import React, { useState } from 'react';
import { userApi } from '../../api/api';
import './UserEditor.css'; 

const ProfileEditor = ({ userId, initialData, onClose, onSave }) => {
    const [nickname, setNickname] = useState(initialData?.nickname || '');
    const [selectedImg, setSelectedImg] = useState(initialData?.profile_img || '');
    const [isChecked, setIsChecked] = useState(true); // 닉네임 변경 시 false로 바뀜

    const profilePresets = [
        { id: 1, url: "https://via.placeholder.com/80/FF5733/FFFFFF?text=1", label: "버럭" },
        { id: 2, url: "https://via.placeholder.com/80/28B463/FFFFFF?text=2", label: "소심" },
        { id: 3, url: "https://via.placeholder.com/80/FFC0CB/FFFFFF?text=3", label: "러블리" }, 
        { id: 4, url: "https://via.placeholder.com/80/3498DB/FFFFFF?text=4", label: "슬픔" },
        { id: 5, url: "https://via.placeholder.com/80/F1C40F/FFFFFF?text=5", label: "기쁨" },
    ];

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
        setIsChecked(e.target.value === initialData.nickname); 
    };

    // 중복 확인
    const handleCheckDuplicate = async () => {
        if (!nickname.trim()) return;
        try {
            const res = await userApi.checkNickname(nickname);
            if (res.data.is_available) {
                alert("사용 가능한 닉네임입니다.");
                setIsChecked(true);
            } else {
                alert("이미 사용 중인 닉네임입니다.");
                setIsChecked(false);
            }
        } catch (err) {
            console.error(err);
            alert("중복 확인 중 오류가 발생했습니다.");
        }
    };

    // 저장하기
    const handleSubmit = async () => {
        if (!isChecked) {
            alert("닉네임 중복 확인을 해주세요.");
            return;
        }

        try {
            // 1. 프로필 이미지 변경 
            if (selectedImg !== initialData.profile_img) {
                await userApi.updateProfileImg(userId, selectedImg);
            }
            // 2. 닉네임 변경 
            if (nickname !== initialData.nickname) {
                await userApi.updateNickname(userId, nickname);
            }

            alert("프로필이 수정되었습니다!");
            onSave();
            onClose(); 
        } catch (err) {
            console.error(err);
            alert("저장 실패");
        }
    };

    return (
        <div className="editor-overlay">
            <div className="editor-box profile-box">
                <button className="close-btn" onClick={onClose}>×</button>
                <h3>프로필 수정하기</h3>

                <div className="profile-presets">
                    {profilePresets.map((img) => (
                        <div
                            key={img.id}
                            className={`preset-item ${selectedImg === img.url ? 'selected' : ''}`}
                            onClick={() => setSelectedImg(img.url)}
                        >
                            <img src={img.url} alt={img.label} />
                            {selectedImg === img.url && <div className="check-mark">✔</div>}
                        </div>
                    ))}
                </div>

                <div className="nickname-input-group">
                    <input
                        type="text"
                        value={nickname}
                        onChange={handleNicknameChange}
                        placeholder="닉네임을 입력하세요"
                    />
                    <button
                        className={`check-btn ${isChecked ? 'checked' : ''}`}
                        onClick={handleCheckDuplicate}
                        disabled={nickname === initialData.nickname}
                    >
                        {isChecked && nickname === initialData.nickname ? "확인완료" : "중복확인"}
                    </button>
                </div>

                <button className="save-btn" onClick={handleSubmit}>저장하기</button>
            </div>
        </div>
    );
};

export default ProfileEditor;