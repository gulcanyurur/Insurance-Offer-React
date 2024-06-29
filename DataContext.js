import React, { createContext, useState, useContext } from 'react';

export const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [travelData, setTravelData] = useState({
        travelDetailID: 0,
        departureDate: null,
        returnDate: null,
        isSchengenExcludingUSJapan: false,
        isSchengenIncludingUSJapan: false
    });

    const [personalInfo, setPersonalInfo] = useState({
        customerID: 0, 
        tcIdentity: '',
        birthDate: '',
        email: '',
        phoneNumber: '',
        insuredTCIdentity: '',
        insuredBirthDate: '',
        insuredEmail: '',
        insuredPhoneNumber: '',
        insurerTCIdentity: '',
        insurerBirthDate: '',
        insurerEmail: '',
        insurerPhoneNumber: '',
        forSelf: true,
        insurerID: null,
        insuredID: null
    });

    const [coverageData, setCoverageData] = useState({});
    const [policyCoverages, setPolicyCoverages] = useState([]);

    const [coverageDescriptions] = useState({
        hastaneTedavi: {
            name: 'Asistanssız Seyahat Sağlık Sigortası',
            description: `Acil durumlarda ayakta veya hastane yatarak tedavi harcamaları,
            Sigortalının tıbbi nedenlerle nakli,
            Cenazenin yurda nakli,
            Sigortalının vefat ettiği yerde defin için yapılan harcamalar,
            Sigortalının Covid-19 pozitif olması durumundaki tedavi harcamaları ve nakli.`,
            price: 1000,
            priceUSD: 35 
        },
        tibbiNakil: {
            name: 'Asistanslı Seyahat Sağlık Sigortası',
            description: `Tıbbi Bilgi ve Danışmanlık,
            Gerekli İlaçların Sevki,
            Refakatçi Nakli,
            Refakatçi Yakının Konaklama Giderleri,
            Hastaneden Taburcu Oluşu Takiben Otelde Konaklama,
            Lehdarın Vefatı Halinde Aile Fertlerinin Dönüşü,
            Ülkeye Öngörülmeyen Dönüş,
            Lehdarın Yakınının Sağlık Durumunun İzlenmesi,
            Acil Mesajların İletilmesi,
            İdari Asistans,
            Bagaj Kaybı veya Hasarı,
            Kayıp Bagajın Bulunup Ulaştırılması,
            Hukuki Yardım,
            Kefalet İçin Avans Ödeme,
            Yurtdışında Nakit Avans,
            Covid-19 Nedeniyle Konaklamanın Uzaması.`,
            price: 600,
            priceUSD: 20 
        },
        cenazeNakli: {
            name: 'Kayak Teminatı',
            description: `Kayak sebebi ile ortaya çıkan sakatlık ve Yaralanmalar,
            Kayak ve Snowboard Sırasında Oluşan Kurtarma Giderleri,
            Sigortalının Nakli giderleri,
            Asistans hizmeti satın alındığı durumda Kayak Ve Snowboard Ekipman Giderleri için Bagaj kaybı hizmeti.`,
            price: 1200,
            priceUSD: 40
        }
    });

    const [paymentData, setPaymentData] = useState({
        paymentID: 0,
        cardHolderName: '',
        maskedCardNumber: '',
        expirationDate: '',
        maskedCVV: '',
        paymentMethod: '',
        amountTL: 0,
        amountUSD: 0,
        currency: 'TL'
    });

    const [policyData, setPolicyData] = useState({
        policyID: 0, 
        policyNumber: '',
        policyDate: '',
        startDate: '',
        endDate: '',
        totalPremium: 0,
        currency: ''
    });

    const [ids, setIds] = useState({ insurerId: null, insuredId: null });

    const updateTravelData = (data) => setTravelData({ ...travelData, ...data });

    const updatePersonalInfo = (data) => setPersonalInfo({ ...personalInfo, ...data });

    const updateCoverageData = (data) => setCoverageData({ ...coverageData, ...data });

    const updatePolicyCoverages = (data) => setPolicyCoverages(data);

    const updatePolicyData = (data) => setPolicyData({ ...policyData, ...data });

    const updatePaymentData = (data) => setPaymentData({ ...paymentData, ...data });

    const updateIds = (newIds) => setIds({ ...ids, ...newIds });

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        if (coverageData.hastaneTedavi) totalPrice += coverageDescriptions.hastaneTedavi.price;
        if (coverageData.tibbiNakil) totalPrice += coverageDescriptions.tibbiNakil.price;
        if (coverageData.cenazeNakli) totalPrice += coverageDescriptions.cenazeNakli.price;
        return totalPrice.toFixed(2);
    };

    const calculateTotalUSDPrice = () => {
        let totalPriceUSD = 0;
        if (coverageData.hastaneTedavi) totalPriceUSD += coverageDescriptions.hastaneTedavi.priceUSD;
        if (coverageData.tibbiNakil) totalPriceUSD += coverageDescriptions.tibbiNakil.priceUSD;
        if (coverageData.cenazeNakli) totalPriceUSD += coverageDescriptions.cenazeNakli.priceUSD;
        return totalPriceUSD.toFixed(2);
    };

    return (
        <DataContext.Provider value={{ 
            travelData, updateTravelData, 
            personalInfo, updatePersonalInfo, 
            coverageData, updateCoverageData,
            policyCoverages, updatePolicyCoverages,
            coverageDescriptions,
            paymentData, updatePaymentData,
            policyData, updatePolicyData,
            calculateTotalPrice,
            calculateTotalUSDPrice,
            ids, updateIds,
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;






























