import React from "react";
import GoogleLoginBtn from "../GoogleLoginBtn.svg";


/*
시작 로그인 페이지 
이곳에는 google oauth url과 연결된 구글 로그인 버튼이 있어야한다. 

google oauth에서 만든 client id와 redirecton url 그리고 어떤 토큰을 받을 것인지 url뒤에 명시해주어야 한다.
그리고 사용자의 어떤 정보를 받을지 scope또한 들어가야한다. 

*/

const GoogleLogin = () => {
  const handleGoogleLogin = () => { 
  
  console.log("redirect_uri:", process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI);
//이부분이변경사항-> 토큰 받아오는 주소 바꿈
  const nonce = Math.random().toString(36).substring(2) + Date.now().toString(36);

  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${encodeURIComponent(process0.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI)}&response_type=id_token&response_mode=fragment&scope=${encodeURIComponent("openid email profile")}&nonce=${nonce}`;
  };
  //  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}&response_type=code&scope=email profile`;

  return (
    <Wrapper>
      <LoginBtn src={GoogleLoginBtn} alt="" onClick={handleGoogleLogin} />
    </Wrapper>
  );
};

export default GoogleLogin;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBtn = styled.img`
  cursor: pointer;
`;
