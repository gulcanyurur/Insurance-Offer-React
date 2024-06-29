import React, { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import TravelDetail from './TravelDetail';
import Coverage from './Coverage';
import Offer from './Offer';
import PaymentForm from './PaymentForm';
import PolicyPage from './PolicyPage'; 
import './teklif-al.css';

function TeklifAl() {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedDates, setSelectedDates] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalUSDPrice, setTotalUSDPrice] = useState(0);

    const steps = [
        { label: 'Kişisel Bilgiler', component: PersonalInfo },
        { label: 'Seyahat Bilgileri', component: TravelInfo },
        { label: 'Teminatlar', component: CoverageInfo },
        { label: 'Teklif', component: OfferInfo },
        { label: 'Satın Al', component: PaymentFormInfo },
        { label: 'Poliçe', component: PolicyPageInfo }
    ];

    const handleNext = (price, usdPrice) => {
        if (activeStep === 3 && price !== undefined && usdPrice !== undefined) {
            setTotalPrice(price);
            setTotalUSDPrice(usdPrice);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const StepComponent = steps[activeStep].component;

    return (
        <div>
            {activeStep < steps.length - 1 && (
                <div className="step-container">
                    {steps.map((step, index) => (
                        <div key={index} className={`step-item ${activeStep === index ? 'active' : ''}`}>
                            <div className="step-number">{index + 1}</div>
                            <div className="step-label">{step.label}</div>
                        </div>
                    ))}
                </div>
            )}
            <StepComponent
                onNext={handleNext}
                onBack={handleBack}
                selectedDates={selectedDates}
                onDatesSelect={(dates) => setSelectedDates(dates)}
                totalPrice={totalPrice}
                totalUSDPrice={totalUSDPrice}
            />
        </div>
    );
}

function PersonalInfo({ onNext }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('PersonalInfoForm submitted');
        onNext();
    };

    return (
        <div>
            <PersonalInfoForm onSubmit={handleSubmit} onNext={onNext} />
        </div>
    );
}

function TravelInfo({ onNext, onBack, selectedDates, onDatesSelect }) {
    return (
        <div>
            <TravelDetail onNext={onNext} onBack={onBack} onDatesSelect={onDatesSelect} />
        </div>
    );
}

function CoverageInfo({ onNext, onBack }) {
    return (
        <div>
            <Coverage onNext={onNext} onBack={onBack} />
            <div className="button-container">
                <button onClick={onBack} className="geri-button">Geri</button>
                <button onClick={() => onNext()} className="devam-button">Teklif Al</button>
            </div>
        </div>
    );
}

function OfferInfo({ selectedDates, onNext, onBack }) {
    return (
        <div>
            <Offer selectedDates={selectedDates} onNext={onNext} />
            <div className="button-container">
                {onBack && <button onClick={onBack} className="geri-button">Geri</button>}
            </div>
        </div>
    );
}

function PaymentFormInfo({ onNext, onBack, totalPrice, totalUSDPrice }) {
    return (
        <div>
            <PaymentForm onNext={onNext} onBack={onBack} totalPrice={totalPrice} totalUSDPrice={totalUSDPrice} />
        </div>
    );
}

function PolicyPageInfo() {
    return (
        <div>
            <PolicyPage />
        </div>
    );
}

export default TeklifAl;























