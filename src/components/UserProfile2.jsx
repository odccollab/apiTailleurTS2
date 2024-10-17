import React, { useState } from 'react';
import ProfileContent from './Profile2.jsx';

const UserProfile2 = ({ userId }) => {
    const [activeTab, setActiveTab] = useState('post');

    return (
        <div>
            <h1>Profil de l'utilisateur</h1>
            <div className="tabs">
                <button onClick={() => setActiveTab('post')}>Posts</button>
                <button onClick={() => setActiveTab('story')}>Stories</button>
                <button onClick={() => setActiveTab('article')}>Articles</button>
            </div>

            <ProfileContent userId={userId} activeTab={activeTab} />
        </div>
    );
};

export default UserProfile2;
