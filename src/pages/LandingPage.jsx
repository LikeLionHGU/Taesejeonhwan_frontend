import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import IntroSection from '../components/landing/IntroSection';
import ProfileSettingSection from '../components/landing/ProfileSettingSection';
import SelectPreferenceSection from '../components/landing/SelectPreferenceSection';
import ShowResultSection from '../components/landing/ShowResultSection';

const LandingPage = () => {
    const location = useLocation(); 
    
    // 💡 Loading에서 state: { step: 1 } 로 보냈으면 1단계부터 시작!
    const [step, setStep] = useState(location.state?.step || 0);

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