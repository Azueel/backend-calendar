const express = require('express');
const { validarCampos } = require('../middlewares/validarCampos');
const routerAdmin = express.Router();
const { check } = require('express-validator');
const {
	crearProducto,
	cargarProducto,
	cargarUsuario,
	editarProducto,
	eliminarProducto,
	cargarPedidos,
	confirmarPedido,
} = require('../controllers/product');
const { validarJWT } = require('../middlewares/validar-jwt');

routerAdmin.post(
	'/',
	[
		validarJWT,
		check('name', 'el nombre es obligatorio').not().isEmpty(),
		check('price', 'el precio es obligatorio').not().isEmpty(),
		check('quantity', 'la cantidad es obligatoria').not().isEmpty(),
		check('description', 'la descripcion  es obligatoria').not().isEmpty(),
		validarCampos,
	],

	crearProducto
);

routerAdmin.put('/editar', editarProducto);

routerAdmin.delete('/eliminar/:id', eliminarProducto);

routerAdmin.get('/', validarJWT, cargarProducto);

routerAdmin.get('/user', cargarUsuario);

routerAdmin.get('/pedido', cargarPedidos);

routerAdmin.put('/confirmar', confirmarPedido);

module.exports = routerAdmin;
