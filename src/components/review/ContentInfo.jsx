import React, { useState } from 'react';
import AllReviewsModal from './AllReviewsModal';

// 영화 정보 및 리뷰 모달 컴포넌트으
const ContentInfo = ({ movie, onClose }) => {
    const [isShowAllReviews, setIsShowAllReviews] = useState(false);

    return (
        <div className="modal-overlay z-index-1000">
            <div className="modal-content">
                <h2>{movie?.title}</h2>
                <p>{movie?.description}</p>

                <button onClick={() => setIsShowAllReviews(true)}>
                    전체 리뷰보기 &gt;
                </button>

                <button onClick={onClose}>닫기</button>

                {isShowAllReviews && (
                    <AllReviewsModal
                        isOpen={isShowAllReviews}
                        onClose={() => setIsShowAllReviews(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default ContentInfo;