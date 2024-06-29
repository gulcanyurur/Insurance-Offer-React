import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './DataContext';
import Header from './components/Header'; 
import Carousel from './components/Carousel'; 
import Navbar from './Navbar'; 
import TeklifAl from './TeklifAl';
import './App.css';
import CustomFooter from './CustomFooter';
import ServicesComponent from './ServicesComponent';

const App = () => {
    const [progress, setProgress] = useState(0);
   

   
    const images = [ 
        {
          url: require("./images/ES_website_slider_final_bos_8eaedc729d.jpg"),
          title: "Aklınız Sadece Güzel Düşüncelerle Meşgul Olsun,Gerisini Clean Sigorta Düşünmüştür Kesin",
        },
        {
          url: require("./images/eurekobi_5dfa871319.jpg"),
          title: " CleanKobi'nin size özel sunduğu ayrıcalıklarla tanışmaya hazır olun!",
        },
        {
          url: require("./images/erisilebilir_web_554770156d.jpg"),
          title: "Engellenen bireylerin ihtiyaçlarını  Clean Sigorta düşünmüştür kesin!",
        },
        {
          url: require("./images/surdurulebilirlik_web_92da4291ef.jpg"),
          title: "Sürdürülebilirlik bir tercih değil zorunluluk!",
          description: "Gelecek nesillere temiz ve sağlıklı bir gelecek bırakabilmek için sürdürülebilirlik gereklidir."
        }
    ];

    const handleNext = () => {
        setProgress(progress + 20); 
    };

    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<HomePage images={images} />} />
                    <Route path="/teklif-al" element={<TeklifAlPage />} /> 
                </Routes>
            </div>
        </Router>
    );
}

function HomePage({ images, openModal,}) {
    return (
        <div>
            <Header  />
            <Carousel images={images} />
            <Navbar />
            <ServicesComponent />
            <CustomFooter />
        </div>
    );
}

function TeklifAlPage() { 
    return (
        <div>
            <Header />
            <DataProvider>
                <TeklifAl />
            </DataProvider>
        </div>
    );
}

export default App;
