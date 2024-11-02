// src/services/userService.js
import axios from 'axios';

// Base URL for the API (replace with your actual API URL)
const BASE_URL = 'https://jalanidhi-api.onrender.com/v1';

// Utility function to get the auth token from local storage or any other method you use
const getAuthToken = () => localStorage.getItem('authToken');

// Axios instance with base URL and default headers
const api = axios.create({
    baseURL: BASE_URL,
});

// Interceptor to add authorization token to the headers of each request
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Service functions for user-related API calls
const userService = {
    // Fetch all users
    fetchUsers: async () => {
        try {
            const response = await api.get('/users');
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    },

    // Create a new user
    createUser: async (userData) => {
        try {
            const response = await api.post('/users', userData);
            return response.data;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    },

    // Fetch a specific user by ID
    fetchUserById: async (userId) => {
        try {
            const response = await api.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw error;
        }
    }
};

export default userService;
