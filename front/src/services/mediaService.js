import { axiosInstance } from "../helper/axios-config";

const getMedias = () => {
    return axiosInstance.get('media', {
        headers: {  
            'Content-Type': 'application/json'
        }
    });
}

const getMediaPorId = (mediaId) => {
    return axiosInstance.get(`media/${mediaId}`, {  
        headers: {  
            'Content-Type': 'application/json'
        }
    });
}

const crearMedia = (data) => {
    return axiosInstance.post('media', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const actualizarMedia = (mediaId, mediaData) => {
    return axiosInstance.put(`media/${mediaId}`, mediaData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const eliminarMedia = (mediaId) => {
    return axiosInstance.delete(`media/${mediaId}`, {
        headers: {  
            'Content-Type': 'application/json'
        }
    });
}

export {
    getMedias, getMediaPorId, crearMedia, actualizarMedia, eliminarMedia
}
 