const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');
const { 
    get_personajes, 
    create_personaje,
    editar_personaje,
    delete_personaje,
} = require('../controller/characters');

const router = Router(); 

router.use(validarJWT);

router.get('/', get_personajes);

// Crear un Personaje
router.post('/',
    [
        check('nombre', 'El nombre del personaje es obligatorio').not().isEmpty(),
        check('edad', 'La edad del personaje es obligatoria y debe ser mayor a "0"').isInt({min:0}).not().isEmpty(),
        check('peso', 'El peso del personaje es obligatorio y debe ser mayor a "0"').isFloat({min:0}).not().isEmpty(),
        check('historia', 'Debe ingresar la historia del personaje').not().isEmpty(),
        check('imagen', 'Debe ingresar la url de la imagen').isURL().not().isEmpty(),
        validarCampos
    ],
    create_personaje
)

// Editar personaje segun nombre
router.put('/',
    [
        check('id', 'Debe ingresar el id del personaje a editar').not().isEmpty(),
        validarCampos
    ],
    editar_personaje
)

// Eliminar personaje segun nombre
router.delete('/', 
    [
        check('id', 'Debe ingresar el id del personaje a eliminar').not().isEmpty(),
        validarCampos
    ],
    delete_personaje
);

module.exports = router;