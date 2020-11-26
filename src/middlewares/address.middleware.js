const connection = require('../config/db');
const { verifyReapeatCharacter } = require('../helpers/utilies');

const addressFieldsValidation = (req, res, next) => {
    const { idMunicipio, direccion, idCliente } = req.body;
    const patter = /^[#.0-9a-zA-Z\s,áéíóúÁÉÍÓÚüÜñÑ-]*$/

    if (idMunicipio === undefined || idMunicipio === '') {
        return res.status(400).json({ ok: false, error: 'idMunicipio no especificado' });
    }
    if (direccion === undefined || direccion === '') {
        return res.status(400).json({ ok: false, error: 'direccion no especificado' });
    }

    if (direccion.trim().length < 8) {
        return res.status(400).json({ ok: false, error: 'La direccion debe de contener al menos 8 caracteres' });
    }

    if (!patter.exec(direccion)) {
        return res.status(400).json({ ok: false, error: 'El formato de la direccion no es valido' })
    }

    if (verifyReapeatCharacter(direccion)) {
        return res.status(400).json({ ok: false, error: 'La direccion no puede contener 3 caracteres consecutivos del mismo tipo' });
    }

    connection.query(`SELECT * from clientes where idCliente=${idCliente}`, (error, result) => {
        if (error) {
            return res.status(400).json({ ok: false, error })
        }
        if (result.length === 0) {
            return res.status(400).json({ ok: false, error: 'El cliente aun no ha sido registrado' });
        }
        if (idMunicipio > 0 && idMunicipio <= 298) {
            req.body.direccion = direccion.trim();
            next();
        } else {
            return res.status(400).json({ ok: false, error: 'Municipio no valido' });
        }
    });
}

const verifyState = (req, res, next) => {
    const { stateId } = req.query;
    if (stateId === undefined || stateId === '') {
        return res.status(400).json({ ok: false, error: 'Municipio no especificado' });
    }
    if (isNaN(stateId)) {
        return res.status(400).json({ ok: false, error: 'El stateId debe de ser numerico' });
    }
    if (stateId > 18 || stateId < 1) {
        return res.status(400).json({ ok: false, error: 'Municipio no valido' });
    }
    next();
}

const addressCustomerValidation = (req, res, next) => {
    //Esta funcion validara que el idCliente mandado por el cliente, este correctamente registrado y ese id le pertenezca a el
    const { idCliente, idDireccion } = req.body;
    let found = false;
    connection.query(`SELECT * from direcciones where idCliente=${idCliente}`, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        //Validar si se encontro almenos un resultado
        if (results.length === 0) {
            return res.status(400).json({ ok: false, error: 'Se debe registrar almenos una direccion para poder continuar' });
        }

        for (let result of results) {
            if (result.idDireccion == idDireccion) {
                console.log('Direcciones coinciden');
                found = true;
                break;
            }
        }

        if (found) {
            next()
        } else {
            return res.status(400).json({ ok: false, error: 'Direccion ingresada no valida' });
        }
    })
}


module.exports = { addressFieldsValidation, verifyState, addressCustomerValidation };