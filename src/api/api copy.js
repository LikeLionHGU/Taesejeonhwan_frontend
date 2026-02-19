import axios from 'axios';

// 1. Axios 인스턴스 생성
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // ★ 여기에 실제 백엔드 서버 주소를 넣어야 합니다! (예: http://localhost:8080)
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. 요청 인터셉터 (모든 요청에 토큰 실어 보내기)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 3. 응답 인터셉터 (로그인 만료 등 에러 처리)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log("로그인이 필요합니다.");
            // 필요 시 로그인 페이지로 이동: window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// -----------------------------------------------------------
// ★ 4. 콘텐츠 & 리뷰 관련 API (contentApi)
// -----------------------------------------------------------
export const contentApi = {
    // 상세 정보 가져오기
    getDetail: async (targetUserId, contentId) => {
        return await api.get(`/feeds/${targetUserId}/${contentId}/review`);
    },
    // 리뷰 작성
    createReview: async (data) => {
        return await api.post('/feeds/reviews', data);
    },
    // 리뷰 수정
    updateReview: async (data) => {
        return await api.put('/feeds/reviews', data);
    },
    // 찜하기
    addWish: async (userId, contentId) => {
        return await api.post('/feeds/wish', { user_id: userId, content_id: contentId });
    },
    // 찜하기 취소
    deleteWish: async (userId, contentId) => {
        return await api.delete('/feeds/wish', {
            data: { user_id: userId, content_id: contentId }
        });
    },
    // 콘텐츠 검색
    searchContent: async (keyword) => {
        return await api.get(`/feeds/search-content/${keyword}`);
    },
    // 유저 검색
    searchUser: async (keyword) => {
        return await api.get(`/feeds/search-user/${keyword}`);
    }
};

// -----------------------------------------------------------
// ★ 5. 유저 정보 & 설정 관련 API (userApi) -> 이 부분이 없어서 에러가 났던 것!
// -----------------------------------------------------------
export const userApi = {
    // 닉네임 중복 체크
    checkNickname: async (nickname) => {
        return await api.get(`/users/check-nickname`, {
            params: { nickname }
        });
    },

    // 닉네임 변경
    updateNickname: async (userId, nickname) => {
        return await api.post(`/users/nickname`, {
            user_id: userId,
            nickname: nickname
        });
    },

    // 프로필 이미지 변경
    updateProfileImg: async (userId, imgUrl) => {
        return await api.post(`/users/profile-img`, {
            user_id: userId,
            profile_img: imgUrl
        });
    },

    // 장르 키워드 수정
    updateGenres: async (userId, genreList) => {
        return await api.put(`/feeds/${userId}/genre`, {
            genre_name: genreList
        });
    }
};

export default api;