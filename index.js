const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

//crear el servidor de express

const app = express();

//base de datos
dbConnection();

//CORS
app.use(cors());

//directorio publico
app.use(express.static('public'));

//lecutra y parseo del body
app.use(express.json());

//Rutas
//TODO: auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'));

//productos
app.use('/api/product', require('./routes/product'));

//TODO: CRUD: Eventos
app.use('/api/events', require('./routes/events'));

//homeScreen
app.use('/api/home', require('./routes/home'));

//escuchar peticiones
app.listen(process.env.PORT, () => {
	console.log(`servidor corriendo en ${process.env.PORT}`);
});
