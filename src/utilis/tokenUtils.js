// tokenUtils.js

import {jwtDecode} from 'jwt-decode'; // Use default import

/**
 * Decodes a JWT token and extracts user information.
 *
 * @param {string} token - The JWT token to decode.
 * @returns {Object|null} - Returns user information if decoding is successful, or null if there's an error.
 */
export const decodeToken = (token) => {
    console.log(token)
    try {
        return jwtDecode(token); // Use the default export function
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null; // Return null or handle the error as needed
    }
};
