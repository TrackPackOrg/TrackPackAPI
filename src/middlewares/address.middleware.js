const connection = require('../config/db');

const addressFieldsValidation = (req, res, next) => {
    const { idCliente, idMunicipio, direccion } = req.body;

    if (idCliente === undefined || idCliente === '') {
        return res.status(400).json({ ok: false, error: 'idCliente no especificado' });
    }
    if (idMunicipio === undefined || idMunicipio === '') {
        return res.status(400).json({ ok: false, error: 'idMunicipio no especificado' });
    }
    if (direccion === undefined || direccion === '') {
        return res.status(400).json({ ok: false, error: 'direccion no especificado' });
    }
    connection.query(`SELECT * from clientes where idCliente=${idCliente}`, (error, result) => {
        if (error) {
            return res.status(400).json({ ok: false, error })
        }
        if (result.length === 0) {
            return res.status(400).json({ ok: false, error: 'El cliente aun no ha sido registrado' });
        }
        if (idMunicipio > 0 && idMunicipio <= 298) {
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

module.exports = { addressFieldsValidation, verifyState };