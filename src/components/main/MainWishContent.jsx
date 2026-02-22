import React from 'react';
import './MainWishContent.css';
import { WishApi } from '../../api/api'
import ContentInfo from '../review/ContentInfo';
import WishlistPage from '../../pages/WishlistPage';
import ContentGrid from '../content/ContentGrid';


//에이피아이랑 네비게이트 추가하고/ 불러오고/ 갱신하고/ 버튼에 이벤트 연결
//각자 객체 주소 지정하기

//이펙트로 메인 로딩 시 현재 목록 로딩
//스테이스로 저장,넘기기

// 임시로 해둠
import dummyPoster from '../../assets/movie1.png';

const MainWishContent = () => {
//기존 토글값+뉴 토글값
    const [On,Off] = useState(); // 위시리스트, 콘텐츠그리드, 콘텐츠인포에서 토글 on 상태값 받아오기



try {



}

// getWish: (userId) => serviceApi.get(`/feeds/${userId}/wish`),



    // API 연결하면 바꿀 거임...
    const wishMovies = [
        {
            id: 1,
            title: "대도시의 사랑법",
            year: "2024",
            poster: dummyPoster,
            tags: ["로맨스", "로앙스", "로망스"], 
            desc: "눈치 보는 법이 없는 자유로운 영혼의 '재희'와 세상과 거리두는 법에 익숙한 '흥수'가 동거하며 펼치는 그들만의 특별한 우정을 그린다."
        },
        {
            id: 2,
            title: "어바웃타임",
            year: "2013",
            poster: dummyPoster,
            tags: ["로맨스", "로걸스", "로베이비스"],
            desc: "완벽한 타이밍을 만들 때까지, 첫 만남을 다시 시작할 수 있다면? 서툰 고백을 운명적인 사랑으로 바꾸기 위한 한 남자의 특별하고도 치열한 시간 여행."
        },
        {
            id: 3,
            title: "그린북",
            year: "2019",
            poster: dummyPoster,
            tags: ["드라마", "코미디", "음악"], 
            desc: "1962년 미국, 입담과 주먹만 믿고 살아가던 토니 발레롱가(비고 모텐슨)는 교양과 우아함 그 자체인 천재 피아니스트 돈 셜리(마허샬라 알리) 박사의 운전기사 면접을 보게 된다."
        }
    ];

    return (
        <div className="main-wish-container">
            <div className="wish-header">
                <div className="wish-title-area">
                    <span className="wish-title">찜한 작품</span>
                    <span className="wish-count">({setData.length})</span> {/* API에서 받아온 찜한 작품 수로 대체해야 함 */}
                </div>
                <div className="wish-view-all">
                    <span>전체 보기</span>
                    <span className="arrow-icon"></span>
                </div>
            </div>

            <div className="wish-list">
                {wishMovies.map((movie) => (
                    <div key={movie.id} className="wish-item">
                        <img src={movie.poster} alt={movie.title} className="wish-poster" />

                        <div className="wish-info">
                            <div className="wish-title-row">
                                <span className="font-label wish-item-title">{movie.title}</span>
                                <span className="wish-item-year">{movie.year}</span>
                            </div>
                            <div className="wish-tags">
                                {movie.tags.map((tag, idx) => (
                                    <span key={idx} className="wish-tag">#{tag}</span>
                                ))}
                            </div>

                            <p className="font-user-name wish-desc">{movie.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainWishContent;