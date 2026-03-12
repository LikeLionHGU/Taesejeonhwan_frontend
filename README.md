#  🦁 LIKELION HANDONG 

## 서비스 소개 — OTTE
  <br>**OTTE란?**</br>
  OTTE는 유저의 시청 기록을 기반으로 작품을 추천하고, 다양한 취향을 탐색할 수 있도록 돕는 
  소셜 플랫폼입니다.
  OTTE는 시청 기록 기반 추천과 유저 간 취향 공유를 결합한 콘텐츠 탐색 플랫폼입니다

# 주요 기능

- 🤖 **유저 알고리즘 기반 작품 추천** - 내 시청 목록에 기반한 작품 추천
- 🎞️ **취향 탐색** - 100개에 달하는 영화 목록을 통한 다양한 취향 탐색
- 😘 **팔로우 기능** - 유저끼리 팔로우를 통한 다양한 취향 탐색 기능 제공
- 🎨 **프론트엔드** - 리액트, Vite로 구축된 반응형 UI
- 📦 **배포 준비 완료** - Vercel(프론트) + Render(백엔드)

## 🛠 기술 스택

| 분야 | 기술 |
|------|------|
| **런타임** | Node.js |
| **프론트엔드** | Vite + react |
| **데이터베이스 & 인증** | Supabase |
| **API 서비스** | TMDB API |
| **호스팅** | Vercel (프론트) |


# 개발 및 배포 

## 사전 요구사항
Node.js 20.19

## 설치 방법

**저장소 클론**
git clone https://github.com/LikeLionHGU/Taesejeonhwan_frontend.git

**의존성 설치**
npm install

**env**
VITE_APP_GOOGLE_AUTH_CLIENT_ID=
VITE_APP_GOOGLE_AUTH_REDIRECT_URI=http://localhost:5173/loading
VITE_APP_HOST_URL=
VITE_SERVICE_API_URL=


## 실행
cd Taesejeonhwan_frontend && npm run dev
(로컬 주소)http://localhost:5173

## 저장소 구조

Taesejeonhwan_frontend/
├─ public/
├─ src/
│  ├─ api/
│  ├─ assets/
│  ├─ components/
│  ├─ pages/
│  ├─ styles/
│  ├─ App.jsx
│  └─ main.jsx
├─ .env
├─ .env.example
├─ .gitignore
├─ README.md
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ vercel.json
└─ vite.config.js

