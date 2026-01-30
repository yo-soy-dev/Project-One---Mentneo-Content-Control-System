import axios from "axios";

const api = axios.create({
  baseURL: "https://project-one-mentneo-content-control.vercel.app/api", 
  withCredentials: true
});

export default api;
