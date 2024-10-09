import { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';  // Correct import without curly braces

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const initializeAuth = () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    // Check if token is expired
                    if (decoded.exp * 1000 > Date.now()) {
                        setUser(decoded);
                        setIsAuthenticated(true);
                    } else {
                        // Token is expired
                        localStorage.removeItem('token');
                        setUser(null);
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error('Token validation failed:', error);
                    localStorage.removeItem('token');
                    setUser(null);
                    setIsAuthenticated(false);
                }
            }
        };

        initializeAuth();
    }, []);

    const login = (token) => {
        try {
            localStorage.setItem('token', token); // Store token in localStorage
            const decoded = jwtDecode(token);
            setUser(decoded);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login failed:', error);
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};