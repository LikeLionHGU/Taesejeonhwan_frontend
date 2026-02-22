import React, { useState, useEffect } from 'react';
import { userApi } from '../../api/api'; 
import './profile.css';

const ProfileSettingSection = ({ onNext }) => {
    const [images, setImages] = useState([]);
    const [nickname, setNickname] = useState('');
    const [selectedImgUrl, setSelectedImgUrl] = useState(null); 
    const [checkStatus, setCheckStatus] = useState('none');
    const [formatError, setFormatError] = useState(false);
    const maxLength = 8;

    useEffect(() => {
        const fetchProfileImages = async () => {
            try {
                const response = await userApi.getAvailableProfileImages();
                if (response.data && Array.isArray(response.data)) {
                    setImages(response.data.map(item => item.profile_img));
                }
            } catch (error) {
                console.error("프로필 이미지 목록을 불러오는데 실패했습니다.", error);
            }
        };

        fetchProfileImages();
    }, []);

    const handleNicknameChange = (e) => {
        const rawValue = e.target.value;

        if (/[^a-zA-Z0-9]/.test(rawValue)) {
            setFormatError(true); // 에러 켜기
        } else {
            setFormatError(false); //끄기
        }
        let filteredValue = rawValue.replace(/[^a-zA-Z0-9]/g, '');
        if (filteredValue.length > maxLength) {
            filteredValue = filteredValue.slice(0, maxLength);
        }
        setNickname(filteredValue);
        setCheckStatus('none');
    };

    const handleCheckDuplicate = async () => {
        if (!nickname.trim()) {
            return alert("닉네임을 입력해 주세요.");
        }

        setFormatError(false);

        try {
            const response = await userApi.checkNickname(nickname);
            if (response.data.available === true) {
                setCheckStatus('available');
            } else {
                setCheckStatus('unavailable');
            }
        } catch (error) {
            console.error("닉네임 중복 확인 실패:", error);
            if (error.response?.status === 409 || error.response?.data?.available === false) {
                setCheckStatus('unavailable');
            } else {
                alert("중복 확인 중 서버에 문제가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    const handleSubmit = async () => {
        if (!selectedImgUrl) {
            return alert("프로필 캐릭터를 선택해주세요.");
        }
        if (checkStatus !== 'available') {
            return alert("닉네임 중복 확인을 완료해주세요.");
        }
        const rawUserId = localStorage.getItem('userId');
        const userId = Number(rawUserId);
        if (!userId) {
            return alert("사용자 정보가 없습니다. 다시 로그인 해주세요.");
        }

        try {
            console.log("🚀 서버로 전송 시도:", { user_id: userId, profile_img: selectedImgUrl, nickname: nickname });
            await userApi.updateProfileImg(userId, selectedImgUrl);
            await userApi.updateNickname(userId, nickname);

            const userProfileData = {
                profileImageUrl: selectedImgUrl,
                nickname: nickname
            };
            localStorage.setItem('userProfile', JSON.stringify(userProfileData));
            console.log("프로필 설정 서버 연동 완료!", userProfileData);

            if (onNext) onNext();

        } catch (error) {
            console.error("프로필 설정 등록 실패:", error);
            const serverMsg = error.response?.data?.message || "서버 내부 오류(500)";
            alert(`프로필 설정 등록 중 문제가 발생했습니다. (${serverMsg})`);
        }
    };

    return (
        <div className="profile-setup-container">
            <h1 className="title">
                반가워요! 👋<br />
                먼저 프로필을 설정해볼까요?
            </h1>

            {/* 프로필 이미지 리스트 렌더링 */}
            <div className="avatar-list">
                {images.length > 0 ? (
                    images.map((imgUrl, index) => {
                        const isSelected = selectedImgUrl === imgUrl;
                        return (
                            <div
                                key={index}
                                className={`avatar-item ${isSelected ? 'selected' : ''}`}
                                onClick={() => setSelectedImgUrl(imgUrl)}
                            >
                                <div className={`check-badge ${isSelected ? 'active' : ''}`}>
                                    ✔
                                </div>
                                <img src={imgUrl} alt={`profile-${index}`} />
                            </div>
                        );
                    })
                ) : (
                    <p style={{ fontSize: '14px', color: '#888' }}>프로필 이미지를 불러오는 중입니다...</p>
                )}
            </div>

            <div className="input-section">
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="닉네임을 입력해 주세요 (8자 이내)"
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                    <button
                        className="check-btn"
                        onClick={handleCheckDuplicate}
                        disabled={checkStatus === 'available' || !nickname}
                        style={{ cursor: checkStatus === 'available' ? 'not-allowed' : 'pointer' }}
                    >
                        {checkStatus === 'available' ? '확인완료' : '중복확인'}
                    </button>
                </div>
                {checkStatus === 'available' && (
                    <p className="success-msg" style={{ color: 'green', fontSize: '0.9rem', marginTop: '5px' }}>
                        사용 가능한 닉네임 입니다.
                    </p>
                )}
                {checkStatus === 'unavailable' && (
                    <p className="error-msg" style={{ color: 'red', fontSize: '0.9rem', marginTop: '5px' }}>
                        이미 사용 중인 닉네임입니다.
                    </p>
                )}
                {formatError && (
                    <p className="error-msg" style={{ color: 'red', fontSize: '0.9rem', marginTop: '5px' }}>
                        영문과 숫자만 입력 가능합니다.
                    </p>
                )}
            </div>

            <button className="next-btn" onClick={handleSubmit}>
                다음 &gt;
            </button>
        </div>
    );
};

export default ProfileSettingSection;