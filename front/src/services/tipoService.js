import axios from "axios";
import { axiosInstance } from "../helper/axios-config";

const getTipos = () => {
    return axiosInstance.get('tipo', {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const crearTipo = (data) => {
    return axiosInstance.post('tipo', data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const actualizarTipo = (tipoId, tipoData) => {
    return axiosInstance.put(`tipo/${tipoId}`, tipoData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const eliminarTipo = (tipoId) => {
    return axiosInstance.delete(`tipo/${tipoId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
export {
    getTipos, crearTipo, actualizarTipo, eliminarTipo
}