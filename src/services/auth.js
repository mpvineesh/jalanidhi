// src/services/authService.js
import axios from 'axios';

const BASE_URL = 'https://jalanidhi-api.onrender.com/v1';

// Utility function to set the auth token in localStorage
const setAuthToken = (token) => {
    localStorage.setItem('authToken', token);
};

// Login function
const login = async (mobile, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            mobile,
            otp:password,
        });

        const token = response.data.token.accessToken;
        setAuthToken(token);
        return token; // Return token or any response data if needed
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

// Optional: function to log out and clear token
const logout = () => {
    localStorage.removeItem('authToken');
};

// Export the authService object
export const authService = {
    login,
    logout,
};