import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://s35-act-react-back-front-1.onrender.com/'
});

export {
    axiosInstance
}
