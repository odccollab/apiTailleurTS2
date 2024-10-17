import React from 'react';
import Sidebar from '../components/StorySidebar.jsx';
import StoriesSection from '../components/StoriesSection.jsx';

const StoryPage = () => {
    return (
        <div className="main-content right-chat-active">
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left pe-0">
                    <Sidebar />
                    <StoriesSection />
                </div>
            </div>
        </div>
    );
};

export default StoryPage;
