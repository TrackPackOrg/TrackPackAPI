const connection = require("../config/db");
const { verifyReapeatCharacter, verifyOnlyLetters } = require("../helpers/utilies");

const fieldsValidationEmployee = (req, res, next) => {
    const { nombre, apellido, userLogin, passwd } = req.body;
    const patter = /^[A-Za-z0-9_.ñÑ]*$/

    if (nombre === undefined || nombre === '') {
        return res.status(400).json({ ok: false, error: 'El nombre es obligatorio' });
    }

    if (nombre.trim().lenth < 2) {
        return res.status(400).json({ ok: false, error: 'El nombre debe de contener al menos 2 caracteres' });
    }

    if (nombre.trim().length > 50) {
        return res.status(400).json({ ok: false, error: 'El nombre no puede contener mas de 50 caracteres' });
    }

    if (!verifyOnlyLetters(nombre)) {
        return res.status(400).json({ ok: false, error: 'El nombre no puede contener numeros o caracteres especiales' });
    }

    if (verifyReapeatCharacter(nombre)) {
        return res.status(400).json({ ok: false, error: 'El nombre no es valido' });
    }


    if (apellido === undefined || apellido === '') {
        return res.status(400).json({ ok: false, error: 'El apellido es obligatorio' });
    }

    if (apellido.trim().length < 2) {
        return res.status(400).json({ ok: false, error: 'El apellido debe de contener al menos 2 caracteres' });
    }

    if (apellido.trim().length > 50) {
        return res.status(400).json({ ok: false, error: 'El apellido no puede contener mas de 50 caracteres' });
    }

    if (!verifyOnlyLetters(apellido)) {
        return res.status(400).json({ ok: false, error: 'El apellido no debe de contener numeros o caracteres especiales' });
    }

    if (verifyReapeatCharacter(apellido)) {
        return res.status(400).json({ ok: false, error: 'El apellido no es valido' })
    }

    if (passwd === undefined || passwd === '') {
        return res.status(400).json({ ok: false, error: 'La contraseña es obligatoria' })
    }

    if (userLogin === undefined || userLogin === '') {
        return res.status(400).json({ ok: false, error: 'El nombre de usuario es obligatorio' });
    }

    if (!patter.exec(userLogin)) {
        return res.status(400).json({ ok: false, error: 'El nombre de usuario solo puede contener numeros, digitos. Y los caracteres especiales . _ ' });
    }
    if (userLogin[userLogin.length - 1] === '.' || userLogin[userLogin.length - 1] === '_') {
        return res.status(400).json({ ok: false, error: 'El nombre de usuario no puede finalziar con un caracter especial' });
    }

    connection.query(`SELECT userLogin from empleados`, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        for (let result of results) {
            if (result.userLogin === userLogin) {
                return res.status(400).json({ ok: false, error: 'El nombre de usuario ya esta registrado' });
            }
        }
        req.body.nombre = nombre.trim().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        req.body.apellido = apellido.trim().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        req.body.userLogin = userLogin.trim();
        next();
    })
}

module.exports = { fieldsValidationEmployee }