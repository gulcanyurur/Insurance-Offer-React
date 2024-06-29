import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './teklif-al.css';
import { useDataContext } from './DataContext';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ onBack, onNext }) => {
  const { 
    updatePaymentData, coverageData, 
    updatePolicyData, travelData, updateTravelData, personalInfo, paymentData, totalPrice, totalUSDPrice 
  } = useDataContext();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      cardHolderName: paymentData.cardHolderName || '', 
      cardNumber: '',
      expirationDate: '',
      cvv: '',
      paymentMethod: 'TL',
      totalPrice: paymentData.totalPrice || totalPrice,
      totalUSDPrice: paymentData.totalUSDPrice || totalUSDPrice
    },
    validationSchema: Yup.object({
      cardHolderName: Yup.string()
        .max(100, 'Kart sahibinin adı soyadı en fazla 100 karakter olabilir')
        .required('Kart sahibinin adı soyadı zorunludur'),
      cardNumber: Yup.string()
        .matches(/^\d{16}$/, 'Kart numarası 16 haneli olmalıdır')
        .required('Kart numarası zorunludur'),
      expirationDate: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Son kullanma tarihi MM/YY formatında olmalıdır')
        .required('Son kullanma tarihi zorunludur'),
      cvv: Yup.string()
        .matches(/^\d{3,4}$/, 'CVV 3 veya 4 haneli olmalıdır')
        .required('CVV zorunludur'),
      paymentMethod: Yup.string()
        .oneOf(['TL', 'USD'], 'Geçersiz ödeme yöntemi')
        .required('Ödeme yöntemi zorunludur')
    }),
    onSubmit: async (values) => {
      const maskedCardNumber = values.cardNumber.replace(/\d(?=\d{4})/g, '*');
      const maskedCVV = values.cvv.replace(/\d/g, '*');

      const paymentInfo = {
        cardHolderName: values.cardHolderName,
        maskedCardNumber: maskedCardNumber,
        expirationDate: values.expirationDate,
        maskedCVV: maskedCVV,
        paymentMethod: values.paymentMethod,
        amountTL: values.paymentMethod === 'TL' ? values.totalPrice : 0,
        amountUSD: values.paymentMethod === 'USD' ? values.totalUSDPrice : 0,
        currency: values.paymentMethod
      };

      try {
        const { travelDetailID, ...travelDetailsWithoutID } = travelData;
        const travelDetailsResponse = await axios.post('http://localhost:26131/api/TravelDetails', travelDetailsWithoutID, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const savedTravelData = travelDetailsResponse.data;
        updateTravelData(savedTravelData);

        const paymentResponse = await axios.post('http://localhost:26131/api/Payments', paymentInfo, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const paymentID = paymentResponse.data.paymentID;

        const policyNumber = Math.floor(Math.random() * 1000000);
        const policyDate = new Date().toISOString();

        const policy = {
          policyID: 0, 
          insurerID: 1, 
          insuredID: 1, 
          policyNumber: policyNumber.toString(),
          startDate: new Date(travelData.departureDate).toISOString(),
          endDate: new Date(travelData.returnDate).toISOString(),
          totalPremium: values.paymentMethod === 'TL' ? values.totalPrice : values.totalUSDPrice,
          currency: values.paymentMethod
        };

        const policyResponse = await axios.post('http://localhost:26131/api/Policies', policy, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const policyID = policyResponse.data.policyID;

        console.log('Coverage Data:', coverageData);
        
        const selectedCoverages = (coverageData.coverages || []).filter(coverage => coverage.isSelected);
        const policyCoverages = selectedCoverages.map(coverage => ({
          policyID: policyID,
          coverageID: coverage.coverageID
        }));

        for (const policyCoverage of policyCoverages) {
          await axios.post('http://localhost:26131/api/PolicyCoverages', policyCoverage, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }

        updatePaymentData({ ...paymentInfo, paymentID });
        updatePolicyData({ ...policy, policyID });

        if (window.confirm('Ödemeniz başarıyla alınmıştır. Devam etmek için Tamam\'a tıklayın.')) {
          onNext();
        }
      } catch (err) {
        console.error('Error saving data:', err.response?.data || err.message);
        alert(`Gönderim başarısız oldu. Lütfen tekrar deneyin. Hata: ${err.response?.data?.message || err.message}`);
      }
    }
  });

  return (
    <div className="payment-form">
      <h3>Seyahat Sağlık Sigortası</h3>
      <h2>Prim Tutarı</h2>
      <p>₺{formik.values.totalPrice} / ${formik.values.totalUSDPrice}</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label>Kart Sahibinin Adı Soyadı:</label>
          <input 
            type="text" 
            name="cardHolderName" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.cardHolderName} 
          />
          {formik.touched.cardHolderName && formik.errors.cardHolderName ? (
            <div className="error">{formik.errors.cardHolderName}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label>Kart Numarası:</label>
          <input 
            type="text" 
            name="cardNumber" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.cardNumber} 
          />
          {formik.touched.cardNumber && formik.errors.cardNumber ? (
            <div className="error">{formik.errors.cardNumber}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label>Son Kullanma Tarihi:</label>
          <input 
            type="text" 
            name="expirationDate" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.expirationDate} 
          />
          {formik.touched.expirationDate && formik.errors.expirationDate ? (
            <div className="error">{formik.errors.expirationDate}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label>CVV:</label>
          <input 
            type="text" 
            name="cvv" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.cvv} 
          />
          {formik.touched.cvv && formik.errors.cvv ? (
            <div className="error">{formik.errors.cvv}</div>
          ) : null}
        </div>
        <div className="form-ödeme">
          <label>Ödeme Yöntemi:</label>
          <select 
            name="paymentMethod" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.paymentMethod}>
            <option value="TL">TL</option>
            <option value="USD">USD</option>
          </select>
          {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
            <div className="error">{formik.errors.paymentMethod}</div>
          ) : null}
        </div>
        <div className="button-container">
          {onBack && <button type="button" onClick={onBack} className="geri-button">Geri</button>}
          <button type="submit" className="satınAl">Satın Al</button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;










































