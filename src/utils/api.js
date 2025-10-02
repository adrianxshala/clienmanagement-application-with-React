import axios from 'axios';

// Create axios 
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    // Log request
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    }
  
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
   
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ ${response.status} ${response.config.url}`);
    }
    
    return response;
  },
  (error) => {
  
    if (error.response) {
      
      console.error('Response error:', error.response.status, error.response.data);
      
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized - please check your credentials');
          break;
        case 403:
          console.error('Forbidden - you do not have permission');
          break;
        case 404:
          console.error('Not found - the requested resource does not exist');
          break;
        case 500:
          console.error('Server error - please try again later');
          break;
        default:
          console.error('An error occurred:', error.response.data);
      }
    } else if (error.request) {
     
      console.error('Network error - please check your internet connection');
    } else {
      
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
