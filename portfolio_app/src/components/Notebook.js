// src/components/Notebook.js

import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import './Notebook.css';

const Flipbook = () => {
  const images = [
    'https://github.com/kavyaaswadhati/kavyaaswadhati.github.io/blob/master/portfolio_app/src/images/black_and_green_peau_d_ane.png',
    'https://github.com/kavyaaswadhati/kavyaaswadhati.github.io/blob/master/portfolio_app/src/images/blue_rainbows.png',
    'https://github.com/kavyaaswadhati/kavyaaswadhati.github.io/blob/master/portfolio_app/src/images/bug_like_an_angel.png',
    'https://github.com/kavyaaswadhati/kavyaaswadhati.github.io/blob/master/portfolio_app/src/images/business_goose.png',
    'https://github.com/kavyaaswadhati/kavyaaswadhati.github.io/blob/master/portfolio_app/src/images/catching_the_9.png',
    'https://github.com/kavyaaswadhati/kavyaaswadhati.github.io/blob/master/portfolio_app/src/images/cryin.png',
    'https://github.com/kavyaaswadhati/kavyaaswadhati.github.io/blob/master/portfolio_app/src/images/habfurdo.png',
    'https://github.com/kavyaaswadhati/kavyaaswadhati.github.io/blob/master/portfolio_app/src/images/spring_in_sac.png',
    'https://github.com/kavyaaswadhati/kavyaaswadhati.github.io/blob/master/portfolio_app/src/images/windy_bernal.png'
    // Add more image URLs here
  ];

  return (
    <div className="notebook-container">
      <HTMLFlipBook width={300} height={500}>
        {images.map((src, index) => (
          <div key={index} className="page">
            <img src={src} alt={`Artwork ${index + 1}`} />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default Notebook;
