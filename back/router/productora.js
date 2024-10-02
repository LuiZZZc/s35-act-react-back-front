const { Router } = require("express")
const Productora = require("../models/Productora")
const { validationResult, check } = require("express-validator")

const router = Router();

//GET method route 
router.get("/",async function (req, res) {

    try {
        const Productoras = await Productora.find(); //select * Productora;
        res.send(Productoras)
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de productora");
    }
});

//POST method router
router.post("/", [
    check("nombre", "invalid.nombre").not().isEmpty(),
    check("estado", "invalid.estado").isIn(["Activo", "Inactivo"]),
    check("slogan", "invalid.slogan").not().isEmpty(),
    check("descripcion", "invalid.descripcion").not().isEmpty(),

], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let productora = new Productora();
        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.slogan = req.body.slogan;
        productora.descripcion = req.body.descripcion;
        productora.fechaCreacion = new Date();
        productora.fechaActualizacion = new Date();
    

        productora = await productora.save();
        res.send(productora);
        
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

        const ProductoraActualizado = await Productora.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Devuelve el productora actualizado
        );

        if (!ProductoraActualizado) {
            return res.status(404).json({ mensaje: 'Productora no encontrado' });
        }

        res.json(ProductoraActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el productora', error });
    }
});




//DELETE method route
router.delete("/:id", async (req, res) => {
    try {
        const deletedProductora = await Productora.findByIdAndDelete(req.params.id);
        if (!deletedProductora) {
            return res.status(404).json({ message: 'Productora no encontrada' });
        }
        res.json({ message: 'Productora eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la Productora', error });
    }
});

module.exports = router