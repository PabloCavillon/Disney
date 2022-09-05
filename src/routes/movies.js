const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');
const { 
    get_peliculas, 
    create_pelicula, 
    editar_pelicula, 
    eliminar_pelicula, 
    relacionar_personajes
} = require('../controller/movies');

const router = Router();

router.use(validarJWT);

router.get('/', 
    [],
    get_peliculas    
);

router.post('/',
    [
        check('titulo', 'El titulo es obligatorio').not().isEmpty(),
        check('fecha_creacion', 'La fecha de estreno de la pelicula es obligatorio').isDate().not().isEmpty(),
        check('calificacion', 'La calificacion es obligatoria y va de 1 a 5').isInt({ min: 1, max: 5 }).not().isEmpty(),
        check('imagen', 'La url de la imagen es obligatoria').isURL().not().isEmpty(),
        check('id_genero', 'El genero de la pelicula es obligatorio').isNumeric().not().isEmpty(),
        validarCampos
    ],
    create_pelicula
);

router.post('/relacionar',
    [
        check('id_pelicula', 'El id de la pelicula es obligatorio para armar la relacion').not().isEmpty(),
        check('id_personaje', 'El id del personaje es obligatorio para armar la relacion').not().isEmpty(),
        validarCampos
    ],
    relacionar_personajes
)

router.put('/', 
    [
        check('id', 'Es obligatorio indicar el id de la pelicula que desea editar').not().isEmpty(),
        validarCampos
    ],
    editar_pelicula
)

router.delete('/', 
    [
        check('id', 'Es obligatorio indicar el id de la pelicula que desea eliminar').not().isEmpty(),
        validarCampos
    ],
    eliminar_pelicula
)

module.exports = router;