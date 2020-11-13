const connection = require('../config/db');

const getStates = (req, res) => {
    connection.query('SELECT * from departamentos', (error, results) => {
        if (error) {
            return res.status(400).json({ ok: false, error })
        }
        console.log({ states: results });
        return res.json({ ok: true, states: results });
    });
}

//Obtenemos todos los municipios en base al stateID el cual se manda como query en la peticion GET desde el frontend
const getCityById = (req, res) => {
    const { stateId } = req.query;
    connection.query(`SELECT * FROM municipios where idDepartamento=${stateId}`, (error, results) => {
        if (error) {
            return res.status(400).json({ ok: false, error })
        }
        console.log({ cities: results });
        return res.json({ ok: true, cities: results });
    })
}

const saveCustomerAddress = (req, res) => {
    const { idCliente, idMunicipio, latitud, longitud, direccion } = req.body;

    connection.query(`INSERT INTO direcciones(idCliente, idMunicipio, latitud, longitud, direccion) VALUES('${idCliente}', '${idMunicipio}', '${latitud}', '${longitud}', '${direccion}')`, (error, result) => {
        if (error) {
            return res.status(400).json({ ok: false, error });
        }

        return res.json({ ok: true, message: result });
    });
}

module.exports = { getStates, getCityById, saveCustomerAddress }