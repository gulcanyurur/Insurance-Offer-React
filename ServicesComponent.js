import React from 'react';
import { FaClock, FaGift, FaHandshake, FaUserCircle } from 'react-icons/fa';


function ServicesComponent() {
  return (
    <div className="services">
      <img src="https://eurekosigorta.com.tr/_web/eurekobi-merchant.By2JLLaU.png" alt="Eurekobi Merchant" className="logo-right" />
  
      <div className="items">
    
        <div className="item">
       
          <FaClock className="icon" />
          <div className="title">Hızlı ve Kolay Kullanım ile Zaman Tasarrufu</div>
        </div>
        <div className="item">
          <FaGift className="icon" />
          <div className="title">Ücretsiz Hizmetler ve Avantajlı İndirimler</div>
        </div>
        <div className="item">
          <FaHandshake className="icon" />
          <div className="title">Farklı Sektörlere Hizmet Veren Partnerlerimizden Nitelikli Hizmet Anlayışı</div>
        </div>
        <div className="item">
          <FaUserCircle className="icon" />
          <div className="title">Kişiye Özel Kampanyalar</div>
        </div>
      </div>
    </div>
  );
}

export default ServicesComponent;








