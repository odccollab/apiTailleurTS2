import { createContext, useState,useEffect } from 'react';

// Création du contexte utilisateur
export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ firstName: '', lastName: '' });
    const [theme, setTheme] = useState('light'); // État pour le thème

    const updateUser = (firstName, lastName) => {
        setUser({ firstName, lastName });
    };
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <UserContext.Provider value={{ user, updateUser, theme, toggleTheme }}>
            {children}
        </UserContext.Provider>
    );
};
