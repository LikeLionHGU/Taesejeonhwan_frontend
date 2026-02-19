import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import Loading from './pages/LoadingTest';
import CinemaPage from './pages/CinemaPage';
import WishlistPage from './pages/WishlistPage';
import Header from './components/common/Header';
import ProfileSettingSection from './components/landing/ProfileSettingSection';
import SelectPreferenceSection from './components/landing/SelectPreferenceSection';
import ShowResultSection from './components/landing/ShowResultSection';

function App() {
  const location = useLocation();

  // 1. 다크모드 상태 안 되게 초기화
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 2. 로그인 상태 (초기값: 로컬 스토리지에 토큰이 있으면 true)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('accessToken');
  });

  // ★ 페이지가 이동할 때마다 토큰 확인 (로그인 직후 상태 반영을 위해)
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, [location.pathname]); // 경로가 바뀔 때마다 실행

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // 3. 헤더 숨기는 주소들 목록 (로그인, 로딩 페이지 등 필요시 추가)
  const hideHeaderRoutes = ['/login', '/loading', '/'];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  // 4. 토글 안 보여주고 무조건 밝은 테마로 가는 주소들 목록 (시네마 페이지 같은 거!)
  const isCinemaPage = ['/my-cinema', '/user', '/opposite'].some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {shouldShowHeader && (
        <Header
          isDarkMode={isCinemaPage ? false : isDarkMode}
          toggleMode={toggleDarkMode}
          isLoggedIn={isLoggedIn}
          showToggle={!isCinemaPage}
        />
      )}

      <Routes>
        {/* 랜딩 페이지 (사이트 진입 시 뜰 화면) - 한나 */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfileSettingSection />} />
        <Route path="/contents" element={<SelectPreferenceSection/>}/>
        <Route path="/users/onboarding" element={<ShowResultSection/>}/>

        {/* 로그인 페이지 - 한나 */}
        <Route path="/login" element={<Login />} />

        {/* 로딩 페이지 (구글 로그인 후 돌아오는 곳) - 한나 > 유원 */}
        <Route path="/loading" element={<Loading />} />

        {/* 메인 페이지 (다크모드 = 반대 취향) - 유원 */}
        <Route path="/main" element={<MainPage isDarkMode={isDarkMode} />} />

        {/* 시네마 페이지 - 유원 */}
        <Route path="/my-cinema" element={<CinemaPage pageMode="MY" />} />
        <Route path="/user/:userId" element={<CinemaPage pageMode="USER" />} />
        <Route path="/opposite" element={<CinemaPage pageMode="OPPOSITE" />} />

        {/* 찜한 목록 - 한나 */}
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </>
  );
}

export default App;