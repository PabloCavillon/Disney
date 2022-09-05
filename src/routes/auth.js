
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login, register, unsuscribe } = require('../controller/auth');

const router = Router();

router.post('/login', 
    [
        check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
)

router.post('/register', 
    [
        check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('mail', 'El mail no fue enviado o no tiene el formato correcto').isEmail().not().isEmpty(),
        validarCampos
    ],
    register
)

router.delete('/',
    [
        check('username', 'El nombre de usuario es obligatorio para poder eliminarlo').not().isEmpty(),
        validarCampos
    ],
    unsuscribe
)

module.exports = router;