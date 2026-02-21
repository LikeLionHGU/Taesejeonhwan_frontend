import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userApi, contentApi } from '../api/api';
import UserInfo from '../components/cinema/UserInfo';
import ContentGrid from '../components/content/ContentGrid'; 
import ProfileEditor from '../components/user/ProfileEditor';
import KeywordEditor from '../components/user/KeywordEditor';
import AddReview from '../components/review/AddReview';
import ContentInfo from '../components/review/ContentInfo';

import '../styles/pages/CinemaPage.css';

const CinemaPage = ({ pageMode }) => {
    const { userId: urlUserId } = useParams();
    const myUserId = localStorage.getItem('userId');
    const isMyCinema = pageMode === 'MY' || String(urlUserId) === String(myUserId);
    const targetUserId = isMyCinema ? myUserId : urlUserId;
    const isDarkMode = false;
    
    const [profile, setProfile] = useState(null);
    const [contents, setContents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeModal, setActiveModal] = useState(null);
    const [selectedContentId, setSelectedContentId] = useState(null);

    useEffect(() => {
        const fetchCinemaData = async () => {
            if (!targetUserId) {
                console.error("유저 없는디유...");
                return;
            }
            setIsLoading(true);
            try {
                const profileRes = await userApi.getUserProfile(targetUserId);
                setProfile(profileRes.data);

                const contentRes = await contentApi.getUserContents(targetUserId);
                setContents(contentRes.data.feeds || contentRes.data);
            } catch (error) {
                console.error("영화관 데이터를 불러오는데 실패했습니다.", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCinemaData();
    }, [targetUserId]);

    const closeModal = () => {
        setActiveModal(null);
        setSelectedContentId(null);
    }

    const handleContentClick = (contentId) => {
        setSelectedContentId(contentId);
        setActiveModal('contentDetail'); 
    };

    if (isLoading) return <div>영화관 입장 중... 팝콘팡팡🍿</div>;
    return (
        <div className={`cinema-page ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="cinema-page-title">
                {isMyCinema ? '나의 영화관' : `@${profile?.nickname}님의 영화관`}
            </div>
            {profile && (
                <UserInfo
                    profile={profile}
                    isMyPage={isMyCinema}
                    onOpenProfileEdit={() => setActiveModal('profile')}
                    onOpenKeywordEdit={() => setActiveModal('keyword')}
                />
            )}

            {isMyCinema && (
                <div className="cinema-actions">
                    <button onClick={() => setActiveModal('review')}>+ 리뷰 작성하기</button>
                </div>
            )}

            <ContentGrid contents={contents} onContentClick={handleContentClick} />

            {/* 모달 창 */}
            {activeModal === 'profile' && <ProfileEditor profile={profile} onClose={closeModal} />}
            {activeModal === 'keyword' && (
                <KeywordEditor
                    currentGenres={profile.table ? profile.table.map(item => item.keyword) : []}
                    onClose={closeModal}
                />
            )}
            {activeModal === 'review' && <AddReview onClose={closeModal} />}
            {activeModal === 'contentDetail' && selectedContentId && (
                <ContentInfo
                    contentId={selectedContentId}
                    targetUserId={targetUserId}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default CinemaPage;