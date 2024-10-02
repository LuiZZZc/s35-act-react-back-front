const { Schema, model} = require("mongoose")

const DirectorSchema = Schema({
    nombre : { type: String, required: true },
    estado: {type: String, requiered: true },
    fechaCreacion: {type: Date, required: true},
    fechaActualizacion: {type: Date, required: true}
});

module.exports = model("director", DirectorSchema);