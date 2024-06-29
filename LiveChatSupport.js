import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './teklif-al.css';

function LiveChatSupport() {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'Hoş geldiniz' },
        { sender: 'ai', text: 'Değerli Müşterimiz,\n\nKişisel Verilerin Korunması Kanunu kapsamında, Sigortacınıza vermiş olduğunuz tüm verileriniz poliçeniz kapsamında ilgili hizmetlerin sunulabilmesi için işlenecek ve CleanSigorta A.Ş.nin iş ortakları, tedarikçiler, yetkili kurum ve kuruluşlar, diğer sigorta şirketleri, sağlık kuruluşları, varsa poliçenin menfaat sahibi tarafları, rücu muhatapları veya paylaşılmasına açık rıza verdiğiniz 3. kişilere aktarılabilecektir. Kanunun 11. Maddesi uyarınca; bilgi talep etme, verilerinizin kimlerle paylaşıldığını öğrenme, düzeltilmesini veya silinmesini talep etme haklarınız saklıdır.\nDetaylı bilgiye https://www.Cleansigorta.com.tr web sitemizden ulaşabilirsiniz.\nYukarıda belirtilen koşulları onaylıyor musunuz?' }
    ]);
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
    };

    const handleSend = () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);
        setInput('');

        setTimeout(() => {
            const responseMessage = getResponse(input);
            setMessages(prevMessages => [...prevMessages, { sender: 'ai', text: responseMessage.text }]);
            if (responseMessage.buttons) {
                setMessages(prevMessages => [...prevMessages, { sender: 'ai', buttons: responseMessage.buttons }]);
            }
            if (responseMessage.action) {
                responseMessage.action();
            }
        }, 1000);
    };

    const handleButtonClick = (message) => {
        const userMessage = { sender: 'user', text: message };
        setMessages([...messages, userMessage]);
        setTimeout(() => {
            const responseMessage = getResponse(message);
            setMessages(prevMessages => [...prevMessages, { sender: 'ai', text: responseMessage.text }]);
            if (responseMessage.buttons) {
                setMessages(prevMessages => [...prevMessages, { sender: 'ai', buttons: responseMessage.buttons }]);
            }
            if (responseMessage.action) {
                responseMessage.action();
            }
        }, 1000);
    };

    const getResponse = (message) => {
        const lowerCaseMessage = message.toLowerCase();
        if (lowerCaseMessage.includes('onay') || lowerCaseMessage.includes('red')) {
            return {
                text: 'Yardımcı olmamı istediğiniz konuyu bir kaç kelime ile yazabilir ya da aşağıdaki menülerden seçim yaparak ilerleyebilirsiniz.\n\nÖrneğin, poliçe satın almak istiyorum ya da hasar dosyamı sorgulamak istiyorum ya da en yakın hastane yazabilirsiniz.',
                buttons: [
                    { text: '1. Anlaşmalı Kurumlar', action: () => handleButtonClick('anlaşmalı kurumlar') },
                    { text: '2. Hasar İşlemleri', action: () => handleButtonClick('hasar işlemleri') }
                ]
            };
        } else if (lowerCaseMessage.includes('anlaşmalı kurumlar')) {
            return {
                text: 'Hangi anlaşmalı kurumlarımız ile ilgili bilgi almak istiyorsunuz?',
                buttons: [
                    { text: '1. Anlaşmalı Sağlık Kuruluşları', action: () => handleButtonClick('anlaşmalı sağlık kuruluşları') },
                    { text: '2. Anlaşmalı Servisler', action: () => handleButtonClick('anlaşmalı servisler') }
                ]
            };
        } else if (lowerCaseMessage.includes('anlaşmalı servisler')) {
            return {
                text: 'Lütfen servis tipini seçin.',
                buttons: [
                    { text: '1. Clean Hizmet Noktaları', action: () => handleButtonClick('eureko hizmet noktaları') },
                    { text: '2. Anlaşmalı Özel Servisler', action: () => handleButtonClick('anlaşmalı özel servisler') },
                    { text: '3. Anlaşmalı Yetkili Servisler', action: () => handleButtonClick('anlaşmalı yetkili servisler') },
                    { text: '4. Cam Servisleri', action: () => handleButtonClick('cam servisleri') },
                    { text: '5. Mini Hasar', action: () => handleButtonClick('mini hasar') }
                ]
            };
        } else if (lowerCaseMessage.includes('cam servisleri')) {
            return { text: 'Lütfen bulunduğunuz ili yazın.' };
        } else if (lowerCaseMessage.includes('hasar işlemleri')) {
            return {
                text: 'Hangi hasar işlemini gerçekleştirmek istiyorsunuz?',
                buttons: [
                    { text: '1. Hasar Bildirim', action: () => handleButtonClick('hasar bildirim') },
                    { text: '2. Hasar Dosya Sorgulama', action: () => handleButtonClick('hasar dosya sorgulama') },
                    { text: '3. İkame Araç Talebi', action: () => handleButtonClick('ikame araç talebi') }
                ]
            };
        } else if (lowerCaseMessage.includes('hasar dosya sorgulama')) {
            return { text: 'Lütfen hasar dosya numaranızı yazın.' };
        } else if (lowerCaseMessage.includes('poliçe satın almak')) {
            return { text: 'Poliçe satın almak için lütfen aşağıdaki linke tıklayın.\nhttps://www.Cleansigorta.com.tr/police-satin-alma' };
        } else if (lowerCaseMessage.includes('en yakın hastane')) {
            return { text: 'Bulunduğunuz ili yazın, size en yakın hastaneleri ileteyim.' };
        } else if (lowerCaseMessage.includes('seyahat sağlık sigortası')) {
            return {
                text: 'Seyahat Sağlık Sigortası ekranına gitmek için butona tıklayın.',
                buttons: [
                    { text: 'Seyahat Sağlık Sigortası', action: () => navigate('/teklif-al') }
                ]
            };
        } else if (/(\+\d{1,3}[- ]?)?\d{10}/.test(lowerCaseMessage)) {
            return { text: 'Teşekkürler, en kısa sürede dönüş yapacağız.' };
        } else {
            return { text: 'Lütfen telefon numaranızı bırakın, size ulaşacağız.' };
        }
    };

    return (
        <div className="live-chat-support">
            {!isChatVisible && (
                <div className="chat-icon" onClick={toggleChatVisibility}>
                    <div className="cbot-dialog-button-regular">
                        <div className="cbot-avatar">
                            <img src="https://www.eurekosigorta.com.tr/static/img/logos/bot_avatar_icon.svg" draggable="false" alt="bot avatar" />
                            <span className="chat-text">Size Nasıl Yardımcı Olabilirim</span>
                        </div>
                    </div>
                </div>
            )}
            {isChatVisible && (
                <div className="chat-container">
                    <div className="cbot-dialog-head">
                        <div className="cbot-avatar">
                            <img src="https://www.eurekosigorta.com.tr/static/img/logos/bot_avatar_icon.svg" draggable="false" alt="bot avatar" />
                            <span className="cbot-head-text">Size Nasıl Yardımcı Olabilirim</span>
                        </div>
                        <div className="close-button" onClick={toggleChatVisibility}>×</div>
                    </div>
                    <div className="chat-window">
                        <div className="messages">
                            {messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender}`}>
                                    {msg.text}
                                    {msg.buttons && (
                                        <div className="button-container">
                                            {msg.buttons.map((button, idx) => (
                                                <button key={idx} onClick={button.action}>
                                                    {button.text}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="input-container">
                            <textarea
                                className="textarea"
                                placeholder="Mesajınızı buraya yazınız!"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            ></textarea>
                            <button className="cbot-send-button" onClick={handleSend}>Gönder</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LiveChatSupport;

