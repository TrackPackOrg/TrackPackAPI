const connection = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { correo, passwd } = req.body;

    connection.query(`SELECT * from clientes where email='${correo}'`, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (result.length === 0) {
            return res.status(400).json({ ok: false, error: 'Correo o Contraseña no validos' });
        }
        if (!result[0].verificado) {
            return res.status(403).json({ ok: false, error: 'Su cuenta aun no a sido verificada' })
        }

        const passHash = result[0].passwd;
        bcrypt.compare(passwd, passHash, (error, resultCrypt) => {
            if (resultCrypt) {
                const { idCliente, email } = result[0]
                const token = jwt.sign({ idCliente, email }, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 30 });
                return res.json({ ok: true, token });
            } else {
                return res.status(400).json({ ok: false, error: 'Correo o Contraseña incorrecta' });
            }
        })
    })

};

const loginEmployee = (req, res) => {
    const { userLogin } = req.body;
    const passwd = req.body.passwd;
    console.log(bcrypt.hashSync('admin', 10));
    if (userLogin === undefined || userLogin === '') {
        return res.status(400).json({ ok: false, error: 'Nombre de usuario requerido' });
    }
    if (passwd === undefined || passwd === '') {
        return res.status(400).json({ ok: false, error: 'Nombre de usuario requerido' });
    }

    connection.query(`SELECT * from empleados where userLogin='${userLogin}'`, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        if (results.length === 0) {
            return res.status(400).json({ ok: false, error: 'Usuario no registrado' });
        }
        const { idEmpleado, nombre, apellido } = results[0];
        const passwdHash = results[0].passwd;
        if (bcrypt.compareSync(passwd, passwdHash)) {
            const token = jwt.sign({ idEmpleado, nombre, apellido }, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 30 });
            return res.json({ ok: true, token })
        } else {
            return res.status(400).json({ ok: false, error: 'Usuario o contraseña incorrectos' });
        }
    })

};

module.exports = { login, loginEmployee };