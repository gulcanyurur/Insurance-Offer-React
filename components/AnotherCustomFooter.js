import React from 'react';
import './Navbar.css';

function AnotherCustomFooter() { 
  return (
    <footer className="another-footer"> 
      <div className="another-footer-container"> 
        <div className="another-footer-section"> 
          <h4>Eureko Kurumsal</h4>
          <ul>
            <li><a href="#">Hakkımızda</a></li>
            <li><a href="#">Yönetim</a></li>
            <li><a href="#">Şirket Yapımız</a></li>
            <li><a href="#">Finansal Bilgilerimiz</a></li>
            <li><a href="#">İş Ortağımız Olun</a></li>
            <li><a href="#">Sosyal Sorumluluk</a></li>
            <li><a href="#">Müşteri Deneyimi</a></li>
            <li><a href="#">Sürdürülebilirlik</a></li>
          </ul>
        </div>
        <div className="another-footer-section">
          <h4>Eureko’da Kariyer</h4>
          <ul>
            <li><a href="#">Eureko'lu Olmak</a></li>
            <li><a href="#">Eureko'da Yaşam</a></li>
            <li><a href="#">Eureko Kampüs</a></li>
            <li><a href="#">İK ve Açık Pozisyonlar</a></li>
          </ul>
        </div>
        <div className="another-footer-section">
          <h4>İletişim</h4>
          <ul>
            <li><a href="#">Genel Müdürlüğümüz</a></li>
            <li><a href="#">Bölge Müdürlüklerimiz</a></li>
            <li><a href="#">Acentelerimiz</a></li>
            <li><a href="#">Bize Yazın</a></li>
            <li><a href="#">Müşteri İletişim Merkezi</a></li>
            <li><a href="#">Asistans Hizmetlerimiz</a></li>
          </ul>
        </div>
        <div className="another-footer-section">
          <h4>Bilgilendirme</h4>
          <ul>
            <li><a href="#">Zorunlu Trafik Sigortası Prim Hesaplama</a></li>
            <li><a href="#">Hak Sahiplerince Aranmayan Paralar</a></li>
            <li><a href="#">Yanlış Sigorta Uygulamaları Bilgilendirilmesi</a></li>
            <li><a href="#">Meblağ Sigortalarında Hak Sahipliği Sorgulama Ekranı</a></li>
            <li><a href="#">Ticari Uyuşmazlıklarda Zorunlu Arabuluculuk</a></li>
            <li><a href="#">Eureko Basın Odası</a></li>
            <li><a href="#">Duyurular</a></li>
            <li><a href="#">Bültenler</a></li>
            <li><a href="#">Eureko Mobili İndirin</a></li>
          </ul>
        </div>
      </div>
      <div className="another-footer-bottom">
        <p>Copyright © 2024 Eureko Sigorta. Her Hakkı Saklıdır.</p>
      </div>
    </footer>
  );
}

export default AnotherCustomFooter;
