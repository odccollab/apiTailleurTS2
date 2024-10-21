import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../css/Banner.css';


const BannerSlider = () => {
    const carouselOptions = {
        items: 1,
        loop: true,
        autoplay: true,
        nav: true,
        dots: true,
        navText: ["<", ">"],
    };


    return (
        <div className="banner-wrapper">
          <div className="banner-content">
            <div className="banner-text">
              <span className="banner-trending">TRENDING</span>
              <h2 className="banner-title">Collection Haute Couture</h2>
              <p className="banner-description">
                Élégance et raffinement pour vos créations uniques
              </p>
              <button className="banner-button">Découvrir</button>
            </div>
            <div className="banner-image">
              <img src="https://images.unsplash.com/photo-1525845859779-54d477ff291f?auto=format&fit=crop&w=800&q=80" alt="Haute Couture" />
            </div>
          </div>
        </div>
      );
};

export default BannerSlider;
