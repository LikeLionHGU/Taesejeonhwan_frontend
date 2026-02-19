import React, { useEffect } from "react";
import sendAccessTokenToBackend from "../api/sendAccessTokenToBackend";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.removeProperty("overflow");

    const fetchData = async () => {
      try {
        const parsedHash = new URLSearchParams(window.location.hash.substring(1));
        const idToken = parsedHash.get("id_token");

        if (!idToken) return;

        console.log("서버 로그인 시도 중...");

        // 1. 진짜 서버 연결 시도
        const responseData = await sendAccessTokenToBackend(idToken);

        // 2. 성공하면 정상 처리
        if (responseData) {
          const token = responseData.accessToken || responseData.token;
          if (token) localStorage.setItem("accessToken", token);
          if (responseData.userId) localStorage.setItem("userId", responseData.userId);
          navigate("/main");
        }

      } catch (error) {
        console.error("서버 연결 실패 (개발 모드 우회 중...):", error);

        // 로그인 실패 시 더미 토큰 저장으로 개잘 모드
        localStorage.setItem("accessToken", "dev_dummy_token_12345");
        localStorage.setItem("userId", "1"); // 1번 유저라고 가정됨

        alert("서버 연결에 실패했지만, 개발 모드로 진입합니다! 🚀");
        navigate("/home");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px', fontSize: '24px' }}>
      로그인 중입니다... ⏳
    </div>
  );
};

export default Loading;