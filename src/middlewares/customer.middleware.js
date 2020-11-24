const connection = require("../config/db");
const jwt = require('jsonwebtoken');
const { verifyOnlyLetters, verifyEmail, verifyIfHonduras, verifyReapeatCharacter } = require("../helpers/utilies");

const fieldsValidationRegister = (req, res, next) => {
    let { nombre, apellido, correo, passwd, telefono } = req.body;

    if (nombre === undefined || nombre === '') {
        return res.status(400).json({ ok: false, error: 'El nombre es obligatorio' });
    }
    if (nombre.trim().length > 50) {
        return res.status(400).json({ ok: false, error: 'El nombre no puede contener mas de 50 caracteres' });
    }
    if (nombre.trim().length < 2) {
        return res.status(400).json({ ok: false, error: 'El nombre debe contener almenos 2 caracteres' });
    }
    if (!verifyOnlyLetters(nombre)) {
        return res.status(400).json({ ok: false, error: 'El nombre no debe de contener numeros o caracteres especiales' });
    }
    if (verifyReapeatCharacter(nombre)) {
        return res.status(400).json({ ok: false, error: 'El nombre no es valido' })
    }
    if (apellido === undefined || apellido === '') {
        return res.status(400).json({ ok: false, error: 'El apellido es obligatorio' });
    }
    if (apellido.trim().length > 50) {
        return res.status(400).json({ ok: false, error: 'El apellido no puede contener mas de 50 caracteres' });
    }
    if (apellido.trim().length < 2) {
        return res.status(400).json({ ok: false, error: 'El apellido debe de contener al menos 2 caracteres' });
    }
    if (!verifyOnlyLetters(apellido)) {
        return res.status(400).json({ ok: false, error: 'El apellido no debe de contener numeros o caracteres especiales' });
    }
    if (verifyReapeatCharacter(apellido)) {
        return res.status(400).json({ ok: false, error: 'El apellido no es valido' })
    }
    if (correo === undefined || correo === '') {
        return res.status(400).json({ ok: false, error: 'El correo es obligatorio' });
    }
    if (correo.trim().length > 100) {
        return res.status(400).json({ ok: false, error: 'El correo no puede contener mas de 100 caracteres' });
    }
    if (!verifyEmail(correo.trim())) {
        return res.status(400).json({ ok: false, error: 'El correo no es valido' });
    }
    if (passwd === undefined || passwd === '') {
        return res.status(400).json({ ok: false, error: 'La contraseña es obligatorio' });
    }
    if (telefono === undefined || telefono === '') {
        return res.status(400).json({ ok: false, error: 'El telefono es obligatorio' });
    }
    if (passwd.length <= 7) {
        return res.status(400).json({ ok: false, error: 'La contraseña debe tener almenos 8 caracteres' })
    }
    req.body.nombre = nombre.trim().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    req.body.apellido = apellido.trim().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    req.body.telefono = telefono.trim();
    req.body.correo = correo.trim();

    next();
}

const phoneVerify = (req, res, next) => {
    let { telefono } = req.body;
    const patter = /^[0-9-]*$/

    if (telefono === undefined || telefono === '') {
        return res.status(400).json({ ok: false, error: 'El telefono es obligatorio' });
    }
    if (!patter.exec(telefono)) {
        return res.status(400).json({ ok: false, error: `El numero no debe de estar compuesto por caracteres` })
    }

    let phoneSplit = telefono.split('-');

    let newPhoneFormat = "";

    console.log(phoneSplit);
    if (phoneSplit.length > 1) {
        for (let i = 0; i < phoneSplit.length; i++) {
            newPhoneFormat += phoneSplit[i].toString();
        }
        if (newPhoneFormat.length > 11) {
            return res.status(400).json({ ok: false, error: 'El numero no debe de contener mas de 8 digitos' });
        } else if (newPhoneFormat.length < 11) {
            return res.status(400).json({ ok: false, error: 'El numero debe de contener 8 digitos' });
        }
        req.body.telefono = newPhoneFormat;
    } else {
        if (telefono.length !== 11) {
            return res.status(400).json({ ok: false, error: 'Numero de telefono no valido' });
        }
    }
    telefono = req.body.telefono;
    if (!verifyIfHonduras(telefono)) {
        return res.status(400).json({ ok: false, error: 'El numero de telefono no es valido para Honduras' });
    }

    //Validar de ser celular si este ya se encuentra registrado
    if (telefono[3] == '9' || telefono[3] == '8' || telefono[3] == '3') {
        connection.query(`SELECT * from celulares where celular='${telefono}'`, (error, result) => {
            if (error) {
                console.log(error);
                return;
            }
            if (result.length !== 0) {
                return res.status(400).json({ ok: false, error: 'Numero de celular ya registrado' });
            } else {
                next();
            }
        })
    } else {
        next();
    }
}


const verifyEmailFields = (req, res, next) => {
    const { code, idCliente } = req.body;
    if (code === undefined || code === '') {
        return res.status(400).json({ ok: false, error: 'Codigo no recibido' });
    }

    if (code.length < 6 || code.length > 6) {
        return res.status(400).json({ ok: false, error: 'El codigo debe contener 6 digitos' });
    }

    connection.query(`SELECT * from clientes where idCliente='${idCliente}'`, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (result.length === 0) {
            return res.status(400).json({ ok: false, error: 'Usuario no encontrado' });
        }

        next();

    })
}


//Funciones de utilidad

const verifyOnlyNumbers = (numbersArr) => {
    for (let i = 0; i < numbersArr.length; i++) {
        console.log(numbersArr[i]);
        for (let j = 0; j < numbersArr[i].length; j++) {
            if (isNaN(numbersArr[i][j])) {
                return false;
            }
        }
    }
    return true;
}

module.exports = { fieldsValidationRegister, phoneVerify, verifyEmailFields };








// const passwdVerify = (req, res, next) => {
//     const passwd = req.body.passwd;
//     let mayuscula, numero;
//     if (passwd.length < 8) {
//         return res.status(400).json({ ok: false, message: 'La contraseña debe contener almenos 8 caracteres' });
//     }
//     for (let i = 0; i < passwd.length; i++) {
//         if (passwd.charCodeAt(i) >= 65 && passwd.charCodeAt(i) <= 90 || passwd.charCodeAt(i) === 209) {
//             mayuscula = true;
//             if (numero) {
//                 break;
//             }
//         }
//         if (!isNaN(passwd[i])) {
//             numero = true;
//             if (mayuscula) {
//                 break;
//             }
//         }
//     }
//     if (!mayuscula) {
//         return res.status(400).json({ ok: false, message: 'La contraseña debe contener almenos 1 letra en mayuscula' });
//     }
//     if (!numero) {
//         return res.status(400).json({ ok: false, message: 'La contraseña debe contener almenos 1 numero' });
//     }
//     next();
// }