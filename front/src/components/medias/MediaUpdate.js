import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Obtener el mediaId desde la URL
import { getDirectores } from '../../services/directorService';
import { getGeneros } from '../../services/generoService';
import { getTipos } from '../../services/tipoService';
import { getProductoras } from '../../services/productoraService';
import { actualizarMedia, getMediaPorId, eliminarMedia } from '../../services/mediaService';
import Swal from 'sweetalert2';

export const MediaUpdate = () => { 
    const { mediaId } = useParams();
    console.log("Media ID:", mediaId); // Verificar el valor

    const [directores, setDirectores] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [valoresForm, setValoresForm] = useState({});

    // Desestructurar el estado
    const { 
        serial = '', 
        titulo = '', 
        sinopsis = '', 
        url = '', 
        foto = '', 
        estreno = '', 
        director, 
        genero, 
        tipo, 
        productora,
        fechaCreacion = '', // Agrega fechaCreacion
        fechaActualizacion = '' // Agrega fechaActualizacion
    } = valoresForm;

    // Cargar directores, géneros, tipos, y productoras
    useEffect(() => {
        listarDirectores();
        listarGeneros();
        listarTipos();
        listarProductoras();
    
        const cargarMedia = async () => {
            try {
                const mediaData = await getMediaPorId(mediaId);
                console.log("Datos cargados:", mediaData.data); 
                setValoresForm(mediaData.data);
            } catch (error) {
                console.error("Error al cargar mediaId:", error);
            }
        };
        
        if (mediaId) {
            cargarMedia();
        }
        
    }, [mediaId]);

    const listarDirectores = async () => {
        try {
            const { data } = await getDirectores();
            setDirectores(data);
        } catch (error) {
            console.log(error);
        }
    };

    const listarGeneros = async () => {
        try {
            const { data } = await getGeneros();
            setGeneros(data);
        } catch (error) {
            console.log(error);
        }
    };

    const listarTipos = async () => {
        try {
            const { data } = await getTipos();
            setTipos(data);
        } catch (error) {
            console.log(error);
        }
    };

    const listarProductoras = async () => {
        try {
            const { data } = await getProductoras();
            setProductoras(data);
        } catch (error) {
            console.log(error);
        }
    };

    // Manejar los cambios en el formulario
    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    };

    // Manejar el envío del formulario
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const updatedMedia = {
            serial, 
            titulo, 
            sinopsis, 
            url, 
            foto,
            estreno,
            director, 
            genero,
            tipo,
            productora
        };

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            await actualizarMedia(mediaId, updatedMedia);
            Swal.close();
        } catch (error) {
            console.error("Error al actualizar la mediaId:", error);
            Swal.close();
        }
    };

    const handleEliminarMedia = async (_id) => {
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
                    await eliminarMedia(_id);
                    Swal.fire('Eliminado!', 'El tipo ha sido eliminado.', 'success');
                    listarTipos();
                }
            });
        } catch (error) {
            console.log(error);
            Swal.fire('Error!', 'No se pudo eliminar el tipo.', 'error');
        }
    };

    return (
        <div className='sidebar'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-4'>
                        <div className='mb-3'>
                            <img src={foto} alt={titulo} className='img-fluid' />
                        </div>
                    </div>
                    <div className='col-8'>
                        <div className='sidebar-header'>
                            <h3>Actualizar Media</h3>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <hr />
                            </div>
                        </div>

                        <form onSubmit={handleOnSubmit}>
                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Serial</label>
                                        <input type="text" name='serial'
                                            value={serial}
                                            onChange={handleOnChange}
                                            required
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Título</label>
                                        <input type="text" name='titulo'
                                            value={titulo}
                                            onChange={handleOnChange}
                                            required
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Sinopsis</label>
                                        <input type="text" name='sinopsis'
                                            value={sinopsis}
                                            onChange={handleOnChange}
                                            required
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">URL</label>
                                        <input type="text" name='url'
                                            value={url}
                                            onChange={handleOnChange}
                                            required
                                            className='form-control' />
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Foto</label>
                                        <input type="text" name='foto'
                                            value={foto}
                                            onChange={handleOnChange}
                                            required
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Fecha de Estreno</label>
                                        <input type="date" name='estreno'
                                            value={estreno}
                                            onChange={handleOnChange}
                                            required
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Director</label>
                                        <select className='form-select'
                                            required
                                            name='director'
                                            value={director}
                                            onChange={handleOnChange}>
                                            <option value="">--SELECCIONE--</option>
                                            {directores.map(({ _id, nombre }) => {
                                                return <option key={_id} value={_id}>{nombre}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Género</label>
                                        <select className='form-select'
                                            required
                                            name='genero'
                                            value={genero}
                                            onChange={handleOnChange}>
                                            <option value="">--SELECCIONE--</option>
                                            {generos.map(({ _id, nombre }) => {
                                                return <option key={_id} value={_id}>{nombre}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Tipo</label>
                                        <select className='form-select'
                                            required
                                            name='tipo'
                                            value={tipo}
                                            onChange={handleOnChange}>
                                            <option value="">--SELECCIONE--</option>
                                            {tipos.map(({ _id, nombre }) => {
                                                return <option key={_id} value={_id}>{nombre}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Productora</label>
                                        <select className='form-select'
                                            required
                                            name='productora'
                                            value={productora}
                                            onChange={handleOnChange}>
                                            <option value="">--SELECCIONE--</option>
                                            {productoras.map(({ _id, nombre }) => {
                                                return <option key={_id} value={_id}>{nombre}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Mostrar las fechas de creación y edición */}
                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Fecha de Creación</label>
                                        <input type="text" 
                                            value={fechaCreacion} 
                                            readOnly 
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Fecha de Edición</label>
                                        <input type="text" 
                                            value={fechaActualizacion} 
                                            readOnly 
                                            className='form-control' />
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <button className='btn btn-primary'>Guardar</button>
                                </div>
                                <div className='col'>
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => handleEliminarMedia(mediaId)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
