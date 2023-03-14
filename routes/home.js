const express = require('express');
const { validarCampos } = require('../middlewares/validarCampos');
const routerHome = express.Router();
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
	pedidoProducto,
	cargarProductoSeleccionado,
	sacarPedido,
	productoPendiente,
	guardarPedido,
	eliminarPedidos,
} = require('../controllers/home');

routerHome.post(
	'/',
	[
		validarJWT,
		check('name', 'el nombre es obligatorio').not().isEmpty(),
		check('price', 'el precio es obligatorio').not().isEmpty(),
		check('quantity', 'la cantidad es obligatoria').not().isEmpty(),
		check('description', 'la descripcion  es obligatoria').not().isEmpty(),
		validarCampos,
	],

	pedidoProducto
);

routerHome.get(
	'/',
	validarJWT,

	cargarProductoSeleccionado
);

routerHome.delete('/:id', validarJWT, sacarPedido);

routerHome.post('/pedido', validarJWT, guardarPedido);
routerHome.delete('/eliminar/:id', eliminarPedidos);

module.exports = routerHome;
