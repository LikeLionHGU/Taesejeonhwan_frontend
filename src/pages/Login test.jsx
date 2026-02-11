//jwt 토큰 없음


import React from 'react';

const Login = () => {
    const handleGoogleLogin = () => {
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI)}&response_type=id_token&response_mode=fragment&scope=${encodeURIComponent("openid email profile")}&nonce=${nonce}`;

    
        // 구글 OAuth URL로 이동
    };

    return (
        <div className="login-page">
            <h1>Otte</h1>
            <p>로그인 페이지임...</p>
            <button onClick={handleGoogleLogin}>Google로 시작ㄱㄱ</button>
        </div>
    );
};
export default Login;

