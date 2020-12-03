const axios = require('axios');
const URL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';

//Funciones de utilidad

const verifyReapeatCharacter = (word) => {
    let repeat = false;
    for (let i = 0; i < word.length; i++) {
        if (i >= 2) {
            if (word[i] == word[i - 1] && word[i - 1] === word[i - 2] && word[i - 2] === word[i]) {
                repeat = true;
                break;
            }
        }
    }

    return repeat;
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
    const patter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (patter.exec(email)) {
        return true;
    }
    return false;
}

const verifyIfHonduras = (telefono) => {
    if (telefono[3] == '9' || telefono[3] == '3' || telefono[3] == '8' || telefono[3] == '2') {
        return true;
    }
    return false;
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

const getAddressFromCords = async(lat, lng) => {
    return new Promise((resolve, reject) => {
        axios.get(`${URL}${lat}, ${lng}&key=${process.env.GOOGLE_API_KEY}`).then((result) => {
            resolve(result.data.results[0].formatted_address);
        }).catch((error) => {
            reject(error.response);
        })
    })
}

module.exports = { verifyReapeatCharacter, verifyEmail, verifyIfHonduras, verifyOnlyLetters, passwdVerify, getAddressFromCords }