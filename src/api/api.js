// API 연결 과정에서 오류를 해결하기 위해 AI를 사용했습니다..!

import axios from 'axios';

// 1. 환경 변수 가져오기 (없을 경우를 대비해 OR 연산자 사용)
// .env에 있는 VITE_SERVICE_API_URL 우선적으로 사용합니다.
const BASE_URL = import.meta.env.VITE_SERVICE_API_URL || 'https://43.201.11.179:8443/taesae';

// =====================================================
// 2. 로그인/회원가입용 Axios (토큰 없이 요청)
// =====================================================
const authApi = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// =====================================================
// 3. 서비스용 Axios (로그인 후 사용, 토큰 자동 첨부)
// =====================================================
const serviceApi = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// 인터셉터: 요청 보낼 때 토큰이 있으면 자동으로 헤더에 끼워줌
serviceApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 에러(인증 실패) 시 로그아웃 처리 등 (선택 사항)
serviceApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("로그인 세션이 만료되었습니다.");
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userId');
            localStorage.clear(); window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// =====================================================
// 4. API 함수 모음
// =====================================================

// [인증 관련 API] 
export const authRequest = {
    // 구글 로그인 
    googleLogin: (idToken) => authApi.post('/auth/google', { idToken }),

    // 일반 로그인/회원가입 (백엔드 스펙에 따라 필요하면 유지)
    login: (data) => authApi.post('/auth/login', data),
    signup: (data) => authApi.post('/auth/signup', data),
};

// [콘텐츠 관련 API]
export const contentApi = {
    // 메인 페이지 피드 목록 가져오기 
    getMainFeeds: (mode, userId, page = 1) =>
        serviceApi.get(`/feeds/${mode}/${userId}?page=${page}`),

    getDetail: (userId, contentId) => serviceApi.get(`/feeds/${userId}/${contentId}/review`),
    createReview: (data) => serviceApi.post('/feeds/reviews', data),
    updateReview: (data) => serviceApi.put('/feeds/reviews', data),

    addWish: (userId, contentId) => serviceApi.post('/feeds/wish', { user_id: userId, content_id: contentId }),
    deleteWish: (userId, contentId) => serviceApi.delete('/feeds/wish', { data: { user_id: userId, content_id: contentId } }),

    searchContent: (keyword) => serviceApi.get(`/feeds/search-content/${keyword}`),
    searchUser: (keyword) => serviceApi.get(`/feeds/search-user/${keyword}`),

    // [추가] 특정 유저의 영화관(피드) 목록 가져오기 (🚨 주소 확인 필요)
    getUserContents: (targetUserId) => serviceApi.get(`/feeds/${targetUserId}/contents`),
    getAllGenres: () => serviceApi.get('/feeds/genres'),
};

// [유저 정보 관련 API]
export const userApi = {
    getMyProfile: () => serviceApi.get('/users/profile'),
    getUserProfile: (targetUserId) => serviceApi.get(`/users/profile/${targetUserId}`),
    checkNickname: (nickname) =>
        serviceApi.get(`/users/check-nickname?nickname=${nickname}`),
    // 🚨 [복구] 아까 실수로 빼먹었던 부분! (에러 1번 원인 해결)
    getAvailableProfileImages: () => serviceApi.get('/users/profile-img'),

    // user_id를 숫자(Number)로 변환
    updateNickname: (userId, nickname) =>
        serviceApi.post(`/users/nickname`, {
            user_id: Number(userId),
            nickname: nickname
        }),

    // user_id를 숫자(Number)로 변환
    updateProfileImg: (userId, imgUrl) =>
        serviceApi.post(`/users/profile-img`, {
            user_id: Number(userId),
            profile_img: imgUrl
        }),

    // 취향 키워드
    updateGenre: (userId, oldGenre, newGenre) =>
        serviceApi.put(`/feeds/${userId}/genre`, {
            genre_name: oldGenre,
            changed_genre: newGenre
        }),
};

export default serviceApi;