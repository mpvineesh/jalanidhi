// src/services/authService.js
import axios from 'axios';

const BASE_URL = 'https://jalanidhi-api.onrender.com/v1';

// Utility function to set the auth token in localStorage
const setAuthToken = (token,user) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('loggedUser', JSON.stringify(user)); 
};

// Login function
const login = async (mobile, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            mobile,
            otp:password,
        });

        const token = response.data.token.accessToken;
        setAuthToken(token, response.data.user);
        return token; // Return token or any response data if needed
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

// Optional: function to log out and clear token
const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedUser');
    
};

// Optional: function to log out and clear token
const loggedUser = () => {
    const userInfo = localStorage.getItem('loggedUser');
    console.log('userInfo', userInfo)
    if(userInfo) {
        return JSON.parse(userInfo);
    }
    return {};
};

// Export the authService object
export const authService = {
    login,
    logout,
    loggedUser,
};