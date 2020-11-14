const connection = require("../config/db");

const fieldsValidationRegister = (req, res, next) => {
    const { nombre, apellido, correo, passwd, telefono } = req.body;

    if (nombre === undefined || nombre === '') {
        return res.status(400).json({ ok: false, error: 'El nombre es obligatorio' });
    }
    if (!verifyOnlyLetters(nombre)) {
        return res.status(400).json({ ok: false, error: 'El nombre no debe de contener numeros o caracteres especiales' });
    }
    if (apellido === undefined || apellido === '') {
        return res.status(400).json({ ok: false, error: 'El apellido es obligatorio' });
    }
    if (!verifyOnlyLetters(apellido)) {
        return res.status(400).json({ ok: false, error: 'El nombre no debe de contener numeros o caracteres especiales' });
    }
    if (correo === undefined || correo === '') {
        return res.status(400).json({ ok: false, error: 'El correo es obligatorio' });
    }
    if (!verifyEmail(correo)) {
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
    next();
}

const passwdVerify = (req, res, next) => {
    const passwd = req.body.passwd;
    let mayuscula, numero;
    if (passwd.length < 8) {
        return res.status(400).json({ ok: false, error: 'La contraseña debe contener almenos 8 caracteres' });
    }
    for (let i = 0; i < passwd.length; i++) {
        if (passwd.charCodeAt(i) >= 65 && passwd.charCodeAt(i) <= 90 || passwd.charCodeAt(i) === 209) {
            mayuscula = true;
            if (numero) {
                break;
            }
        }
        if (!isNaN(passwd[i])) {
            numero = true;
            if (mayuscula) {
                break;
            }
        }
    }
    if (!mayuscula) {
        return res.status(400).json({ ok: false, error: 'La contraseña debe contener almenos 1 letra en mayuscula' });
    }
    if (!numero) {
        return res.status(400).json({ ok: false, error: 'La contraseña debe contener almenos 1 numero' });
    }
    next();
}

const phoneVerify = (req, res, next) => {
    const { telefono } = req.body;
    let phoneSplit = telefono.split('-');
    if (!verifyOnlyNumbers(phoneSplit)) {
        return res.status(400).json({ ok: false, error: `El numero no debe de estar compuesto por caracteres` })
    }

    let newPhoneFormat = "";
    if (phoneSplit.length >= 1) {
        for (let i = 0; i < phoneSplit.length; i++) {
            newPhoneFormat += phoneSplit[i].toString();
        }
        if (newPhoneFormat.length > 11) {
            return res.status(400).json({ ok: false, error: 'El numero no debe de contener mas de 11 digitos' });
        } else if (newPhoneFormat.length < 11) {
            return res.status(400).json({ ok: false, error: 'El numero debe de contener 11 digitos' });
        }
        req.body.telefono = newPhoneFormat;
    }
    next();
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

const verifyOnlyLetters = (word) => {
    let pattern = /[A-Za-z ñéáíóúÁÉÍÓÚ]+/;
    for (let i = 0; i < word.length; i++) {
        if (!pattern.exec(word[i])) {
            console.log(word[i]);
            return false;
        }
    }
    return true;
}

const verifyEmail = (email) => {
    const patter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (patter.exec(email)) {
        return true;
    }
    return false;
}

module.exports = { fieldsValidationRegister, phoneVerify, passwdVerify, verifyEmailFields };








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