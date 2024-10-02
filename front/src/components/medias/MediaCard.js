import React from 'react';
import { Link } from 'react-router-dom';

export const MediaCard = (props) => {
    const { media } = props;

    // Verificar si media está definido
    if (!media) {
        return <div>Cargando...</div>; // O cualquier otro mensaje o componente de carga
    }

    return (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4"> {/* Ajustar el tamaño aquí */}
            <div className="card h-100"> {/* Usar h-100 para igualar alturas de las tarjetas */}
                <img src={media.foto} className="card-img-top" alt={media.titulo || "Imagen del medio"} />
                <div className="card-body">
                    <h5 className="card-title">Características</h5>
                    <hr />
                    <p className="card-text">{`Serial: ${media.serial}`}</p>
                    <p className="card-text">{`Titulo: ${media.titulo}`}</p>
                    <p className="card-text">{`Sinopsis: ${media.sinopsis}`}</p>
                    <p className="card-text">{`Estreno: ${media.estreno}`}</p>
                    <p className="card-text">
                        <Link to={`media/${media._id}`}>Ver más...</Link> 
                    </p>

                </div>
            </div>
        </div>
    );
};
