import React, { useState, useEffect } from 'react';
import './Carousel.css';


const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null); 

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    setIntervalId(id); 

    return () => clearInterval(id);
  }, [images]);

  const handlePrevClick = () => {
    console.log("Previous button clicked");
    clearInterval(intervalId); 
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    clearInterval(intervalId); 

    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={handlePrevClick}>‹</button> 
      <div className="image-container">
        <img src={images[currentIndex].url}  />

        <div className="carousel-text">
          <h2>{images[currentIndex].title}</h2>
          <p>{images[currentIndex].description}</p>
        </div>
      </div>
      <button className="carousel-button next" onClick={handleNextClick}>›</button>

    </div>
  );
};

export default Carousel;
