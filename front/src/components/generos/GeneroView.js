import React, { useState, useEffect } from 'react';
import { getGeneros, crearGenero, actualizarGenero, eliminarGenero } from '../../services/generoService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const GeneroView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const [generos, setGeneros] = useState([]);
  const { nombre = '', estado = '', descripcion = "" } = valoresForm;
  const [tipoIdEditar, setGeneroIdEditar] = useState(null); // Estado para manejar el ID del genero a editar

  const listarGeneros = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getGeneros();
      setGeneros(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarGeneros();
  },[]);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const handleCrearGenero = async (e) => {
    e.preventDefault();
    try {
        Swal.fire({
            allowOutsideClick: false,
            text: 'Cargando...'
        });
        Swal.showLoading();

        if (tipoIdEditar) {
            // Si `tipoIdEditar` tiene un valor, llamamos a la función de actualización
            await actualizarGenero(tipoIdEditar, valoresForm);
            Swal.fire('Actualizado!', 'El genero ha sido actualizado correctamente.', 'success');
        } else {
            // Si no hay `tipoIdEditar`, estamos creando un nuevo genero
            await crearGenero(valoresForm);
            Swal.fire('Creado!', 'El genero ha sido creado correctamente.', 'success');
        }

        // Limpiar formulario y estado después de guardar
        setValoresForm({ nombre: '', descripcion: '' });
        setGeneroIdEditar(null); // Limpiamos el estado para que no siga en modo edición
        Swal.close();
        listarGeneros(); // Refrescar la lista de Generos
    } catch (error) {
        console.log(error);
        Swal.close();
    }
};


  const handleactualizarGenero = (genero) => {
    setValoresForm({ nombre: genero.nombre, descripcion: genero.descripcion });
    setGeneroIdEditar(genero._id); // Guardamos el ID del genero a editar
  };



  const handleEliminarGenero = async (_id) => {
    try {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás recuperar este genero después de eliminarlo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await eliminarGenero(_id); // Llama a la función de eliminación
          Swal.fire('Eliminado!', 'El genero ha sido eliminado.', 'success');
          listarGeneros(); // Actualiza la lista después de eliminar
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire('Error!', 'No se pudo eliminar el genero.', 'error');
    }
  }

return (
    <div className='container-fluid'>
    <form onSubmit={(e) => handleCrearGenero(e)} >
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
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label">Descripcion</label>
            <input required name='descripcion' value={descripcion} type="text" className="form-control"
              onChange={(e) => handleOnChange(e)} />
          </div>
        </div>
      </div>
      <button className="btn btn-primary">Guardar</button>
      <br />
      <br />
    </form>

    <table className="table">
      <thead>
        <tr>
          <th scope='row'>#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Estado</th>
          <th scope="col">Descripcion</th>
          <th scope='col'>Fecha Creación</th>
          <th scope='col'>Fecha Actualización</th>
          <th scope='col'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          generos.length > 0 && generos.map((genero, index) => {
            return <tr>
              <th scope='row'> {index + 1}</th>
              <td>{genero.nombre}</td>
              <td>{genero.estado}</td>
              <td>{genero.descripcion}</td>
              <td>{moment(genero.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(genero.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>
                    <button 
                      className="btn btn-danger" 
                      onClick={() => handleEliminarGenero(genero._id)}>
                      Eliminar
                    </button>
                    <button 
                      className="btn btn-warning" 
                      onClick={() => handleactualizarGenero(genero)}>
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
