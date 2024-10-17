import React from 'react';
import StoryCard from "./StoryCard2.jsx";

const storiesData = [
    { id: 1, image: '../images/s-1.jpg', userImage: '../images/user-7.png', name: 'Victor Exrixon' },
    { id: 2, image: '../images/s-2.jpg', userImage: '../images/user-12.png', name: 'Surfiya Zakir' },
    { id: 3, video: '../images/s-4.mp4', userImage: '../images/user-4.png', name: 'Goria Coast' },
    { id: 4, video: '../images/s-3.mp4', userImage: '../images/user-3.png', name: 'Hurin Seary' },
    // Add more story data here as needed
];

const StoriesSection = () => {
    return (
        <div className="row ps-2 pe-1">
            {storiesData.map((story) => (
                <div className="col-md-3 col-xss-6 pe-2 ps-2" key={story.id}>
                    <StoryCard {...story} />
                </div>
            ))}
        </div>
    );
};

export default StoriesSection;
