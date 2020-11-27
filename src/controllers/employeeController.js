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
        results = results.filter(employee => employee.idEmpleado !== idEmpleado && employee.userLogin!== 'admin' && employee.activo === 1);
        return res.json({ ok: true, results });
    });
}

const saveEmployee = (req, res) => {
    const { nombre, apellido, userLogin, passwd } = req.body;
    const passwdHash = bcrypt.hashSync(passwd, 10);
    connection.query(`INSERT INTO empleados(nombre, apellido, userLogin, passwd) VALUES('${nombre}', '${apellido}', '${userLogin}', '${passwdHash}')`, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        return res.json({ ok: true, message: 'Empleado registrado satisfactoriamente' });
    })
}

const verifyPassword = (req, res) => {
    const { idEmpleado, passwd } = req.body;
    if(passwd === undefined || passwd === ''){
        return res.status(400).json({ ok: false, error: 'Acceso denegado, se requiere su contraseña' })
    }
    connection.query(`SELECT passwd from empleados where idEmpleado='${idEmpleado}'`, (error, results) => {
        if(error){
            console.log(error);
            return
        }
        console.log(results)
        const passwdHash = results[0].passwd;
        if(bcrypt.compareSync(passwd, passwdHash)){
            return res.json({ ok: true, message: 'Contraseña verificada' });
        }else{
            return res.status(401).json({ ok: false, error: 'La contraseña es erronea' });
        }
    })
}

const deleteEmployee = (req, res) => {
    const { idEmpleado } = req.query;
    console.log(idEmpleado);
    if(idEmpleado === undefined || idEmpleado === ''){
        return res.status(400).json({ ok: false, error: 'El empleado no se ha encontrado' });
    }
    connection.query(`UPDATE empleados set activo=0 where idEmpleado='${idEmpleado}'`, (error, results) => {
        if(error){
            console.log(error);
            return;
        }
        return res.json({ ok: true, message: 'Empleado eliminado correctamente' });
    })
}

const deleteCustomer = (req, res) => {
    const { idCliente } = req.query;
    console.log(idCliente);
    if(idCliente === undefined || idCliente === ''){
        return res.status(400).json({ ok: false, error: 'Error al eliminar, el cliente no ha sido detectado' });
    }

    connection.query(`UPDATE clientes set activo=0 where idCliente='${idCliente}'`, (error, results) => {
        if(error){
            return res.status(500).json({ ok: false, error })
        }
        return res.json({ ok: true, message: 'El cliente ha sido eliminado satisfactoriamente' });
    })
}

const reactiveCustomer = (req, res) => {
    const { idCliente } = req.body;
    connection.query(`UPDATE clientes set activo=1 where idCliente='${idCliente}'`, (error, results) => {
        if(error){
            return res.status(400).json({ ok: false, error });
        }
        return res.json({ ok: true, message: 'Cuenta recativada satisfactoriamente' });
    })
}

const passwordChange = (req, res) => {
    const { passwd, idCliente } = req.body;
    const passwdHash = bcrypt.hashSync(passwd, 10);

    connection.query(`UPDATE clientes set passwd='${passwdHash}' where idCliente='${idCliente}'`, (error, results) => {
        if(error){
            return res.status(400).json({ ok: false, error });
        }
        return res.json({ ok: true, message: 'Contraseña cambiada satisfactoriamente' });
    })
}


module.exports = { validUsername, getEmployeeProfile, getEmployees, saveEmployee, verifyPassword, deleteEmployee, deleteCustomer, reactiveCustomer, passwordChange };