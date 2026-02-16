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
      console.log('토큰이 없습니다.setStep 실패');
    }
  },[onNext]);

const uesrLogin = (token) => {
localStorage.setItem('id_token', token);
if (token)
onNext();
else alert ("로그인 실패, 다시 로그인 해주세요.")
}


    return (
        <div className="intro-section">
            <h1 className= "intro-Eng">switch for less time</h1>
            <p className="intro-Kor">흩어진 ott 작품 정보를 찾아보면서 수많은 선택의 고민을 줄여보세요</p>
            <Login />

        </div>
    );
};
export default IntroSection;