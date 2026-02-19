import.meta.env.VITE_APP_GOOGLE_AUTH_REDIRECT_URI
// import styled from "styled-components";
import LoginBtnimg from "../assets/LoginBtn.svg";


/*
google oauth에서 만든 client id와 redirecton url 그리고 어떤 토큰을 받을 것인지 url뒤에 명시해주어야 한다.
그리고 사용자의 어떤 정보를 받을지 scope또한 들어가야한다. 
*/

const Login = () => {
  const handleGoogleLogin = () => { 
  

//사용자 토큰 받아오기
  const nonce = Math.random().toString(36).substring(2) + Date.now().toString(36);

  const apiRUrl = import.meta.env.VITE_APP_GOOGLE_AUTH_REDIRECT_URI;
  const apiCUrl = import.meta.env.VITE_APP_GOOGLE_AUTH_CLIENT_ID;
//토큰명 id_token
 window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${apiCUrl}&redirect_uri=${encodeURIComponent(apiRUrl)}&response_type=id_token&response_mode=fragment&scope=${encodeURIComponent("openid email profile")}&nonce=${nonce}`;
  };
  //  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}&response_type=code&scope=email profile`;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {/* styled-components 대신 일반 img 태그 사용 */}
      <img
        src={LoginBtnimg}
        alt="Google Login"
        onClick={handleGoogleLogin}
        style={{ cursor: 'pointer', width: '200px' }} // 크기는 적당히 조절
      />
    </div>
  );
};

export default Login;

// //여기에 스타일 넣기 -> 현수님
// const Wrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const LoginBtn = styled.img`
//   cursor: pointer;
// `;
