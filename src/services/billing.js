// src/services/billingService.js
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

// Service functions for billing-related API calls
const billingService = {
    // Fetch all readings
    fetchBillings: async () => {
        try {
            const response = await api.get('/readings');
            return response.data;
        } catch (error) {
            console.error("Error fetching readings:", error);
            throw error;
        }
    },

    // Create a new billing
    createBilling: async (billingData) => {
        try {
            const response = await api.post('/readings', billingData);
            return response.data;
        } catch (error) {
            console.error("Error creating billing:", error);
            throw error;
        }
    },

    // Fetch a specific billing by ID
    fetchBillingById: async (billingId) => {
        try {
            const response = await api.get(`/readings/${billingId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching billing by ID:", error);
            throw error;
        }
    }
};

export default billingService;
