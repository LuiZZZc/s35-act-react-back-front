import React, { useState, useEffect } from 'react';
import { getProductoras, crearProductora, actualizarProductora, eliminarProductora } from '../../services/productoraService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const ProductoraView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const [productoras, setProductoras] = useState([]);
  const { nombre = '', descripcion = '', estado = '', slogan = '' } = valoresForm;
  const [productoraIdEditar, setProductoraIdEditar] = useState(null); // Estado para manejar el ID del productora a editar

  const listarProductora = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getProductoras();
      setProductoras(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarProductora();
  },[]);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const handleCrearproductora = async (e) => {
    e.preventDefault();
    try {
        Swal.fire({
            allowOutsideClick: false,
            text: 'Cargando...'
        });
        Swal.showLoading();

        if (productoraIdEditar) {
            // Si `productoraIdEditar` tiene un valor, llamamos a la función de actualización
            await actualizarProductora(productoraIdEditar, valoresForm);
            Swal.fire('Actualizado!', 'La productora ha sido actualizada correctamente.', 'success');
        } else {
            // Si no hay `productoraIdEditar`, estamos creando un nuevo productora
            await crearProductora(valoresForm);
            Swal.fire('Creado!', 'La productora ha sido creada correctamente.', 'success');
        }

        // Limpiar formulario y estado después de guardar
        setValoresForm({ nombre: '', descripcion: '' });
        setProductoraIdEditar(null); // Limpiamos el estado para que no siga en modo edición
        Swal.close();
        listarProductora(); // Refrescar la lista de productoras
    } catch (error) {
        console.log(error);
        Swal.close();
    }
};


  const handleactualizarProductora = (productora) => {
    setValoresForm({ nombre: productora.nombre, descripcion: productora.descripcion, estado: productora.estado, slogan: productora.slogan });
    setProductoraIdEditar(productora._id); // Guardamos el ID del productora a editar
  };



  const handleEliminarProductora = async (_id) => {
    try {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás recuperar estea productora después de eliminarlo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await eliminarProductora(_id); // Llama a la función de eliminación
          Swal.fire('Eliminado!', 'La productora ha sido eliminado.', 'success');
          listarProductora(); // Actualiza la lista después de eliminar
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire('Error!', 'No se pudo eliminar el productora.', 'error');
    }
  }

return (
    <div className='container-fluid'>
    <form onSubmit={(e) => handleCrearproductora(e)} >
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
        <div className="col-lg-4">
          <div className="mb-3">
            <label className="form-label">Slogan</label>
            <input required name='slogan' value={slogan} type="text" className="form-control"
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
          <th scope="col">Slogan</th>
          <th scope='col'>Fecha Creación</th>
          <th scope='col'>Fecha Actualización</th>
          <th scope='col'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          productoras.length > 0 && productoras.map((productora, index) => {
            return <tr>
              <th scope='row'> {index + 1}</th>
              <td>{productora.nombre}</td>
              <td>{productora.estado}</td>
              <td>{productora.descripcion}</td>
              <td>{productora.slogan}</td>
              <td>{moment(productora.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(productora.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>
                    <button 
                      className="btn btn-danger" 
                      onClick={() => handleEliminarProductora(productora._id)}>
                      Eliminar
                    </button>
                    <button 
                      className="btn btn-warning" 
                      onClick={() => handleactualizarProductora(productora)}>
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
