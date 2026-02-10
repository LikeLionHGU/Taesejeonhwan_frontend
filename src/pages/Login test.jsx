import React from 'react';

const Login = () => {
    const handleGoogleLogin = () => {
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