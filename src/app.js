const express = require('express');
const cors = require('cors');

const app = express();

//Express moddlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


//Configuracion de la base de datos
require('./config/db');

//Importandoa variables globales
require('./config/variables');


//Configuracion de las rutas
app.use('/customer', require('./routes/customer.routes'));
app.use('/address', require('./routes/address.routes'));


//Colocar puerto en escucha
app.listen('3000', () => {
    console.log('Escuchando el puerto 3000');
});




// function nombre(){
//     return 'Angel';
// }

// let nombreFuncion =  () => 'Angel';

// app.get('/msg', (req, res) => {
//     return res.send('Hola mundo');
// });