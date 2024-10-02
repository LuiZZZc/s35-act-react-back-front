import React, { useEffect, useState } from "react";
import { getMedias } from "../../services/mediaService"; // Asegúrate de que la ruta sea correcta
import { MediaCard } from "./MediaCard"; // Asegúrate de que la ruta sea correcta
import { MediaNew } from "./MediaNew"; // Si no lo usas, puedes eliminar esta importación
import Swal from "sweetalert2";

export const MediaView = () => {
  
  const [medias, setMedias ] = useState([]); // Estado para almacenar los medios
  const [openModal, setOpenModal] = useState(false); // Estado para controlar el modal

  // Función para listar los medios
  const listarMedias = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await getMedias(); // Llama a la API usando Axios para obtener los medios
      Swal.close();
      setMedias(data); // Actualiza el estado con los medios
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  // useEffect para cargar los medios al montar el componente
  useEffect(() => {
    listarMedias();
  }, []);

  // Función para abrir/cerrar el modal
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="container">
      {/* Grid de tarjetas de medios */}
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {medias.map((media) => {
          return <MediaCard key={media._id} media={media} />; // Pasa los datos de cada media al componente MediaCard
        })}
      </div>

      {/* Botón para abrir el modal o mostrar el componente MediaNew */}
      {openModal ? (
        <MediaNew 
          handleOpenModal={handleOpenModal} 
          listarMedias={listarMedias} 
        />
      ) : (
        <button type="button" className="btn btn-primary agr" onClick={handleOpenModal}>
          <i className="fa-solid fa-plus"></i> Agregar Media
        </button>
      )}
    </div>
  );
};
