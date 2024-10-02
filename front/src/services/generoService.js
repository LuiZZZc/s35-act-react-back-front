import { axiosInstance } from "../helper/axios-config";

const getGeneros = () => {
    return axiosInstance.get('genero', {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const crearGenero = (data) => {
    return axiosInstance.post('genero', data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const actualizarGenero = (generoId, generoData) => {
    return axiosInstance.put(`genero/${generoId}`, generoData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const eliminarGenero = (generoId) => {
    return axiosInstance.delete(`genero/${generoId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
export {
    getGeneros, crearGenero, actualizarGenero, eliminarGenero
}