import React, { useState, useEffect } from 'react';
import { getTipos, crearTipo, actualizarTipo, eliminarTipo } from '../../services/tipoService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const TipoView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const [tipos, setTipos] = useState([]);
  const { nombre = '', descripcion = '' } = valoresForm;
  const [tipoIdEditar, setTipoIdEditar] = useState(null); // Estado para manejar el ID del tipo a editar

  const listarTipos = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getTipos();
      setTipos(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarTipos();
  },[]);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const handleCrearTipo = async (e) => {
    e.preventDefault();
    try {
        Swal.fire({
            allowOutsideClick: false,
            text: 'Cargando...'
        });
        Swal.showLoading();

        if (tipoIdEditar) {
            // Si `tipoIdEditar` tiene un valor, llamamos a la función de actualización
            await actualizarTipo(tipoIdEditar, valoresForm);
            Swal.fire('Actualizado!', 'El tipo ha sido actualizado correctamente.', 'success');
        } else {
            // Si no hay `tipoIdEditar`, estamos creando un nuevo tipo
            await crearTipo(valoresForm);
            Swal.fire('Creado!', 'El tipo ha sido creado correctamente.', 'success');
        }

        // Limpiar formulario y estado después de guardar
        setValoresForm({ nombre: '', descripcion: '' });
        setTipoIdEditar(null); // Limpiamos el estado para que no siga en modo edición
        Swal.close();
        listarTipos(); // Refrescar la lista de tipos
    } catch (error) {
        console.log(error);
        Swal.close();
    }
};


  const handleactualizarTipo = (tipo) => {
    setValoresForm({ nombre: tipo.nombre, descripcion: tipo.descripcion });
    setTipoIdEditar(tipo._id); // Guardamos el ID del tipo a editar
  };



  const handleEliminarTipo = async (_id) => {
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
          await eliminarTipo(_id); // Llama a la función de eliminación
          Swal.fire('Eliminado!', 'El tipo ha sido eliminado.', 'success');
          listarTipos(); // Actualiza la lista después de eliminar
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire('Error!', 'No se pudo eliminar el tipo.', 'error');
    }
  }

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearTipo(e)} >
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
            <th scope="col">Descripcion</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            tipos.length > 0 && tipos.map((tipo, index) => {
              return (
                <tr key={tipo._id}>
                  <th scope='row'> {index + 1}</th>
                  <td>{tipo.nombre}</td>
                  <td>{tipo.descripcion}</td>
                  <td>{moment(tipo.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                  <td>{moment(tipo.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                  <td>
                    <button 
                      className="btn btn-danger" 
                      onClick={() => handleEliminarTipo(tipo._id)}>
                      Eliminar
                    </button>
                    <button 
                      className="btn btn-warning" 
                      onClick={() => handleactualizarTipo(tipo)}>
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}
