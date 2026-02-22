import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import IntroSection from '../components/landing/IntroSection';
import ProfileSettingSection from '../components/landing/ProfileSettingSection';
import SelectPreferenceSection from '../components/landing/SelectPreferenceSection';
import ShowResultSection from '../components/landing/ShowResultSection';

const LandingPage = () => {
    const location = useLocation(); 
    
    const [step, setStep] = useState(location.state?.step || 0);

    useEffect(() => {
        if (location.state?.step !== undefined) {
            setStep(location.state.step);
        }
    }, [location.state]);

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