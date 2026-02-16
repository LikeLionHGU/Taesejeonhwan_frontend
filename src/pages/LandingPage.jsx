import React, { useState } from 'react';
import IntroSection from '../components/landing/IntroSection';
import ProfileSettingSection from '../components/landing/ProfileSettingSection';
import SelectPreferenceSection from '../components/landing/SelectPreferenceSection';
import ShowResultSection from '../components/landing/ShowResultSection';


/*
랜딩페이지인데 음... 랜딩 페이지에서 단계별로 보여주는 걸 불러오는 장소라고 생각하면 돼
0: 시작하기 있는 첫 페이지 -> 1: 프로필 사진 및 닉네임 설정 -> 2: 콘텐츠 10개 선택 -> 3: 분석 결과 도출
지금은 이렇게 해놨는데, 0번 다음으로 로그인으로 갔다가 오는 느낌으로 가면 될 듯..?

0->로그인 -> 1로 가도록 수정했습니다!


*/
const LandingPage = () => {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep(prev => prev + 1);


    return (
        <div className="landing-container">
            {step === 0 && <IntroSection/>}
            {step === 1 && <ProfileSettingSection onNext={nextStep} />}
            {step === 2 && <SelectPreferenceSection onNext={nextStep} />}
            {step === 3 && <ShowResultSection />}
        </div>
    );
};

export default LandingPage;