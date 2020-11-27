const bcrypt = require('bcrypt');
//Mientras mas mayor seguridad :D
const saltRounds = 10;
//requiriendo la conexion para hacer uso de las consultas a la BD
const connection = require('../config/db');

const { sendVerificationCode } = require('./sendEmailController');

const jwt = require('jsonwebtoken');

const { dbErrorCode } = require('../helpers/dbErrors');
const { verifyIsMobile } = require('../helpers/verifyTypePhone');

const saveCustomer = (req, res) => {
    //Desestructuramos el objeto, seria lo mismo que tener; const nombre = req.body.nombre;
    const { nombre, apellido, correo, passwd, telefono } = req.body;
    //Encriptando la contraseña
    bcrypt.hash(passwd, saltRounds).then((passEncrypt) => {
        //Si se resulve correctamente se ejecuta este codigo 

        //Insertando los datos a la BD
        connection.query(`INSERT INTO clientes(nombre, apellido, email, passwd) VALUES('${nombre}', '${apellido}', '${correo}', '${passEncrypt}')`, (err, result) => {
            if (err) {
                //Si se produce un error mandamos un JSON con el error
                return res.status(400).json(dbErrorCode(err));
            }
            const userId = result.insertId;
            let table = '';
            let field = '';
            //Enviamos el codigo de verificacion al correo ingresado por el cliente
            sendVerificationCode(correo, userId);

            if (verifyIsMobile(telefono)) {
                table = 'celulares';
                field = 'celular';
            } else {
                field = 'telefono'
                table = 'telefonos';
            }

            //guardando el telefono
            connection.query(`INSERT INTO ${table}(${field}, idCliente) values('${telefono}','${userId}')`, (err2, result2) => {
                if (err2) {
                    return res.status(500).json({ ok: false, error: err2 });
                }

                const token = jwt.sign({ idCliente: userId, step: 'verify_email' }, process.env.SECRET, { expiresIn: 1000 * 60 * 60 * 24 * 30 });

                //Si los datos se ingresan correctamente mandamos un JSON con los resultados
                return res.json({ ok: true, token, step: 'verify_email' });
            });
        });
    }).catch((err) => {
        //Si se produce un error se ejecuta este codigo
        console.log(err);
    })
}

const verifyCustomerEmail = (req, res) => {
    const { code, idCliente } = req.body;
    console.log(code);
    connection.query(`SELECT verificado from clientes where idCliente='${idCliente}'`, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ ok: false, error: 'Tenemos problemas temporales, intentalo de nuevo en unos minutos' })
        }
        if (result[0].verificado) {
            return res.status(400).json({ ok: false, error: 'Tu cuenta ya esta verificada' });
        }
        connection.query(`SELECT codigo from codigos where idCliente='${idCliente}'`, (err2, result2) => {
            if (err2) {
                console.log('error', err2);
                return res.status(500).json({ ok: false, error: 'Tenemos problemas temporales, intentalo de nuevo en unos minutos' })
            }
            if (result2[0].codigo.toString() === code) {
                connection.query(`UPDATE clientes set verificado='${1}' where idCliente='${idCliente}'`, (error3, result3) => {
                    if (error3) {
                        console.log(error3);
                        return res.status(500).json({ ok: false, error: 'Tenemos problemas temporales, intentalo de nuevo en unos minutos' })
                    }
                    connection.query(`DELETE from codigos where idCliente='${idCliente}'`, (error2, result4) => {
                        if (error2) {
                            console.log(error2)
                            return res.status(500).json({ ok: false, error: 'Tenemos problemas temporales, intentalo de nuevo en unos minutos' })
                        }
                        return res.json({ ok: true, message: 'Cuenta verificada' });
                    })
                })
            } else {
                return res.status(400).json({ ok: false, error: 'Codigo no valido' });
            }

        }); 
    })

}

const getProfile = (req, res) => {
    const { idCliente } = req.body;
    connection.query(`SELECT telefonos.idTelefono, CONCAT(clientes.nombre, ' ',clientes.apellido) as 'nombre', clientes.email, telefonos.telefono from clientes inner join telefonos on clientes.idCliente = telefonos.idCliente where idCliente='${idCliente}'`, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        return res.json({ ok: true, result });
    })
}

const updatePhone = (req, res) => {
    const { idCliente, idTelefono, telefono } = req.body;
    connection.query(`UPDATE telefonos set telefono='${telefono}' where idTelefono='${idTelefono}'`, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        return res.json({ ok: true, message: 'Telefono actualizado correctamente' });
    })
}

const deleteCustomer = (req, res) => {
    const { idCliente } = req.body;
    connection.query(`UPDATE clientes set activo = 0 where idCliente='${idCliente}'`, (error, results) => {
        if(error){
            console.log(error);
            return;
        }
        return res.json({ ok: true, message: 'La cuena ha sido eliminada correctamente' });
    })
};

const getAllCustomers = (req, res) => {
    connection.query(`SELECT clientes.idCliente, clientes.nombre, clientes.apellido, clientes.email, clientes.fechaRegistro, clientes.ultimoInicio, clientes.activo from clientes`, (error, results) => {
        if(error){
            console.log(error);
            return;
        }
        results = results.filter(result => result.activo !== 0);
        return res.json({ ok: true, results });
    })
}

const getInactiveCustomers = (req, res) => {
    connection.query(`SELECT clientes.idCliente, clientes.nombre, clientes.apellido, clientes.email, clientes.fechaRegistro, clientes.ultimoInicio, clientes.activo from clientes`, (error, results) => {
        if(error){
            console.log(error);
            return;
        }
        results = results.filter(result => result.activo !== 1);
        return res.json({ ok: true, results });
    })
}






module.exports = { saveCustomer, deleteCustomer, verifyCustomerEmail, getProfile, updatePhone, getAllCustomers, getInactiveCustomers };