const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();


//Express moddlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


//Configuracion de la base de datos
require('./config/db');

//Configuracion de las rutas
app.use('/customer', require('./routes/customer.routes'));
app.use('/address', require('./routes/address.routes'));
app.use('/login', require('./routes/login.routes'));
app.use('/auth', require('./routes/auth.routes'));

//Colocar puerto en escucha 
app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
});