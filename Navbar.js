import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import LiveChatSupport from './LiveChatSupport';

function Navbar() {
  const [selectedItem, setSelectedItem] = useState('Kasko');
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const items = [
    { title: 'Kasko', contentTitle: 'Kasko Sigortası', content: 'Aracınızda meydana gelebilecek olan tüm maddi hasarları, ister anlaşmalı araç servislerimizde isterseniz anlaşmasız araç servislerinde hiçbir ücret ödemeden giderebilirsiniz. Aracınızda bir hasar meydana geldiğinde ve tamiri için araç servisine bıraktığınızda tamir süresince araçsız kalmamanız için yılda 2 kez ve 7’şer gün ikame aracınızı kullanabilirsiniz. Aracınızın tamir süresinde anlaşmalı olduğumuz araç servislerine teslim etmeniz durumunda, aracınızın tamirinde sadece orijinal yedek parça kullanımı garantilidir.', image: './images/kasko_1_25c9db7b35.png' },
    { title: 'Konut', contentTitle: 'Konut Sigortası', content: 'Konut sigortası, evinizi ve eşyalarınızı güvence altına alan bir mülkiyet sigortasıdır. Doğal afetler, yangın, su baskını ya da hırsızlık gibi 3. kişiler nedeniyle ortaya çıkan durumlardan ötürü yaşanan zararlar konut sigortası ile karşılanır. Eureko Konut Sigortası, sunduğu çeşitli teminatlar ile beklentilerinize özel bir poliçeye sahip olmanızı sağlar.', image: './images/konut_24807a8a2c.png' },
    { title: 'Seyahat Sağlık', contentTitle: 'Seyahat Sağlık Sigortası', content: 'Vize başvuru evrakları içinde bulunan Yurtdışı seyahat sağlık sigortası, yurtdışı seyahatlerinizde Covid 19 da dahil olmak üzere meydana gelebilecek acil sağlık problemleri için hastane ve doktor masraflarınızı karşılar. Kapsamlı Asistans hizmetleriyle bagaj kaybından, yurtdışı nakit avans, hukuki yardıma kadar isteğe bağlı birbirinden çok hizmet ile poliçenizi genişletebilirsiniz. Çeşitli ülkeler vize başvurusu sırasında Seyahat Sağlık Sigortasını zorunlu tutmaktadır.', image: './images/seyahatsaglik_905c0bfbb4.png' },
    { title: '4 Mevsim Sağlık', contentTitle: '4 Mevsim Sağlık Sigortası', content: '4 Mevsim Sağlık Sigortası, acil durumlar kapsamında hastalık ve/veya yaralanma halinde tedavi masraflarını ve hastalık destek teminatı kapsamında; kalp krizi, inme geçirmesi veya kanser hastalığına yakalanması durumunda nakdi ödeme alabilmesini sağlayan bir sigorta türüdür. Ürüne özel hazırlanmış her biri yılda 1 kez geçerli olmak üzere check up, grip aşısı, diyetisyen ve diş bakım paketi sağlık hizmetlerinden ücretsiz faydalanabilirsiniz.', image: './images/4mevsim_afa2069369.png' },
    { title: 'Tamamlayıcı Sağlık', contentTitle: 'Tamamlayıcı Sağlık Sigortası', content: 'Tamamlayıcı Sağlık Sigortası, SGK ve Eureko Sigorta ile anlaşmalı özel hastanelerde aldığınız sağlık hizmeti için SGK’nın hastaneye ödediği tutardan arta kalan hastane ücretini karşılamaktadır. Tamamlayıcı Sağlık Sigortası ile uygun fiyatlarla yüksek maliyetli harcamaları güvence altına alabilir, poliçenize eş ve çocuklarınızı da ekleyebilir, üç yıllık kesintisiz sigortalı olmanız durumunda, ömür boyu yenileme garantisi kazanabilirsiniz. Tamamlayıcı Sağlık Sigortası ile poliçenizde size özel sunulan ayrıcalıklarından, herhangi bir ücret ödemeden faydalanabilirsiniz.', image: './images/tamamlayici_6115d5eb18.png' },
    { title: 'Ferdi Kaza', contentTitle: 'Ferdi Kaza Sigortası', content: 'Ferdi kaza sigortası, aniden oluşabilecek kazalara karşı güvence sunan bir sigorta türüdür. Eureko Sigorta Ferdi Kaza Sigortası, beklenmedik kazalar sonucunda hem sizi hem de ailenizi zor durumda bırakmayacak pek çok teminat sunar.', image: './images/ferdikaza_18d79d5320.png' },
    { title: 'Zorunlu Deprem', contentTitle: 'Zorunlu Deprem Sigortası', content: '17 Ağustos 1999’da yaşanan deprem felaketi sonrası kurulan Doğal Afet Sigortaları Kurumu (DASK) tarafından yürürlüğe giren Zorunlu Deprem Sigortası, yasal olarak zorunluluğu bulunan bir sigorta türüdür. Eureko Zorunlu Deprem Sigortası yaptırarak depreme, depreme bağlı oluşan zararlara karşı koruma bu sigortayı kolayca yaptırabilirsiniz.', image: './images/asd_38f194c803.png' },
    { title: 'Dijital Koruma', contentTitle: 'Dijital Koruma Sigortası', content: 'Dijital Koruma Sigortası, dijital ortamdaki risklere karşı sigortalıyı güvence altına alırken aynı zamanda kimlik hırsızlığı, dolandırıcılık, ödeme araçlarının hileli kullanımı, ATM hırsızlığı, gasp/kapkaç ve kişisel şifrelerin çalınması gibi risklere karşı da koruma sağlamaktadır.', image: './images/dijitalkoruma_15b83e3462.png' },
    { title: 'Alışveriş Sigortası', contentTitle: 'Alışveriş Sigortası', content: 'Alışveriş Sigortası ile korumanız için en önemli olan cihazları seçebilir, satın aldığınız cihazları önceden bilinmeyen ani ve beklenmedik sebeplerle oluşabilecek hasarlara karşı koruyabilirsiniz.', image: './images/alisveris_4c5f265a8b.png' },
  ];

  const handleItemClick = (title, idx) => {
    setSelectedItem(title);
    setIndex(idx);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-items">
        {items.map((item, idx) => (
          <li key={idx} className={`navbar-item ${item.title === selectedItem ? 'active' : ''}`}
            onClick={() => handleItemClick(item.title, idx)}>
            {item.title === 'Kasko' && <img src="./images/car (2).png" />}
            {item.title === 'Konut' && <img src="./images/home.png" />}
            {item.title === 'Seyahat Sağlık' && <img src="/images/597936.png" />}
            {item.title === '4 Mevsim Sağlık' && <img src="./images/heart-rate.png" />}
            {item.title === 'Tamamlayıcı Sağlık' && <img src="./images/cardiogram.png" />}
            {item.title === 'Ferdi Kaza' && <img src="./images/plaster.png" />}
            {item.title === 'Zorunlu Deprem' && <img src="./images/earthquake.png" />}
            {item.title === 'Dijital Koruma' && <img src="./images/fingerprint.png" />}
            {item.title === 'Alışveriş Sigortası' && <img src="./images/shopping-cart.png" />}
            <span>{item.title}</span>
          </li>
        ))}
      </ul>

      <div className="content">
        {selectedItem && (
          <div className="selected-item">
            <img src={items[index].image} alt={items[index].title} />
            <div className="item-content">
              <h2>{items[index].contentTitle}</h2>
              <p>{items[index].content}</p>
            </div>

            <div className="button-container">
              {selectedItem === 'Seyahat Sağlık' && (
                <Link to="/teklif-al" className="teklif-button">
                  Hemen Teklif Al
                </Link>
              )}
              <LiveChatSupport />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;


