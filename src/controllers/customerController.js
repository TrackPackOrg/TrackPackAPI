const bcrypt = require('bcrypt');
//Mientras mas mayor seguridad :D
const saltRounds = 10;
//requiriendo la conexion para hacer uso de las consultas a la BD
const connection = require('../config/db');

const { sendVerificationCode } = require('./sendEmailController');

const saveCustomer = (req, res) => {
    //Desestructuramos el objeto, seria lo mismo que tener; const nombre = req.body.nombre;
    const { nombre, apellido, correo, passwd } = req.body;
    //Encriptando la contraseña
    bcrypt.hash(passwd, saltRounds).then((passEncrypt) => {
        //Si se resulve correctamente se ejecuta este codigo

        //Insertando los datos a la BD
        connection.query(`INSERT INTO clientes(nombre, apellido, email, passwd) VALUES('${nombre}', '${apellido}', '${correo}', '${passEncrypt}')`, (err, result) => {
            if (err) {
                //Si se produce un error mandamos un JSON con el error
                return res.status(503).json({ ok: false, error: err });
            }
            //Enviamos el codigo de verificacion al correo ingresado por el cliente
            sendVerificationCode(correo, result.insertId);

            //Si los datos se ingresan correctamente mandamos un JSON con los resultados
            return res.json({ ok: true, message: result });
        });
    }).catch((err) => {
        //Si se produce un error se ejecuta este codigo
        console.log(err);
    })
}

const deleteCustomer = (req, res) => {

};

module.exports = { saveCustomer, deleteCustomer };