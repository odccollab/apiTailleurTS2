import React, { createContext, useState, useContext } from 'react';

const FollowContext = createContext();

export const FollowProvider = ({ children }) => {
    const [theme, setTheme] = useState('#3b82f6');
    const [isFollowing, setIsFollowing] = useState(false);

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
        setTheme(isFollowing ? '#3b82f6' : 'white');
    };

    return (
        <FollowContext.Provider value={{ theme, isFollowing, toggleFollow }}>
            {children}
        </FollowContext.Provider>
    );
};

export const useFollow = () => useContext(FollowContext);