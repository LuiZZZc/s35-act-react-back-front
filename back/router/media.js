const { Router } = require("express");
const Media = require("../models/Media");
const { validationResult, check } = require("express-validator");

const router = Router();

// GET method route 
router.get("/", async function (req, res) {
    try {
        const mediaList = await Media.find(); 
        res.send(mediaList);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de media");
    }
});

// GET method route by ID
router.get("/:id", async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ mensaje: 'Media no encontrada' });
        }
        res.json(media);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al cargar la media', error });
    }
});

// POST method route to create a new media
router.post("/", [
    check("serial", "invalid.serial").not().isEmpty(),
    check("titulo", "invalid.titulo").not().isEmpty(),
    check("sinopsis", "invalid.sinopsis").not().isEmpty(),
    check("url", "invalid.url").not().isEmpty(),
    check("foto", "invalid.foto").not().isEmpty(),
    check("genero", "invalid.genero").not().isEmpty(),
    check("director", "invalid.director").not().isEmpty(),
    check("productora", "invalid.productora").not().isEmpty(),
    check("tipo", "invalid.tipo").not().isEmpty(),
    check("estreno", "invalid.estreno").not().isEmpty(),
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let media = new Media(req.body); // Crea la instancia directamente desde el cuerpo de la solicitud
        media.fechaCreacion = new Date();
        media.fechaActualizacion = new Date();
    
        media = await media.save();
        res.status(201).send(media); // Devuelve un estado 201 para creación exitosa
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrió un error");
    }
});

// PUT method route to update an existing media
router.put('/:id', async (req, res) => {
    try {
        const fechaActual = new Date();
        req.body.fechaActualizacion = fechaActual;

        const mediaActualizado = await Media.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } 
        );

        if (!mediaActualizado) {
            return res.status(404).json({ mensaje: 'Media no encontrado' });
        }

        res.json(mediaActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar el media', error });
    }
});

// DELETE method route
router.delete("/:id", async (req, res) => {
    try {
        const deletedMedia = await Media.findByIdAndDelete(req.params.id);
        if (!deletedMedia) {
            return res.status(404).json({ message: 'Media no encontrada' });
        }
        res.json({ message: 'Media eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la Media', error });
    }
});

module.exports = router;
