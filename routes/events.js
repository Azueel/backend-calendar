const {
	actualizarEvento,
	crearEventos,
	getEventos,
	eliminarEvento,
} = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { isDate } = require('../helpers/isDate');
const router = Router();

//obtener eventos
router.get('/', validarJWT, getEventos);

//crear un nuevo evento
router.post(
	'/',
	[
		check('title', 'el titulo es obligatorio').not().isEmpty(),
		check('start', 'Fecha de inicio es obligatoria').custom(isDate),
		check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
		validarCampos,
	],
	validarJWT,
	crearEventos
);

//actualizar evento
router.put('/:id', validarJWT, actualizarEvento);

//eleminar evento
router.delete('/:id', validarJWT, eliminarEvento);

module.exports = router;
