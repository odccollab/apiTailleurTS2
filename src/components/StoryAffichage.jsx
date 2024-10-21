import React from 'react';
import '../css/storyAfffiche.css';

const StoryItem = ({ image, userName, userImage }) => {
    console.log(image)
    return (
        <div className="story-item"  style={{width:'80%',height:'300px'}}>
            <img src={image.url} alt="Story" className="story-image"  style={{width:'80%',height:'300px'}} />
        </div>
    );
};

export default StoryItem;