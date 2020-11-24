const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const app = express();


//Express moddlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Rate limit config
const limiter = rateLimit({
    windowMs: 1000 * 60, //1 Minute, 
    max: 3, //maximo 3 peticiones en 1 minuto
    message: 'Has superado el numero de intentos, por favor espera 1 minuto para continuar',
    handler: (req, res) => {
        res.status(403).json({ ok: false, error: 'Numero de intentos superados, por favor vuelva a iniciar sesion en 1 minuto' });
    }
});

app.use('/login', limiter);
app.use('/login/employee', limiter);


//Configuracion de la base de datos
require('./config/db');

//Configuracion de las rutas
app.use('/customer', require('./routes/customer.routes'));
app.use('/address', require('./routes/address.routes'));
app.use('/login', require('./routes/login.routes'));
app.use('/auth', require('./routes/auth.routes'));
app.use('/load', require('./routes/loads.routes'));
app.use('/package', require('./routes/package.routes'));
app.use('/employee', require('./routes/employee.routes'));

//Colocar puerto en escucha 
app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
});