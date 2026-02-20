import React, { useState, useEffect } from 'react';
import { userApi } from '../../api/api';
import './UserEditor.css';

const ProfileEditor = ({ profile, onClose }) => {
    const [nickname, setNickname] = useState(profile?.nickname || '');
    const [selectedImg, setSelectedImg] = useState(profile?.profile_img || '');
    const [availableImages, setAvailableImages] = useState([]);
    const [isNicknameChecked, setIsNicknameChecked] = useState(true);
    const [checkMessage, setCheckMessage] = useState('');
    const myUserId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await userApi.getAvailableProfileImages();
                setAvailableImages(res.data.images || res.data || []);
            } catch (error) {
                console.error("프로필 이미지 목록 로딩 실패... 직접 채워넣어버리자...", error);
                setAvailableImages([
                    'https://taesae.s3.ap-northeast-2.amazonaws.com/1.png',
                    'https://taesae.s3.ap-northeast-2.amazonaws.com/2.png',
                    'https://taesae.s3.ap-northeast-2.amazonaws.com/3.png',
                    'https://taesae.s3.ap-northeast-2.amazonaws.com/4.png',
                    'https://taesae.s3.ap-northeast-2.amazonaws.com/5.png'
                ]);
            }
        };
        fetchImages();
    }, []);

    const handleNicknameCheck = async () => {
        if (!nickname.trim()) {
            setCheckMessage("닉네임을 입력해주세요.");
            return;
        }
        if (nickname === profile.nickname) {
            setCheckMessage("현재 사용 중인 닉네임입니다.");
            setIsNicknameChecked(true);
            return;
        }

        try {
            const res = await userApi.checkNickname(nickname);
            if (res.data.available === true) {
                setCheckMessage("사용 가능한 닉네임입니다!");
                setIsNicknameChecked(true);
            } else {
                setCheckMessage("이미 사용 중인 닉네임입니다.");
                setIsNicknameChecked(false);
            }
        } catch (err) {
            console.error("중복 확인 에러", err);
            setCheckMessage("중복 확인에 실패했습니다.");
            setIsNicknameChecked(false);
        }
    };

    const handleSave = async () => {
        if (!isNicknameChecked) {
            alert("닉네임 중복 확인을 해주셔야 합니다!");
            return;
        }

        if (!myUserId || isNaN(Number(myUserId))) {
            alert("유저 아이디를 찾을 수 없습니다. 다시 로그인 해주세요.");
            return;
        }

        try {

            if (nickname !== profile.nickname) {
                await userApi.updateNickname(myUserId, nickname);
            }

            if (selectedImg !== profile.profile_img) {
                await userApi.updateProfileImg(myUserId, selectedImg);
            }

            alert("프로필이 성공적으로 수정되었습니다!");
            window.location.reload();
            onClose();
        } catch (error) {
            console.error("프로필 수정 실패 전체 에러 객체:", error);

            if (error.response && error.response.data) {
                console.error("백 에러 뭐게:", error.response.data);
                alert(`저장 실패: ${JSON.stringify(error.response.data)}`);
            } else {
                console.error("수정에 실패... 콘솔창 확인해ㅅㅓ 얼른 고치기를...", error.response.data);
            }
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content profile-editor" onClick={e => e.stopPropagation()}>
                <h3>프로필 수정</h3>

                <div className="image-selection" style={{ margin: '20px 0' }}>
                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>프로필 이미지 선택</p>
                    <div className="image-grid" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {availableImages.map((img, idx) => {
                            const imgUrl = img.profile_img; 
                            return (
                                <img
                                    key={idx}
                                    src={imgUrl}
                                    onClick={() => setSelectedImg(imgUrl)}
                                    style={{
                                        width: '60px', height: '60px', borderRadius: '50%', cursor: 'pointer',
                                        border: selectedImg === imgUrl ? '3px solid #007AFF' : '2px solid transparent'
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>

                <div className="nickname-section" style={{ margin: '20px 0' }}>
                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>닉네임</p>
                    <div className="input-group" style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => {
                                setNickname(e.target.value);
                                setIsNicknameChecked(false); 
                                setCheckMessage('');
                            }}
                            style={{ flex: 1, padding: '10px', borderRadius: '5px' }}
                        />
                        <button onClick={handleNicknameCheck} style={{ padding: '10px', cursor: 'pointer' }}>중복확인</button>
                    </div>
                    {checkMessage && (
                        <p style={{ color: isNicknameChecked ? '#28a745' : '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                            {checkMessage}
                        </p>
                    )}
                </div>

                <div className="modal-actions" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <button className="btn-secondary" onClick={onClose} style={{ padding: '10px 20px', cursor: 'pointer' }}>취소</button>
                    <button className="btn-primary" onClick={handleSave} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#e50914', color: 'white', border: 'none' }}>저장완료</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileEditor;