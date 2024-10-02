import React, { useState, useEffect } from 'react';
import { getDirectores, crearDirector, actualizarDirector, eliminarDirector } from '../../services/directorService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const DirectorView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const [directores, setDirectores] = useState([]);
  const { nombre = '', estado = '' } = valoresForm;
  const [tipoIdEditar, setDirectorIdEditar] = useState(null); // Estado para manejar el ID del tipo a editar

  const listarDirectores = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getDirectores();
      setDirectores(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarDirectores();
  },[]);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const handleCrearDirector = async (e) => {
    e.preventDefault();
    try {
        Swal.fire({
            allowOutsideClick: false,
            text: 'Cargando...'
        });
        Swal.showLoading();

        if (tipoIdEditar) {
            // Si `tipoIdEditar` tiene un valor, llamamos a la función de actualización
            await actualizarDirector(tipoIdEditar, valoresForm);
            Swal.fire('Actualizado!', 'El tipo ha sido actualizado correctamente.', 'success');
        } else {
            // Si no hay `tipoIdEditar`, estamos creando un nuevo tipo
            await crearDirector(valoresForm);
            Swal.fire('Creado!', 'El tipo ha sido creado correctamente.', 'success');
        }

        // Limpiar formulario y estado después de guardar
        setValoresForm({ nombre: '', descripcion: '' });
        setDirectorIdEditar(null); // Limpiamos el estado para que no siga en modo edición
        Swal.close();
        listarDirectores(); // Refrescar la lista de Directores
    } catch (error) {
        console.log(error);
        Swal.close();
    }
};


  const handleactualizarDirector = (tipo) => {
    setValoresForm({ nombre: tipo.nombre, estado: tipo.estado });
    setDirectorIdEditar(tipo._id); // Guardamos el ID del tipo a editar
  };



  const handleEliminarDirector = async (_id) => {
    try {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás recuperar este tipo después de eliminarlo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await eliminarDirector(_id); // Llama a la función de eliminación
          Swal.fire('Eliminado!', 'El tipo ha sido eliminado.', 'success');
          listarDirectores(); // Actualiza la lista después de eliminar
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire('Error!', 'No se pudo eliminar el tipo.', 'error');
    }
  }
  return (
    <div className='container-fluid'>
    <form onSubmit={(e) => handleCrearDirector(e)} >
      <div className="row">
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input required name='nombre' value={nombre} type="text" className="form-control"
              onChange={(e) => handleOnChange(e)} />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label">Estado</label>
            <select required name='estado' value={estado} className="form-select" onChange={(e) => handleOnChange(e)} >
              <option selected>--SELECCIONE--</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
        </div>
      </div>
      <button className="btn btn-primary">Guardar</button>
    </form>

    <table className="table">
      <thead>
        <tr>
          <th scope='row'>#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Estado</th>
          <th scope='col'>Fecha Creación</th>
          <th scope='col'>Fecha Actualización</th>
          <th scope='col'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          directores.length > 0 && directores.map((director, index) => {
            return <tr>
              <th scope='row'> {index + 1}</th>
              <td>{director.nombre}</td>
              <td>{director.estado}</td>
              <td>{moment(director.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(director.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>
                    <button 
                      className="btn btn-danger" 
                      onClick={() => handleEliminarDirector(director._id)}>
                      Eliminar
                    </button>
                    <button 
                      className="btn btn-warning" 
                      onClick={() => handleactualizarDirector(director)}>
                      Editar
                    </button>
                  </td>
            </tr>
          })
        }
      </tbody>
    </table>
  </div>
  )
}
