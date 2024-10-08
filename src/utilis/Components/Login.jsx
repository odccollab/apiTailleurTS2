// Login.js
import { useState } from 'react';
import useSave from '../Services/useSave'; // Adjust the path based on your project structure

// eslint-disable-next-line react/prop-types
const Login = ({ onLogin }) => {
    const [email, setEmail] = useState(''); // Renamed for clarity
    const [password, setPassword] = useState('');
    const { saveData, isSaving, saveError } = useSave(); // Use the custom hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await saveData('users/login2', { mail: email, password },); // Using 'mail' in the payload
            console.log(data);
            localStorage.setItem('token', data.token); // Store the token
            onLogin(); // Call the parent function to update the state (optional)
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            // The error is already handled in useSave
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Email" // Updated placeholder for clarity
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={isSaving}>
                {isSaving ? 'Logging in...' : 'Login'}
            </button>
            {saveError && <p aria-live="assertive">{saveError}</p>} {/* Display save error with accessibility */}
        </form>
    );
};

export default Login;
