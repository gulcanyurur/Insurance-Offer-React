import React, { useState, useEffect } from 'react';
import { useDataContext } from './DataContext';
import './teklif-al.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMoneyBillAlt, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

function Offer({ onNext }) {
    const { coverageData, coverageDescriptions, travelData, personalInfo, updatePaymentData } = useDataContext();
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [showAllButtonVisible, setShowAllButtonVisible] = useState(true);
    const [expandedCoverage, setExpandedCoverage] = useState(false);

    useEffect(() => {
        checkSelectedOffer();
    }, [coverageData, travelData]);

    const checkSelectedOffer = () => {
        const selectedCoverages = coverageData.policyCoverages.map(coverage => coverage.coverageID);
        if (selectedCoverages.length > 0) {
            const productName = 'Eureko Sigorta Asistansız Seyahat Sağlık Sigortası';
            const insuranceDate = travelData.departureDate && travelData.returnDate
                ? new Date(travelData.departureDate).toLocaleDateString('tr-TR') + " - " + new Date(travelData.returnDate).toLocaleDateString('tr-TR')
                : '';
            const insurancePrice = `₺${coverageData.totalPrice} - $${coverageData.totalUSDPrice}`;
            const coverages = selectedCoverages.map((key) => coverageDescriptions[key]?.description || '');

            setSelectedOffer({
                productName,
                insuranceDate,
                insurancePrice,
                coverages
            });
        } else {
            setSelectedOffer(null);
        }
    };

    const handleShowAll = () => {
        setExpandedCoverage(true);
        setShowAllButtonVisible(false);
    };

    const handleCloseAll = () => {
        setExpandedCoverage(false);
        setShowAllButtonVisible(true);
    };

    const handleCreateOffer = () => {
        updatePaymentData({
            totalPrice: coverageData.totalPrice,
            totalUSDPrice: coverageData.totalUSDPrice
        });
        onNext();
    };

    return (
        <div className="offer-page">
            <div className="additional-coverage-container">
                <h3 className="coverage-title">Teminat Kapsamı</h3>
                <ul>
                    {coverageData.policyCoverages.map((coverage, index) => (
                        <li key={coverage.coverageID} className="coverage-option">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={coverageData[coverage.coverageID]}
                                    readOnly
                                />
                                {coverageDescriptions[coverage.coverageID]?.name}
                            </label>
                            <p>₺{coverageDescriptions[coverage.coverageID]?.price} - ${coverageDescriptions[coverage.coverageID]?.priceUSD}</p>
                        </li>
                    ))}
                </ul>

                <div className="container-total">
                    <div className="prim-tutar-container">
                        <h3>PRİM TUTARI</h3>
                        <div className='price-and-button'>
                            <div className='price'>
                                <p>₺{coverageData.totalPrice} - ${coverageData.totalUSDPrice}</p>
                            </div>
                            <button className="SatınAl-button" onClick={handleCreateOffer}>Satın Al</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="offer-cont">
                <div className="offer-container">
                    <h3>Teklifiniz</h3>
                    {selectedOffer && (
                        <div>
                            <div className='genel'>
                                <div className='ürün'>
                                    <span><FontAwesomeIcon className="icon-blue" icon={faShieldAlt} /></span> Ürün Adı
                                </div>
                                <div className='name'>{selectedOffer.productName}</div>
                                <div className='sigorta'>
                                    <span><FontAwesomeIcon className="icon-blue" icon={faCalendarAlt} /></span> Sigorta Tarihi
                                </div>
                                <div className='tarih'> {selectedOffer.insuranceDate}</div>
                                <div className='teminantBedeli'>
                                    <span><FontAwesomeIcon className="icon-blue" icon={faMoneyBillAlt} /></span> Teminat Bedeli
                                </div>
                                <div className='fiyat'>{selectedOffer.insurancePrice}</div>
                            </div>
                            <h4>Teminatlar</h4>
                            {selectedOffer.coverages.map((coverageDesc, index) => (
                                <div key={index}>
                                    <ul>
                                        {index === 0 ? (
                                            expandedCoverage ? (
                                                coverageDesc.split(',').map((item, index) => (
                                                    <li key={index}>{item.trim()}</li>
                                                ))
                                            ) : (
                                                coverageDesc.split(',').slice(0, 3).map((item, index) => (
                                                    <li key={index}>{item.trim()}</li>
                                                ))
                                            )
                                        ) : (
                                            expandedCoverage && (
                                                coverageDesc.split(',').map((item, index) => (
                                                    <li key={index}>{item.trim()}</li>
                                                ))
                                            )
                                        )}
                                    </ul>
                                </div>
                            ))}
                            {showAllButtonVisible && (
                                <button onClick={handleShowAll} className="button-no-border">Tümünü Gör</button>
                            )}
                            {!showAllButtonVisible && (
                                <button onClick={handleCloseAll} className="button-no-border">Kapat</button>
                            )}
                        </div>
                    )}
                </div>
                <div className="customer-info">
                    <h3>Müşteri Bilgileri</h3>
                    <p><strong>Adı:</strong> {personalInfo.tcIdentity}</p>
                    <p><strong>Email:</strong> {personalInfo.email}</p>
                    <p><strong>Telefon:</strong> {personalInfo.phoneNumber}</p>
                </div>
            </div>
        </div>
    );
}

export default Offer;
















