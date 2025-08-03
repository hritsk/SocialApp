import axios from "axios";


const BASE_URL = process.env.REACT_APP_API_URL || "https://socialapp-l7my.onrender.com";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

export default API;
