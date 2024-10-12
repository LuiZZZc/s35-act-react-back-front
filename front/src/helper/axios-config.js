import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://front-j7df.onrender.com'
});

export {
    axiosInstance
}
