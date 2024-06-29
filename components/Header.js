import React, { useState } from 'react';


const Header = () => {
 
  
  return (
    <div className="header-container">
      <div className="header-top">
        <div className="header-top-left">
          <span className="header-contact-info">
          <img src="./images/telephone (1).png" alt="" /> 0850 222 80 99
          </span>
          <span className="header-blog">Blog</span>
        </div>
        <div className="header-top-right">
          <span className="header-whatsapp">
            <img src="./images/social (1).png" alt="WhatsApp" /> Bilgilendirme için Whatsapp
          </span>
          <span className="header-eureko">Şirketiniz İçin </span>
        </div>
      </div>

    
      <div className="header-bottom">  
        <div className="header-logo">
          <img src="./images/images.png"/>
        </div>
        
        <nav className="header-menu">
      <ul>
        <li><a href="#">Ürünlerimiz</a></li>
        <li><a href="#">Yardım Merkezi</a></li>
      </ul>
    </nav>


        <img
            src="images/search.png"
            alt="Search"
            className="search-icon"
          />

        <div className="header-actions">
          <button className="giris-yap-butonu">Giriş yap</button>
        </div>
      </div>
    </div>
  );
}

export default Header;

