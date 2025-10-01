// API 
export const API_BASE_URL = "https://jsonplaceholder.typicode.com";
export const USERS_ENDPOINT = `${API_BASE_URL}/users`;

// Local Storage Keys
export const LOCAL_USERS_KEY = "localUsers";


export const LOCAL_USER_TIME_THRESHOLD = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Form Validation
export const REQUIRED_FIELDS = {
  name: "Name is required",
  email: "Email is required",
  emailFormat: "Please enter a valid email address",
};

// UI Constants
export const SORT_ORDERS = {
  ASC: "asc",
  DESC: "desc",
};

export const SORT_FIELDS = {
  NAME: "name",
  EMAIL: "email",
};
