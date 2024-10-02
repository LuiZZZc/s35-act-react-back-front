import { axiosInstance } from "../helper/axios-config";

const getProductoras = () => {
    return axiosInstance.get('productora', {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const crearProductora = (data) => {
    return axiosInstance.post('productora', data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const actualizarProductora = (productoraId, productoraData) => {
    return axiosInstance.put(`productora/${productoraId}`, productoraData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const eliminarProductora = (productoraId) => {
    return axiosInstance.delete(`productora/${productoraId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getProductoras, crearProductora, actualizarProductora, eliminarProductora
}