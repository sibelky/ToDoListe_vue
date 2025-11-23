import axios from "axios";

const BASE_URL = "https://todo-backend-1-fo7n.onrender.com"; // meine Backend-URL

const api = axios.create({
  baseURL: BASE_URL
});

export default api;
