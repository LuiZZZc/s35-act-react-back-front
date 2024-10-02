const { Router } = require("express")
const Genero = require("../models/Genero")
const { validationResult, check } = require("express-validator")

const router = Router();

//GET method route 
router.get("/",async function (req, res) {

    try {
        const Generos = await Genero.find(); //select * Generos;
        res.send(Generos)
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de genero");
    }
});

//POST method router
router.post("/", [
    check("nombre", "invalid.nombre").not().isEmpty(),
    check("estado", "invalid.estado").isIn(["Activo", "Inactivo"]),
    check("descripcion", "invalid.descripcion").not().isEmpty(),

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let genero = new Genero();
        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;
        genero.fechaCreacion = new Date();
        genero.fechaActualizacion = new Date();
    

        genero = await genero.save();
        res.send(genero);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("ocurrio un error")
    }


});

//PUT method route
router.put('/:id', async (req, res) => {
    try {
        // Obtén la fecha actual
        const fechaActual = new Date();

        // Agrega la fecha actual al cuerpo de la solicitud
        req.body.fechaActualizacion = fechaActual;

        const GeneroActualizado = await Genero.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Devuelve el genero actualizado
        );

        if (!GeneroActualizado) {
            return res.status(404).json({ mensaje: 'Genero no encontrado' });
        }

        res.json(GeneroActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el genero', error });
    }
});




//DELETE method route
router.delete("/:id", async (req, res) => {
    try {
        const deletedGenero = await Genero.findByIdAndDelete(req.params.id);
        if (!deletedGenero) {
            return res.status(404).json({ message: 'Genero no encontrado' });
        }
        res.json({ message: 'Genero eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el Genero', error });
    }
});

module.exports = router