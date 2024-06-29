import React from 'react';
import { useDataContext } from './DataContext';
import './PolicyPage.css';
import Barcode from 'react-barcode';
import moment from 'moment';

const PolicyPage = () => {
    const { personalInfo, policyData, paymentData, coverageData, coverageDescriptions } = useDataContext();

    const maskTC = (tc) => tc ? tc.substring(0, 2) + '*'.repeat(tc.length - 2) : 'Bilgi Yok';
    const maskedTC = maskTC(personalInfo.tcIdentity);
    const maskedPhoneNumber = personalInfo.phoneNumber ? personalInfo.phoneNumber : 'Bilgi Yok';

    const formattedPolicyDate = moment(policyData.policyDate).format('DD/MM/YYYY');
    const formattedStartDate = moment(policyData.startDate).format('DD/MM/YYYY');
    const formattedEndDate = moment(policyData.endDate).format('DD/MM/YYYY');

    const currencySymbol = paymentData.paymentMethod === 'USD' ? 'USD' : 'TL';
    const paidAmount = currencySymbol === 'USD' ? paymentData.amountUSD : paymentData.amountTL;

    return (
        <div className="policy-page">
            <div className="policy-header">
                <div className="header-text">
                    <h2>Seyahat Sağlık Sigortası Poliçesi</h2>
                </div>
                <div className="barcode-container">
                    <Barcode value={policyData.policyNumber} format="CODE128" width={2} height={50} />
                    <p><strong>Poliçe Numarası:</strong> {policyData.policyNumber}</p>
                </div>
            </div>
            <div className="policy-section">
                <h2>Poliçe Bilgileri</h2>
                <p><strong>Sigorta Şirketi:</strong> Eureko Sigorta</p>
                <p><strong>Telefon:</strong> +90 212 000 00 00</p>
            </div>
            <div className="policy-section">
                <h2>Sigortalı Bilgileri</h2>
                <p><strong>Ad Soyad:</strong> {paymentData.cardHolderName || 'Bilgi Yok'}</p>
                <p><strong>Cep Telefonu:</strong> {maskedPhoneNumber}</p>
                <p><strong>TC Kimlik Numarası:</strong> {maskedTC}</p>
                <p><strong>Sigorta Başlangıç Tarihi:</strong> {formattedStartDate}</p>
                <p><strong>Sigorta Bitiş Tarihi:</strong> {formattedEndDate}</p>
            </div>
            <div className="policy-section">
                <h2>Teminatlar</h2>
                {coverageData.hastaneTedavi && (
                    <div>
                        <p><strong>{coverageDescriptions.hastaneTedavi.name}</strong></p>
                        <p>{coverageDescriptions.hastaneTedavi.description}</p>
                        <p>Fiyat ({currencySymbol}): {currencySymbol === 'USD' ? coverageDescriptions.hastaneTedavi.priceUSD : coverageDescriptions.hastaneTedavi.price}</p>
                    </div>
                )}
                {coverageData.tibbiNakil && (
                    <div>
                        <p><strong>{coverageDescriptions.tibbiNakil.name}</strong></p>
                        <p>{coverageDescriptions.tibbiNakil.description}</p>
                        <p>Fiyat ({currencySymbol}): {currencySymbol === 'USD' ? coverageDescriptions.tibbiNakil.priceUSD : coverageDescriptions.tibbiNakil.price}</p>
                    </div>
                )}
                {coverageData.cenazeNakli && (
                    <div>
                        <p><strong>{coverageDescriptions.cenazeNakli.name}</strong></p>
                        <p>{coverageDescriptions.cenazeNakli.description}</p>
                        <p>Fiyat ({currencySymbol}): {currencySymbol === 'USD' ? coverageDescriptions.cenazeNakli.priceUSD : coverageDescriptions.cenazeNakli.price}</p>
                    </div>
                )}
            </div>
            <div className="policy-section">
                <h2>Ödeme Bilgileri</h2>
                <p><strong>Ödenen Tutar ({currencySymbol}):</strong> {paidAmount}</p>
            </div>
        </div>
    );
};

export default PolicyPage;




































