import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import Loading from './pages/LoadingTest';
import CinemaPage from './pages/CinemaPage';
import WishlistPage from './pages/WishlistPage';
import Header from './components/common/Header';

function App() {
  const location = useLocation();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 테스트용

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // 1. 헤더를 숨길 경로 (로그인 등)
  const hideHeaderRoutes = ['/login'];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  // ★ 2. 시네마 관련 페이지인지 확인 (토글 숨김 & 강제 라이트모드)
  const isCinemaPage = ['/my-cinema', '/user', '/opposite'].some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {shouldShowHeader && (
        <Header
          // 시네마 페이지면 강제로 라이트모드(false), 아니면 상태값 따름
          isDarkMode={isCinemaPage ? false : isDarkMode}
          toggleMode={toggleDarkMode}
          isLoggedIn={isLoggedIn}
          // ★ 시네마 페이지면 토글 스위치 숨김
          showToggle={!isCinemaPage}
        />
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* 메인 페이지 (다크모드 가능) */}
        <Route path="/main" element={<MainPage isDarkMode={isDarkMode} />} />

        {/* 시네마 페이지 (다크모드 제거 -> props 전달 안 함) */}
        <Route path="/my-cinema" element={<CinemaPage pageMode="MY" />} />
        <Route path="/user/:userId" element={<CinemaPage pageMode="USER" />} />
        <Route path="/opposite" element={<CinemaPage pageMode="OPPOSITE" />} />

        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </>
  );
}

export default App;