const { Router } = require("express")
const Director = require("../models/Director")
const { validationResult, check } = require("express-validator")

const router = Router();

//GET method route 
router.get("/",async function (req, res) {

    try {
        const Directors = await Director.find(); //select * Directors;
        res.send(Directors)
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de director");
    }
});

//POST method router
router.post("/", [
    check("nombre", "invalid.nombre").not().isEmpty(),
    check("estado", "invalid.estado").isIn(["Activo", "Inactivo"]),


], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let director = new Director();
        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaCreacion = new Date();
        director.fechaActualizacion = new Date();
    

        director = await director.save();
        res.send(director);
        
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

        const DirectorActualizado = await Director.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Devuelve el director actualizado
        );

        if (!DirectorActualizado) {
            return res.status(404).json({ mensaje: 'Director no encontrado' });
        }

        res.json(DirectorActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el director', error });
    }
});




//DELETE method route
router.delete("/:id", async (req, res) => {
    try {
        const deletedDirector = await Director.findByIdAndDelete(req.params.id);
        if (!deletedDirector) {
            return res.status(404).json({ message: 'Director no encontrado' });
        }
        res.json({ message: 'Director eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el Director', error });
    }
});

module.exports = router