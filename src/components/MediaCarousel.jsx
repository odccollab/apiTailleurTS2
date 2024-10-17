import React, { useRef, useState } from 'react';
import useMediaCarousel from '../utilis/mediaPaginate.js';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "../css/mediaCarousel.css";

const MediaCarousel = ({ media }) => {
    const {
        currentMediaIndex,
        nextMedia,
        prevMedia,
        isVideo,
        getMediaUrl,
        mediaLength,
    } = useMediaCarousel(media);

    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState(0);

    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartPosition(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const currentPosition = e.touches[0].clientX;
        const deltaX = startPosition - currentPosition;
        carouselRef.current.style.transform = `translateX(-${currentMediaIndex * 100 + deltaX / window.innerWidth}%)`;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        const threshold = 100;

        const currentPosition = carouselRef.current.getBoundingClientRect().left;

        if (currentPosition < -threshold) {
            nextMedia();
        } else if (currentPosition > threshold) {
            prevMedia();
        }
        carouselRef.current.style.transform = `translateX(-${currentMediaIndex * 100}%)`;
    };

    return (
        <div className="carousel-container" style={{height:'600px'}}>
            <div className="carousel-wrapper"
                 onTouchStart={handleTouchStart}
                 onTouchMove={handleTouchMove}
                 onTouchEnd={handleTouchEnd}>
                <div className="carousel-content" style={{display:'block'}} ref={carouselRef}>
                    {media.map((mediaItem, index) => (
                        <div key={index} className="carousel-item" style={{maxWidth: '900px',height:'600px',display:'block'}}>
                            {isVideo(mediaItem) ? (
                                <video className="media-item" controls>
                                    <source src={getMediaUrl(mediaItem)} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img className="media-item" style={{maxWidth: '900px',height:'600px'}} src={getMediaUrl(mediaItem)} alt={`Media ${index + 1}`} />
                            )}
                        </div>
                    ))}
                </div>

                {mediaLength > 1 && (
                    <>
                        <button className="carousel-btn left bg-blur" onClick={prevMedia}>
                            <ChevronLeft />
                        </button>
                        <button className="carousel-btn right bg-blur" onClick={nextMedia}>
                            <ChevronRight />
                        </button>
                    </>
                )}
                <div className="carousel-indicators">
                    {Array.from({ length: mediaLength }).map((_, index) => (
                        <div key={index} className={`indicator ${index === currentMediaIndex ? 'active' : ''}`}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MediaCarousel;