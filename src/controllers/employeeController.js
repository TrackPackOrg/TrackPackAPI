const connection = require('../config/db');
const bcrypt = require('bcrypt');

//==========================PRUEBA=======================//
const validUsername = (req, res) => {
    const { userName } = req.query;
    if (userName === undefined || userName === '') {
        return res.status(400).json({ ok: false, error: 'Se necesita un nombre de usuario para continuar' });
    }

    connection.query(`SELECT userLogin from empleados`, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        for (let result of results) {
            if (result.userLogin === userName) {
                return res.status(400).json({ ok: false, error: 'Nombre de usuario ya registrado' });
            }
        }
        return res.json({ ok: true, message: 'Nombre de usuario valido' });
    });
};

//==========================================================//

const getEmployeeProfile = (req, res) => {
    const { idEmpleado } = req.body;
    connection.query(`SELECT nombre, apellido from empleados where idEmpleado='${idEmpleado}'`, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        return res.json({ ok: true, results: results[0] });
    })
}

const getEmployees = (req, res) => {
    const { idEmpleado } = req.body;
    connection.query(`SELECT * from empleados`, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        results = results.filter(employee => employee.idEmpleado !== idEmpleado);
        return res.json({ ok: true, results });
    });
}

const saveEmployee = (req, res) => {
    const { nombre, apellido, userLogin, passwd } = req.body;
    let passwdHash = bcrypt.hashSync(passwd, 10);
    connection.query(`INSERT INTO empleados(nombre, apellido, userLogin, passwd) VALUES('${nombre}', '${apellido}', '${userLogin}', '${passwdHash}')`, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        return res.json({ ok: true, message: 'Empleado registrado satisfactoriamente' });
    })
}



module.exports = { validUsername, getEmployeeProfile, getEmployees, saveEmployee };