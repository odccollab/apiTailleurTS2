import React, { useEffect, useState, useRef } from 'react';
import '../../css/storyModal.css';

const StoryModal = ({ stories, onClose, onDeleteStory, onSendMessage }) => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);
    const videoRef = useRef(null);
    const [storyDuration, setStoryDuration] = useState(5000);
    const updateInterval = 50;

    const handleNext = () => {
        if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(prevIndex => prevIndex + 1);
            setProgress(0);
            setIsPaused(false);
        } else {
            onClose();
        }
    };

    const handlePrevious = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(prevIndex => prevIndex - 1);
            setProgress(0);
            setIsPaused(false);
        }
    };

    const togglePause = () => {
        setIsPaused(prev => !prev);
    };

    useEffect(() => {
        if (isTyping || isPaused) {
            clearInterval(intervalRef.current);
            return;
        }

        const currentStory = stories[currentStoryIndex];
        const hasMedia = currentStory.contenuMedia && currentStory.contenuMedia.length > 0;
        const mediaUrl = hasMedia ? currentStory.contenuMedia[0].url : null;
        const isVideo = mediaUrl && mediaUrl.includes('.mp4');

        if (isVideo && videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
                setStoryDuration(videoRef.current.duration * 1000);
            };
        } else {
            setStoryDuration(5000);
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
    }, [currentStoryIndex, storyDuration, isTyping, isPaused]);

    const handleSendMessage = () => {
        if (!messageContent.trim()) return;

        const storyId = stories[currentStoryIndex].id;
        onSendMessage({
            receiver: stories[currentStoryIndex].user.id,
            content: messageContent,
            type: 'post',
            typeId: storyId,
        });
        setMessageContent('');
        setIsTyping(false);
        setIsPaused(false);
    };

    const renderStoryContent = () => {
        const currentStory = stories[currentStoryIndex];
        const hasMedia = currentStory.contenuMedia && currentStory.contenuMedia.length > 0;
        const mediaUrl = hasMedia ? currentStory.contenuMedia[0].url : null;
        const isVideo = mediaUrl && mediaUrl.includes('.mp4');
        if (hasMedia) {
            if (isVideo) {
                return (
                    <video
                        ref={videoRef}
                        className="story-media"
                        autoPlay
                        playsInline
                        muted
                        onEnded={handleNext}
                        onClick={togglePause}
                    >
                        <source src={mediaUrl} type="video/mp4" />
                    </video>
                );
            }
            return <img src={mediaUrl} alt="Story" className="story-media" onClick={togglePause} />;
        }

        return (
            <div className="story-text-content" onClick={togglePause}>
                <p>{currentStory.contenu}</p>
            </div>
        );
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="story-modal" onClick={togglePause}>
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

            <button className="close-button" onClick={(e) => { e.stopPropagation(); onClose(); }}>
                &times;
            </button>

            <div className="story-content" onClick={e => e.stopPropagation()}>
                <div className="navigation-overlay" onClick={handlePrevious}></div>
                {renderStoryContent()}
                <div className="navigation-overlay" onClick={handleNext}></div>
            </div>

            <div className="user-info">
                <img src={stories[currentStoryIndex].user.image} alt="User" className="user-avatar" />
                <span className="user-name">
                    {`${stories[currentStoryIndex].user.prenom} ${stories[currentStoryIndex].user.nom}`}
                </span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDeleteStory(stories[currentStoryIndex]);
                    }}
                    className="delete-button"
                >
                    Delete
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsTyping(true);
                        setIsPaused(true);
                    }}
                    className="message-button"
                >
                    Message
                </button>
            </div>

            {isTyping && (
                <div className="message-input-container" onClick={e => e.stopPropagation()}>
                    <textarea
                        placeholder="Type your message..."
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="message-input"
                        autoFocus
                    />
                    <button onClick={handleSendMessage} className="send-message-button">
                        Send
                    </button>
                    <button
                        onClick={() => {
                            setIsTyping(false);
                            setIsPaused(false);
                        }}
                        className="cancel-message-button"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default StoryModal;