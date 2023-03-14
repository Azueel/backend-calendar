const Pedido = require('../models/pedido-model');
const Producto = require('../models/producto-model');
const Usuario = require('../models/usuario-model');

const crearProducto = async (req, res) => {
	try {
		let producto = new Producto(req.body);
		await producto.save();
	} catch (error) {
		console.log(error);
	}

	res.json({
		msg: 'Producto Creado',
	});
};

const cargarProducto = async (req, res) => {
	try {
		const productos = await Producto.find();

		res.json({
			ok: true,
			productos,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'hable con el administrador',
		});
	}
};

const cargarUsuario = async (req, res) => {
	try {
		const usuarios = await Usuario.find();

		res.json({
			ok: true,
			usuarios,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'hable con el administrador',
		});
	}
};

const editarProducto = async (req, res) => {
	try {
		const productoEditar = await Producto.findById(req.body._id);

		if (!productoEditar) {
			return res.status(404).json({
				ok: false,
				msg: 'evento no existe por este ID',
			});
		}

		const productoActualizado = await Producto.findByIdAndUpdate(
			req.body._id,
			req.body
		);

		res.status(200).json({
			msg: 'true',
			productoActualizado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'fallo',
		});
	}
};

const eliminarProducto = async (req, res) => {
	try {
		const productoEliminar = await Producto.findById(req.params.id);

		if (!productoEliminar) {
			return res.status(404).json({
				ok: false,
				msg: 'evento no existe por este ID',
			});
		}

		await Producto.findByIdAndDelete(req.params.id);

		res.status(200).json({
			msg: 'true',
			res: req.body,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'fallo',
		});
	}
};

const cargarPedidos = async (req, res) => {
	try {
		const pedido = await Pedido.find();

		res.json({
			ok: true,
			pedido,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'hable con el administrador',
		});
	}
};

const confirmarPedido = async (req, res) => {
	try {
		const pedidoConfirmar = await Pedido.findById(req.body._id);

		if (!pedidoConfirmar) {
			return res.status(404).json({
				ok: false,
				msg: 'evento no existe por este ID',
			});
		}

		pedidoConfirmar.estado = 'confirmado';
		await pedidoConfirmar.save();

		res.status(200).json({
			msg: 'true',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'fallo',
		});
	}
};

module.exports = {
	crearProducto,
	cargarProducto,
	cargarUsuario,
	editarProducto,
	eliminarProducto,
	cargarPedidos,
	confirmarPedido,
};
