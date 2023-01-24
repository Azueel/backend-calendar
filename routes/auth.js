const express = require('express');
const {
	crearUsuario,
	loginUsuario,
	revalidarToken,
} = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = express.Router();

router.post(
	'/new',
	[
		check('name', 'el nombre es obligatorio').not().isEmpty(),
		check('email', 'el Email es obligatorio').not().isEmpty(),
		check('password', 'El password debe de ser de 6 caracteres').isLength({
			min: 6,
		}),
		validarCampos,
	],

	crearUsuario
);

router.post(
	'/',
	[
		check('email', 'el Email es obligatorio').not().isEmpty(),
		check('password', 'El password debe de ser de 6 caracteres').isLength({
			min: 6,
		}),
		validarCampos,
	],
	loginUsuario
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
