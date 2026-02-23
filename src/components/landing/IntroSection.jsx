import React, { useEffect } from 'react';

import Login from '../../pages/Login'
import '../../styles/LandingPageStyle.css'
import ToggleSwitch from '../common/ToggleSwitch'
import UserGrid from '../main/UserGrid';


const IntroSection = () => {



return(
	

            <div className="intro-section">
                <h1 className="intro-Eng">switch for less time</h1>
                <p className="intro-Kor">흩어진 ott 작품 정보를 찾아보면서 수많은 선택의 고민을 줄여보세요</p>
                

        

                
                <Login />

            </div>
        );


};
export default IntroSection;

//토글 on/off 버튼 끌어오기

//3개의 유저 모달 불러오기

//아마 자동 연동일듯?