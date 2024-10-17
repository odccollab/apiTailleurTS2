    import React from 'react';
import BannerSlider from '../components/BannerSlider';
import ProductCard from '../components/ProductItem.jsx';

const products = [
    { name: 'Wireless Buds', description: 'High-quality sound', price: 99, image: 'path/to/buds.jpg' },
    { name: 'Smart Watch', description: 'Fitness and notifications', price: 199, image: 'path/to/watch.jpg' },
    { name: 'Bluetooth Speaker', description: 'Portable and powerful', price: 149, image: 'path/to/speaker.jpg' },
];

const HomePage = () => (
    <div className="main-content bg-white right-chat-active">
        <div className="middle-sidebar-bottom">
            <div className="middle-sidebar-left pe-0">
                <div className="row">
                    <div className="col-xl-12">
                        <BannerSlider />
                    </div>
                </div>
                <div className="row mt-4">
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default HomePage;
