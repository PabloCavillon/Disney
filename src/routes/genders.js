
const { Router }  = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require('../middlewares/validar-campos');
const { 
    get_genero, 
    create_genero,
    update_genero,
    delete_genero
} = require('../controller/genders');

const router = Router();

router.use(validarJWT);

router.get('/', [], get_genero);

router.post('/', 
    [
        check('nombre', 'El nombre del genero es obligatorio').not().isEmpty(),
        check('imagen', 'La URL de la imagen es obligatoria').isURL().not().isEmpty(),
        validarCampos
    ],
    create_genero
);

router.put('/',
    [
        check('id', 'El id es boligatorio para saber que genero editar').not().isEmpty(),
        validarCampos
    ],
    update_genero
);

router.delete('/',
    [
        check('id', 'El id es obligatorio para saber que genero eliminar').not().isEmpty(),
        validarCampos
    ],
    delete_genero
);

module.exports = router;
