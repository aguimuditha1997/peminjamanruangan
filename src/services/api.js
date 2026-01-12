import axios from 'axios';

// Create an axios instance
const api = axios.create({
    baseURL: '/api',
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Add a request interceptor to include auth token if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized - clear session and redirect to login if necessary
            localStorage.removeItem('isAdminAuthenticated');
            localStorage.removeItem('auth_token');
            // Depending on the app logic, you might want to force a redirect
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
