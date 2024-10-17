import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


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
        <div className="banner-wrapper bg-greylight overflow-hidden rounded-3">
            <OwlCarousel className="banner-slider owl-theme dot-style2 owl-nav-link link-style3" {...carouselOptions}>
                <div className="d-flex align-items-center bg-lightblue p-5">
                    <div className="row w-100">
                        <div className="col-lg-6">
                            <h4 className="font-xssss text-danger ls-3 fw-700">TRENDING</h4>
                            <h2 className="fw-300 display2-size lh-2 text-grey-900">
                                New Arrival Buds <b className="fw-700">Collection</b>
                            </h2>
                            <p className="fw-500 text-grey-500 lh-26 font-xssss">
                                Discover the latest in audio technology.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <img src="path/to/your-image.jpg" alt="New Arrival Buds" className="img-fluid rounded" />
                        </div>
                    </div>
                </div>
                {/* Additional slides can be added here */}
            </OwlCarousel>
        </div>
    );
};

export default BannerSlider;
