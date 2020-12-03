const connection = require('../config/db');
const { verifyOnlyLetters } = require('../helpers/utilies');

const validateTrackingFields = (req, res, next) => {
    const { idCliente, idCarga, idEmpleado, descripcion, datetimeTrack } = req.body;

    if(idCarga === undefined || idCarga === ''){
        return res.status(400).json({ ok: false, error: 'No se ha especificado una carga' });
    }

    if(idEmpleado === undefined || idEmpleado === ''){
        return res.status(400).json({ ok: false, error: 'Empleado no especificado' });
    }

    if(descripcion === undefined || descripcion === ''){
        return res.status(400).json({ ok: false, error: 'No se ha especificado una descripcion' });
    }

    if(!verifyOnlyLetters(descripcion)){
        return res.status(400).json({ ok: false, error: 'La descripcion solo puede estar compuesta por letras' });
    }

    if(datetimeTrack === undefined || datetimeTrack === ''){
        req.body.datetimeTrack = new Date().toLocaleString();
    }
    connection.query(`SELECT * from cargas where idCarga='${idCarga}' && idCliente='${idCliente}'`, (error, results) => {
        if(error){
            return res.status(400).json({ ok: false, error });
        }

        if(results.length === 0){
            return res.status(400).json({ ok: false, error: 'La carga especificada no se encuentra registrada o no pernetece al cliente autenticado' });
        }

        next();
    });
}

const loadVerifyDispatch = (req, res, next) => {
    const { idCarga } = req.body;

    connection.query(`SELECT idEstado from cargas where idCarga='${idCarga}'`, (error, results) => {
        if(error){
            return res.status(400).json({ ok: false, error });
        }
        const { idEstado } = results[0];
        console.log(idEstado);
        if(idEstado!==2){
            return res.status(400).json({ ok: false, error: 'La carga aun no esta lista para ser despachada, por favor espere a que sus paquetes lleguen' });
        }
        next();
    })
}

module.exports = { loadVerifyDispatch, validateTrackingFields }