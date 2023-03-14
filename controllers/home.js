const ProductoUsuario = require('../models/productoSeleccionado-model');

const Pedido = require('../models/pedido-model');

const pedidoProducto = async (req, res) => {
	const productoSeleccionado = new ProductoUsuario(req.body);

	console.log(productoSeleccionado);

	try {
		productoSeleccionado.user = req.id;
		const productoSeleccionadoGuardado = await productoSeleccionado.save();

		res.json({
			ok: true,
			productoSeleccionadoGuardado,
		});
	} catch (error) {
		console.log(error);
	}
};

const cargarProductoSeleccionado = async (req, res) => {
	const id = req.id;
	try {
		const cargarProducto = await ProductoUsuario.find({ user: id });

		res.json({
			ok: true,
			cargarProducto,
		});
	} catch (error) {
		console.log(error);
	}
};

const sacarPedido = async (req, res) => {
	const { id } = req.params;
	try {
		const pedidoEliminar = await ProductoUsuario.findOne({ id });

		if (!pedidoEliminar) {
			return res.status(404).json({
				ok: false,
				msg: 'evento no existe por este ID',
			});
		}

		await ProductoUsuario.findByIdAndDelete(req.params.id);

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

const guardarPedido = async (req, res) => {
	try {
		let pedido = new Pedido(req.body);

		pedido.user = req.id;
		pedido.menu = req.body.menu;

		console.log(pedido);

		const productoguardado = await pedido.save();
		res.json({
			msg: 'hol',
			productoguardado,
		});
	} catch (error) {
		console.log(error);
	}
};

const eliminarPedidos = async (req, res) => {
	const { id } = req.params;

	try {
		const pedidoEliminar = await ProductoUsuario.find({ id });

		if (!pedidoEliminar) {
			return res.status(404).json({
				ok: false,
				msg: 'evento no existe por este ID',
			});
		}

		await ProductoUsuario.deleteMany({ user: req.params.id });

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

module.exports = {
	pedidoProducto,
	cargarProductoSeleccionado,
	sacarPedido,
	guardarPedido,
	eliminarPedidos,
};
