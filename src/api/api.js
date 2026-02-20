import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://43.201.11.179:8443';

const authApi = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

const serviceApi = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

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


export const authRequest = {
    googleLogin: (idToken) => authApi.post('/auth/google', { idToken }),

    login: (data) => authApi.post('/auth/login', data),
    signup: (data) => authApi.post('/auth/signup', data),
};

export const contentApi = {
    getMainFeeds: (mode, userId, page = 1) =>
        serviceApi.get(`/feeds/${mode}/${userId}?page=${page}`),

    getDetail: (userId, contentId) => serviceApi.get(`/feeds/${userId}/${contentId}/review`),
    createReview: (data) => serviceApi.post('/feeds/reviews', data),
    updateReview: (data) => serviceApi.put('/feeds/reviews', data),

    addWish: (userId, contentId) => serviceApi.post('/feeds/wish', { user_id: userId, content_id: contentId }),
    deleteWish: (userId, contentId) => serviceApi.delete('/feeds/wish', { data: { user_id: userId, content_id: contentId } }),

    searchContent: (keyword) => serviceApi.get(`/feeds/search-content/${keyword}`),
    searchUser: (keyword) => serviceApi.get(`/feeds/search-user/${keyword}`),

    getUserContents: (targetUserId) => serviceApi.get(`/feeds/${targetUserId}/contents`),
    getAllGenres: () => serviceApi.get('/feeds/genre'),
};

export const userApi = {
    getMyProfile: () => serviceApi.get('/users/profile'),
    getUserProfile: (targetUserId) => serviceApi.get(`/users/profile/${targetUserId}`),
    checkNickname: (nickname) =>
        serviceApi.get(`/users/check-nickname?nickname=${nickname}`),
    getAvailableProfileImages: () => serviceApi.get('/users/profile-img'),

    updateNickname: (userId, nickname) =>
        serviceApi.post(`/users/nickname`, {
            user_id: Number(userId),
            nickname: nickname
        }),

    updateProfileImg: (userId, imgUrl) =>
        serviceApi.post(`/users/profile-img`, {
            user_id: Number(userId),
            profile_img: imgUrl
        }),

    updateGenre: (userId, genresArray) =>
        serviceApi.put(`/feeds/${userId}/genre`, {
            genre_name: genresArray
        }),
};

export default serviceApi;