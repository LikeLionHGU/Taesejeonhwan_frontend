import React, { useEffect } from "react";
import sendAccessTokenToBackend from "../api/sendAccessTokenToBackend";
// import styled from "styled-components";
import { useNavigate } from "react-router-dom";



/*
사용자의 토큰을 받는 페이지
이 페이지에서는 url 에 포함된 response token을 백엔드에 보내고 성공하면 메인화면으로 보내고 실패하면 에러처리를 할것이다. 

URLSearchParams를 통해 url에 있는 토큰을 추출하고 그 토큰을 axios를 사용해 backend에 보낸다. 

이후 성공하면 navigate를 통해 메인화면으로 보낸다. 
실패하면 에러처리 (알아서 ~)

*/

const Loading = () => {
  const navigate = useNavigate();
  document.body.style.removeProperty("overflow");


  //1) 아이디토큰 잘라서 백엔드로 전달 & state 값 받아서 경로 다르게 지정
  useEffect(() => {
    const fetchData = async () => {
      try {
        const parsedHash = new URLSearchParams(window.location.hash.substring(1));
        const idToken = parsedHash.get("id_token");
        console.log("id 토큰: " + idToken);

        // 서버 응답 데이터 받아오기 ! & 경로 지정
        const responseData = await sendAccessTokenToBackend(idToken);
        console.log(responseData);
        console.log(responseData.state);

        navigate("/Home"); 


      } catch (error) {
        console.error("로그인 과정에서 에러가 발생했습니다.", error);

        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        navigate("/");
      }
    };

    fetchData();
  }, [navigate]);


  return (
    <div>
      <LoginLoading>로그인 중입니다...</LoginLoading>
    </div>
  );
};

export default Loading;

// const LoginLoading = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 30px;
//   margin-top: 100px;
// `;