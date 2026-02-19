import axios from 'axios';

// =====================================================
// 1. 로그인/회원가입용 Axios (로그인 서버로 감)
// =====================================================
const authApi = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL, // .env의 로그인 주소
    headers: { 'Content-Type': 'application/json' },
});

// =====================================================
// 2. 서비스용 Axios (메인 서버로 감) -> 작성자님이 주로 쓸 것!
// =====================================================
const serviceApi = axios.create({
    baseURL: import.meta.env.VITE_SERVICE_API_URL, // .env의 메인 주소
    headers: { 'Content-Type': 'application/json' },
});

// ★ 서비스용 API에만 '토큰 실어 보내기' 설정 (인터셉터)
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

// =====================================================
// 3. API 함수들 (누가 어느 서버로 갈지 정해주기)
// =====================================================

// [로그인 친구가 쓸 API] -> authApi 사용
export const authRequest = {
    login: (data) => authApi.post('/auth/login', data),
    signup: (data) => authApi.post('/auth/signup', data),
};

// [작성자님이 쓸 API] -> serviceApi 사용
export const contentApi = {
    getDetail: (userId, contentId) => serviceApi.get(`/feeds/${userId}/${contentId}/review`),
    createReview: (data) => serviceApi.post('/feeds/reviews', data),
    updateReview: (data) => serviceApi.put('/feeds/reviews', data),
    addWish: (userId, contentId) => serviceApi.post('/feeds/wish', { user_id: userId, content_id: contentId }),
    deleteWish: (userId, contentId) => serviceApi.delete('/feeds/wish', { data: { user_id: userId, content_id: contentId } }),
    searchContent: (keyword) => serviceApi.get(`/feeds/search-content/${keyword}`),
    searchUser: (keyword) => serviceApi.get(`/feeds/search-user/${keyword}`),
};

export const userApi = {
    checkNickname: (nickname) => serviceApi.get(`/users/check-nickname`, { params: { nickname } }),
    updateNickname: (userId, nickname) => serviceApi.post(`/users/nickname`, { user_id: userId, nickname }),
    updateProfileImg: (userId, imgUrl) => serviceApi.post(`/users/profile-img`, { user_id: userId, profile_img: imgUrl }),
    updateGenres: (userId, genreList) => serviceApi.put(`/feeds/${userId}/genre`, { genre_name: genreList }),
};

// 기본 export는 serviceApi로 (대부분 이걸 쓰니까)
export default serviceApi;