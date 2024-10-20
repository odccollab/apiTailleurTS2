import React, { useEffect, useState, useRef } from 'react';
import '../../css/storyModal.css';

const StoryModal = ({ stories, onClose }) => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef(null);
    const videoRef = useRef(null);
    const [storyDuration, setStoryDuration] = useState(5000); // Default duration
    const updateInterval = 50; // Update progress every 50ms

    const handleNext = () => {
        if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(prevIndex => prevIndex + 1);
            setProgress(0);
        } else {
            onClose();
        }
    };

    const handlePrevious = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(prevIndex => prevIndex - 1);
            setProgress(0);
        }
    };

    useEffect(() => {
        const currentStory = stories[currentStoryIndex];
        const hasMedia = currentStory.contenuMedia && currentStory.contenuMedia.length > 0;
        const mediaUrl = hasMedia ? currentStory.contenuMedia[0].url : null;
        const isVideo = mediaUrl && mediaUrl.includes('.mp4');

        if (isVideo && videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
                setStoryDuration(videoRef.current.duration * 1000);
            };
        } else {
            setStoryDuration(5000); // Reset to default for images and text
        }

        setProgress(0);
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= 100) {
                    clearInterval(intervalRef.current);
                    handleNext();
                    return 0;
                }
                return prevProgress + (100 / (storyDuration / updateInterval));
            });
        }, updateInterval);

        return () => clearInterval(intervalRef.current);
    }, [currentStoryIndex, storyDuration]);

    const currentStory = stories[currentStoryIndex];
    const hasMedia = currentStory.contenuMedia && currentStory.contenuMedia.length > 0;
    const mediaUrl = hasMedia ? currentStory.contenuMedia[0].url : null;
    const isVideo = mediaUrl && mediaUrl.includes('.mp4');

    const renderStoryContent = () => {
        if (hasMedia) {
            if (isVideo) {
                return (
                    <video
                        ref={videoRef}
                        className="story-media"
                        autoPlay
                        muted
                        onEnded={handleNext}
                        style={{width:'80%',maxHeight:'800px'}}
                    >
                        <source src={mediaUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                );
            } else {
                return <img src={mediaUrl} alt="Story" className="story-media" />;
            }
        } else {
            return (
                <div className="story-text-content">
                    <p>{currentStory.contenu}</p>
                </div>
            );
        }
    };

    return (
        <div className="story-modal">
            <div className="progress-container">
                {stories.map((_, index) => (
                    <div key={index} className="progress-bar-wrapper">
                        <div
                            className="progress-bar"
                            style={{
                                width: `${index < currentStoryIndex ? '100%' : index === currentStoryIndex ? `${progress}%` : '0%'}`,
                            }}
                        />
                    </div>
                ))}
            </div>

            <button className="close-button" onClick={onClose}>&times;</button>

            <div className="story-content">
                <div className="navigation-overlay" onClick={handlePrevious}></div>
                {renderStoryContent()}
                <div className="navigation-overlay" onClick={handleNext}></div>
            </div>

            <div className="user-info">
                <img src={currentStory.user.image} alt={currentStory.user.nom} className="user-avatar" />
                <span className="user-name">{`${currentStory.user.nom} ${currentStory.user.prenom}`}</span>
            </div>
        </div>
    );
};

export default StoryModal;