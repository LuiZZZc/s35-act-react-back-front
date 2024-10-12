import axios from 'axios';

// Determina si está en modo producción o desarrollo
const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://tu-backend-en-render.com/' 
  : 'http://localhost:4000/'; // URL para desarrollo local

// Crea la instancia de Axios con la baseURL correcta
const axiosInstance = axios.create({
  baseURL: baseURL
});

export {
  axiosInstance
}
