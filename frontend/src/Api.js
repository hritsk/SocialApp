import axios from "axios";

// Use .env variable if available, fallback to Render URL
const BASE_URL = process.env.REACT_APP_API_URL || "https://socialapp-l7my.onrender.com";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // if you're using cookies/auth
});

export default API;
