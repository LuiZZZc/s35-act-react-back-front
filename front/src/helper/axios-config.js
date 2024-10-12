import axios from 'axios';

// Define la URL base dependiendo del entorno
const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://tu-backend-en-render.com/'  // Reemplaza con la URL real de tu backend en Render
  : 'http://localhost:4000/';  // URL en desarrollo local

// Crea la instancia de Axios
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export {
  axiosInstance
}
