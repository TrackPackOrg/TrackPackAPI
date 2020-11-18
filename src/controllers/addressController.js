const connection = require('../config/db');
const axios = require('axios');
const utf8 = require('utf8');

const getStates = (req, res) => {
    connection.query('SELECT * from departamentos', (error, results) => {
        if (error) {
            return res.status(400).json({ ok: false, error })
        }
        // console.log({ states: results });
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

const saveCustomerAddress = async(req, res) => {
    let { idCliente, idMunicipio, latitud, longitud, direccion } = req.body;

    if (latitud === undefined || latitud === '' && longitud === undefined || longitud === '') {
        const geo = await getGeocodeFromAddress(idMunicipio);
        latitud = geo.lat;
        longitud = geo.lng
    }
    connection.query(`INSERT INTO direcciones(idCliente, idMunicipio, latitud, longitud, direccion) VALUES('${idCliente}', '${idMunicipio}', '${latitud}', '${longitud}', '${direccion}')`, (error, result) => {
        if (error) {
            return res.status(400).json({ ok: false, error });
        }

        return res.json({ ok: true, message: 'Direccion registrada satisfactoriamente' });
    });
}


//funciones de utilidad

const getGeocodeFromAddress = async(idMunicipio) => {

    return new Promise((resolve, reject) => {
        connection.query(`select municipios.municipio, departamentos.departamento from municipios inner join departamentos on municipios.idDepartamento = departamentos.idDepartamento where municipios.idMunicipio ='${idMunicipio}'`, async(err, result) => {
            if (err) {
                console.log(err);
                return { lat: 0, lng: 0 }
            }
            const { municipio, departamento } = result[0];
            axios.get(`${process.env.GOOGLE_URL}${utf8.encode(municipio)} ${utf8.encode(departamento)}, Honduras&key=${process.env.GOOGLE_API_KEY}`).then(res => {
                resolve(res.data.results[0].geometry.location);
            }).catch(err => {
                reject({ lat: 0, lng: 0 });
            });

        });

    })

}

module.exports = { getStates, getCityById, saveCustomerAddress }