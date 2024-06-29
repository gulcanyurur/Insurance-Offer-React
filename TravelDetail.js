import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDataContext } from './DataContext';
import './teklif-al.css';

const TravelDetail = ({ onNext, onBack }) => {
    const { travelData, updateTravelData } = useDataContext();
    const [localTravelData, setLocalTravelData] = useState(travelData);
    const [errorMessage, setErrorMessage] = useState('');
    const [checkboxErrorMessage, setCheckboxErrorMessage] = useState('');

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        const updatedData = {
            ...localTravelData,
            departureDate: start ? new Date(start) : localTravelData.departureDate,
            returnDate: end ? new Date(end) : localTravelData.returnDate
        };
        setLocalTravelData(updatedData);
        updateTravelData(updatedData);
    };

    const handleCheckboxChange = (field) => {
        const updatedData = { ...localTravelData, [field]: !localTravelData[field] };
        if (field === 'isSchengenExcludingUSJapan') {
            updatedData.isSchengenIncludingUSJapan = false;
        } else if (field === 'isSchengenIncludingUSJapan') {
            updatedData.isSchengenExcludingUSJapan = false;
        }
        setLocalTravelData(updatedData);
        updateTravelData(updatedData);
    };

    const handleNext = () => {
        if (!localTravelData.departureDate || !localTravelData.returnDate) {
            setErrorMessage('Lütfen gidiş ve dönüş tarihlerini seçiniz!');
            setCheckboxErrorMessage('');
        } else if (!localTravelData.isSchengenExcludingUSJapan && !localTravelData.isSchengenIncludingUSJapan) {
            setErrorMessage('');
            setCheckboxErrorMessage('Lütfen en az bir destinasyon seçiniz!');
        } else {
            setErrorMessage('');
            setCheckboxErrorMessage('');
            onNext();
        }
    };

    const handleBack = () => {
        onBack();
    };

    return (
        <div className="container-seyahat">
            <div className="form-seyahat">
                <h1>Lütfen seyahatle ilgili bilgileri girin</h1>
                <div className="checkbox-container">
                    <div className="custom-checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={localTravelData.isSchengenExcludingUSJapan}
                                onChange={() => handleCheckboxChange('isSchengenExcludingUSJapan')}
                            />
                            Schengen ve Tüm Dünya (ABD, Japonya Hariç)
                        </label>
                    </div>
                    <div className="custom-checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={localTravelData.isSchengenIncludingUSJapan}
                                onChange={() => handleCheckboxChange('isSchengenIncludingUSJapan')}
                            />
                            Schengen ve Tüm Dünya (ABD, Japonya Dahil)
                        </label>
                    </div>
                </div>
                {checkboxErrorMessage && <p className="error-message">{checkboxErrorMessage}</p>}
                <div className="selected-dates">
                    <div className="selected-name">Gidiş Tarihi</div>
                    <div className="selected-date">{localTravelData.departureDate ? localTravelData.departureDate.toLocaleDateString('tr-TR') : 'Tarih Seçilmedi'}</div>
                    <div className="selected-name">Dönüş Tarihi</div>
                    <div className="selected-date">{localTravelData.returnDate ? localTravelData.returnDate.toLocaleDateString('tr-TR') : 'Tarih Seçilmedi'}</div>
                </div>
                <div className="calendar-container">
                    <div className="calendar">
                        <DatePicker
                            className="custom-calendar"
                            selected={localTravelData.departureDate}
                            onChange={handleDateChange}
                            startDate={localTravelData.departureDate}
                            endDate={localTravelData.returnDate}
                            selectsRange
                            inline
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Tarih Seçin"
                            minDate={new Date()}
                        />
                        <p className="date-note">Lütfen gidiş ve dönüş tarihlerini seçiniz!</p>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <div className="button-container">
                            {onBack && <button onClick={handleBack} className="geri-button">Geri</button>}
                            <button onClick={handleNext} className="devam-button">Devam</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelDetail;




























