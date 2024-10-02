const { Schema, model} = require("mongoose")

const TipoSchema = Schema({
    nombre: { type: String, required: true },
    descripcion: {type: String, requiered: true },
    fechaCreacion: {type: Date, required: true},
    fechaActualizacion: {type: Date, required: true}
});

module.exports = model("tipo", TipoSchema);