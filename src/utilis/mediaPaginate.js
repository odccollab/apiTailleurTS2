// hooks/useMediaCarousel.js
import { useState } from 'react';

const useMediaCarousel = (media) => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const nextMedia = () => {
        setCurrentMediaIndex((prevIndex) =>
            prevIndex === (media?.length ?? 1) - 1 ? 0 : prevIndex + 1
        );
    };

    const prevMedia = () => {
        setCurrentMediaIndex((prevIndex) =>
            prevIndex === 0 ? (media?.length ?? 1) - 1 : prevIndex - 1
        );
    };

    const isVideo = () => {
        const mediaItem = media ? media[currentMediaIndex] : null;
        if (!mediaItem || typeof mediaItem !== 'object') return false;
        const url = mediaItem.url || '';
        const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv'];
        return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
    };

    const getMediaUrl = () => {
        const mediaItem = media ? media[currentMediaIndex] : null;
        if (!mediaItem || typeof mediaItem !== 'object') return '';
        return mediaItem.url || '';
    };

    return {
        currentMediaIndex,
        nextMedia,
        prevMedia,
        isVideo,
        getMediaUrl,
        mediaLength: media?.length || 0,
    };
};

export default useMediaCarousel;
