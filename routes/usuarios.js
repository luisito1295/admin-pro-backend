/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');

//Middleware
const { validarCampos } = require('../middlewares/validar-campos');

//Controlador
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');

//Validar token
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Rutas
router.get( '/', validarJWT , getUsuarios );

router.post( '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuario 
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
);

router.delete( '/:id',
    validarJWT,
    borrarUsuario
);



module.exports = router;