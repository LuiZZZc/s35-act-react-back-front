import { axiosInstance } from "../helper/axios-config";

const getDirectores = () => {
    return axiosInstance.get('Director', {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const crearDirector = (data) => {
    return axiosInstance.post('Director', data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const actualizarDirector = (directorId, directorData) => {
    return axiosInstance.put(`director/${directorId}`, directorData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const eliminarDirector = (directorId) => {
    return axiosInstance.delete(`director/${directorId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
export {
    getDirectores, crearDirector, actualizarDirector, eliminarDirector
}