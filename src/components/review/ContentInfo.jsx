import React, { useState, useEffect } from 'react';
import { contentApi } from '../../api/api';
import AddReview from './AddReview';
import AllReviewsModal from './AllReviewsModal';
import './ContentInfo.css';
import '../../styles/Common.css';

const ContentInfo = ({ isOpen, onClose, contentId, pageMode, ownerId }) => {
    const [viewMode, setViewMode] = useState('INFO');
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 
    const [myId] = useState(localStorage.getItem('userId') || 1);

    useEffect(() => {
        if (isOpen && contentId) {
            fetchDetail();
        }
        return () => {
            setViewMode('INFO');
            setData(null);
        };
    }, [isOpen, contentId]);

    const fetchDetail = async () => {
        setIsLoading(true);
        try {
            const userId = pageMode === 'MY' ? myId : (ownerId || myId);

            //뱍엔드 오류인지 확인용
            console.log(`요청 URL: /feeds/${userId}/${contentId}/review`);
            console.log("userId:", userId, "contentId:", contentId);

            const res = await contentApi.getDetail(userId, contentId);

            console.log("모달 상세 데이터 응답:", res.data); 

            const detailData = res.data?.data || res.data?.result || res.data;
            setData(detailData);
        } catch (err) {
            console.error("상세 정보 로딩 실패", err);
            setData(null);
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    const handleToggleWish = async () => {
        if (!data) return;
        try {
            if (data.is_wished) {
                await contentApi.deleteWish(myId, contentId);
                setData(prev => ({ ...prev, is_wished: false }));
            } else {
                await contentApi.addWish(myId, contentId);
                setData(prev => ({ ...prev, is_wished: true }));
            }
        } catch (err) {
            console.error("찜하기 오류", err);
        }
    };

    if (!isOpen) return null;

    const renderInfoView = () => (
        <>
            <div className="modal-header-row">
                <h2 className="modal-title">
                    {data.title} <span className="modal-year">{data.year}</span>
                </h2>
                <button
                    className={`wish-btn ${data.is_wished ? 'active' : ''}`}
                    onClick={handleToggleWish}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={data.is_wished ? "#007AFF" : "none"} stroke={data.is_wished ? "#007AFF" : "#ccc"} strokeWidth="2">
                        <path d="M19 21L12 16L5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21Z" />
                    </svg>
                </button>
            </div>

            <div className="modal-tags">
                {data.genre_name && data.genre_name.map((tag, i) => (
                    <span key={i} className="mini-tag">#{tag}</span>
                ))}
            </div>
            <p className="modal-desc">{data.overview}</p>

            <button className="btn-secondary full-width" onClick={() => setViewMode('REVIEWS')}>
                전체 리뷰 보기 &gt;
            </button>

            <div className="divider" />

            {pageMode === 'MY' ? (
                data.comment ? (
                    <div className="review-display-area">
                        <div className="user-rating"><span className="star">★</span> {data.rating}</div>
                        <div className="user-comment-box my-comment">{data.comment}</div>
                        <div className="edit-btn-wrapper">
                            <button className="btn-text-only" onClick={() => setViewMode('WRITE')}>수정하기 &gt;</button>
                        </div>
                    </div>
                ) : (
                    <div className="create-review-area">
                        <button className="btn-primary full-width" onClick={() => setViewMode('WRITE')}>리뷰 작성하기</button>
                    </div>
                )
            ) : (
                <div className="review-display-area">
                    {data.comment ? (
                        <>
                            <div className="user-rating"><span className="star">★</span> {data.rating}</div>
                            <div className="user-comment-box">"{data.comment}"</div>
                        </>
                    ) : (
                        <p className="no-review-text">이 유저가 남긴 한줄평이 없습니다.</p>
                    )}
                </div>
            )}
        </>
    );

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content-box fade-in" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>×</button>

                {isLoading ? (
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h3>데이터를 불러오는 중입니다... ⏳</h3>
                    </div>
                ) : !data ? (
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h3>상세 정보를 불러올 수 없습니다. API 연결을 확인해주세요 😢</h3>
                    </div>
                ) : (
                    <>
                        <div className="modal-left">
                            <img src={data.poster || "https://via.placeholder.com/400x600"} alt={data.title} className="modal-poster" />
                        </div>

                        <div className="modal-right">
                            {viewMode === 'INFO' && renderInfoView()}

                            {viewMode === 'WRITE' && (
                                <AddReview
                                    contentId={contentId}
                                    movieTitle={data.title}
                                    initialData={data.comment ? { rating: data.rating, comment: data.comment } : null}
                                    onBack={() => setViewMode('INFO')}
                                    onSuccess={() => {
                                        fetchDetail();
                                        setViewMode('INFO');
                                    }}
                                />
                            )}

                            {viewMode === 'REVIEWS' && (
                                <AllReviewsModal
                                    contentId={contentId}
                                    onBack={() => setViewMode('INFO')}
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ContentInfo;