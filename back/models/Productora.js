const { Schema, model} = require("mongoose")

const ProductoraSchema = Schema({
    nombre : { type: String, required: true },
    estado: {type: String, requiered: true },
    slogan: {type: String, required: true},
    descripcion: {type: String, required: true },
    fechaCreacion: {type: Date, required: true},
    fechaActualizacion: {type: Date, required: true}
});

module.exports = model("productora", ProductoraSchema);