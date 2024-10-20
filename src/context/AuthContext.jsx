import {createContext, useContext, useState, useEffect, useRef} from 'react';
import {jwtDecode} from 'jwt-decode';
import {useNavigate} from "react-router-dom";  // Correct import without curly braces

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [id, setId] = useState(0);
    const prevIdRef = useRef(id);
    const navigate = useNavigate();

    useEffect(() => {
        if ( id !== 0) {
            navigate("/discussion");
        }
        // Update the previous ID to the current ID
        prevIdRef.current = id;
    }, [id]);

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
            console.log(user);
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
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout ,id,setId}}>
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