const { Router } = require("express")
const Tipo = require("../models/Tipo")
const { validationResult, check } = require("express-validator")

const router = Router();

//GET method route 
router.get("/",async function (req, res) {

    try {
        const Tipos = await Tipo.find(); //select * Tipos;
        res.send(Tipos)
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de tipo");
    }
});

//POST method router
router.post("/", [
    check("nombre", "invalid.nombre").not().isEmpty(),
    check("descripcion", "invalid.descripcion").not().isEmpty(),

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipo = new Tipo();
        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaCreacion = new Date();
        tipo.fechaActualizacion = new Date();
    

        tipo = await tipo.save();
        res.send(tipo);
        
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

        const TipoActualizado = await Tipo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Devuelve el tipo actualizado
        );

        if (!TipoActualizado) {
            return res.status(404).json({ mensaje: 'Tipo no encontrado' });
        }

        res.json(TipoActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el tipo', error });
    }
});




//DELETE method route
router.delete("/:id", async (req, res) => {
    try {
        const deletedTipo = await Tipo.findByIdAndDelete(req.params.id);
        if (!deletedTipo) {
            return res.status(404).json({ message: 'Tipo no encontrado' });
        }
        res.json({ message: 'Tipo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el Tipo', error });
    }
});

module.exports = router