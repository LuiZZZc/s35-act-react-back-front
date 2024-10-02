const { Schema, model} = require("mongoose")

const MediaSchema = Schema({
    serial: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    sinopsis: {type: String, requiered: true },
    url: {type: String, required: true},
    foto: { type: String, required: true },
    estreno: {type: Date, required: true},
    genero: { type: Schema.Types.ObjectId, ref: "genero", requerid: true },
    director: { type: Schema.Types.ObjectId, ref: "director", requerid: true },
    productora: { type: Schema.Types.ObjectId, ref: "productora", requerid: true },
    tipo: { type: Schema.Types.ObjectId, ref: "tipo", requerid: true },
    fechaCreacion: {type: Date, required: true},
    fechaActualizacion: {type: Date, required: true}
});

module.exports = model("media", MediaSchema);