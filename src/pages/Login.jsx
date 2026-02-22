import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sendIdTokenToBackend from "../api/sendAccessTokenToBackend";
import LoginBtnimg from "../assets/LoginBtn.svg";

const Login = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    const tokenCheck = new URLSearchParams(hash.replace("#", "?")).get("id_token");

    if (tokenCheck) {
      setIsProcessing(true); 
      processLogin(tokenCheck);
    }
  }, [navigate]);

  const processLogin = async (token) => {
    window.history.replaceState(null, '', window.location.pathname);

    try {
      console.log("서버 로그인 시도 중...");
      const responseData = await sendIdTokenToBackend(token);

      if (responseData) {
        if (responseData.user_id) {
          localStorage.setItem("userId", responseData.user_id);
        }
        if (responseData.is_new_user === true) {
          console.log("신규 유저: 프로필 설정으로 이동");
          navigate("/", { state: { step: 1 } });
        } else {
          console.log("기존 유저: 메인으로 이동");
          alert(`환영합니다, ${responseData.nickname}님!`);
          //navigate("/main");
          navigate("/", { state: { step: 1 } }); //테스트용 수정 필요
        }
      }
    } catch (error) {
      console.error("서버 연결 실패 (일단 개발모드로 확인):", error);
      localStorage.setItem("accessToken", "dev_dummy_token_12345");
      localStorage.setItem("userId", "1");
      alert("서버 연결 실패함 일단 개발모드 ㄱㄱ");
      navigate("/main");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoogleLogin = () => {
    const nonce = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const apiRUrl = import.meta.env.VITE_APP_GOOGLE_AUTH_REDIRECT_URI;
    const apiCUrl = import.meta.env.VITE_APP_GOOGLE_AUTH_CLIENT_ID;

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${apiCUrl}&redirect_uri=${encodeURIComponent(apiRUrl)}&response_type=id_token&response_mode=fragment&scope=${encodeURIComponent("openid email profile")}&nonce=${nonce}&prompt=select_account`;
  };

  if (isProcessing) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
        로그인 처리 중--- 
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <img
        src={LoginBtnimg}
        alt="Google Login"
        onClick={handleGoogleLogin}
        style={{ cursor: 'pointer', width: '200px' }}
      />
    </div>
  );
};

export default Login;