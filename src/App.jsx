import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import Loading from './pages/LoadingTest';
//import CinemaPage from './pages/CinemaPage';
//import WishlistPage from './pages/WishlistPage';
//import Header from './components/common/Header';

function App() {
  const location = useLocation();

  // 지정 페이지에서 헤더 안 보이게 하려면 여기 아래에 추가하면 됩니둥
  const hideHeaderRoutes = ['/login'];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {/*{shouldShowHeader && <Header />}*/}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/Loading" element={<Loading />} />
        {/*<Route path="/my-cinema" element={<CinemaPage pageMode="MY" />} />
        <Route path="/user/:userId" element={<CinemaPage pageMode="USER" />} />
        <Route path="/opposite" element={<CinemaPage pageMode="OPPOSITE" />} />
       <Route path="/wishlist" element={<WishlistPage />} /> */} 
      </Routes>
      
    </>
  );
}

export default App;