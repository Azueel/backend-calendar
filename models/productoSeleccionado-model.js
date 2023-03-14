const { Schema, model } = require('mongoose');

const UsuarioSchemaSeleccion = Schema({
	name: {
		type: String,
		required: true,
	},

	price: {
		type: String,
		required: true,
	},

	quantity: {
		type: String,
		required: true,
	},

	description: {
		type: String,
		required: true,
	},

	user: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},
});

module.exports = model('ProductoUsuario', UsuarioSchemaSeleccion);
