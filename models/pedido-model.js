const { Schema, model } = require('mongoose');

const UsuarioSchemaPedido = Schema({
	menu: {
		type: Array,
	},

	fecha: {
		type: String,
		required: true,
		default: new Date().toLocaleString(),
	},

	estado: {
		type: String,
		default: 'pendiente',
	},

	user: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},
});

// usuario
// fecha
// menú
// estado

module.exports = model('Pedido', UsuarioSchemaPedido);
