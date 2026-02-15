import React, { useEffect } from 'react';
import Login from '../../pages/Login'

const IntroSection = ({ onNext }) => {

 useEffect(() => {

  const hash = window.location.hash;
  const tokenCheck = new URLSearchParams(hash.replace("#","?")).get("id_token");
   
  const savedToken = localStorage.getItem('id_token');
      if (tokenCheck){
      uesrLogin(tokenCheck);
    }else if(savedToken){
      onNext();
    }else{
      console.log('토큰이 없습니다.');
    }
  }, [onNext]);

const uesrLogin = (token) => {
localStorage.setItem('id_token', token);
if (token)
onNext();
else alert ("로그인 실패, 다시 로그인 해주세요.")
}


    return (
        <div className="intro-section">
            <h1>첫 시작점!</h1>
            <Login/>

        </div>
    );
};
export default IntroSection;