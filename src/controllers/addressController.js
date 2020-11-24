const connection = require('../config/db');
const axios = require('axios');
const utf8 = require('utf8');
const { dbErrorCode } = require('../helpers/dbErrors')

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
    connection.query(`INSERT INTO direcciones(idCliente, idMunicipio, latitud, longitud, direccion) VALUES('${idCliente}', '${idMunicipio}', '${latitud}', '${longitud}', '${direccion}')`, (error, results) => {
        if (error) {
            return res.status(400).json({ ok: false, error });
        }

        connection.query(`SELECT direccionDefecto from clientes where idCliente='${idCliente}'`, (error2, results2) => {
            if (error2) {
                console.log(error2);
                return;
            }
            if (results2.length === 0 || results2[0].direccionDefecto == null) {
                connection.query(`UPDATE clientes set direccionDefecto='${results.insertId}' where idCliente='${idCliente}'`, (error3, results3) => {
                    if (error3) {
                        console.log(error3);
                        return;
                    }
                    return res.json({ ok: true, message: 'Direccion registrada satisfactoriamente y establecida como direccion por defecto' });
                })
            } else {
                return res.json({ ok: true, message: 'Direccion registrada satisfactoriamente' });
            }
        })

    });
}

const getAllAddress = (req, res) => {
    const { idCliente } = req.body;

    connection.query(`SELECT direcciones.idDireccion, municipios.idMunicipio, departamentos.idDepartamento, municipios.municipio, departamentos.departamento, direcciones.direccion from direcciones INNER JOIN municipios on direcciones.idMunicipio = municipios.idMunicipio inner join departamentos on municipios.idDepartamento = departamentos.idDepartamento where idCliente='${idCliente}'`, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        connection.query(`SELECT direccionDefecto from clientes where idCliente='${idCliente}'`, (error2, results2) => {
            if (error2) {
                console.log(error2);
                return;
            }
            for (let i = 0; i < results.length; i++) {
                if (results2[0].direccionDefecto == results[i].idDireccion) {
                    results[i].porDefecto = true;
                    break;
                }
            }
            return res.json({ ok: true, results });
        })
    })
}

const deleteAddress = (req, res) => {
    const { idCliente } = req.body;
    const { idDireccion } = req.query;
    if (idDireccion === undefined || idDireccion === '') {
        return res.json({ ok: false, error: 'Direccion no especificada' });
    }

    connection.query(`DELETE FROM direcciones where idDireccion='${idDireccion}'`, (error, result) => {
        if (error) {
            return res.status(400).json(dbErrorCode(error));
        }
        return res.json({ ok: true, message: 'Direccion eliminada correctamente' });
    })
};

const updateAddress = async(req, res) => {
    let { idCliente, idDireccion, idMunicipio, latitud, longitud, direccion } = req.body;

    if (latitud === undefined || latitud === '' && longitud === undefined || longitud === '') {
        const geo = await getGeocodeFromAddress(idMunicipio);
        latitud = geo.lat;
        longitud = geo.lng
    }
    connection.query(`UPDATE direcciones set idMunicipio='${idMunicipio}', latitud='${latitud}', longitud='${longitud}', direccion='${direccion}' where idDireccion='${idDireccion}'`, (error, result) => {
        if (error) {
            return res.status(400).json({ ok: false, error });
        }

        return res.json({ ok: true, message: 'Datos actualizados correctamente' });
    });
}

const updateDefaultAddress = (req, res) => {
    const { idCliente, direccionDefecto } = req.body;
    if (direccionDefecto === undefined || direccionDefecto === '') {
        return res.status(400).json({ ok: false, error: 'No se ha especificado la direccion por defecto' });
    }

    connection.query(`UPDATE clientes set direccionDefecto='${direccionDefecto}' where idCliente='${idCliente}'`, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        return res.json({ ok: true, message: 'Direccion por defecto actualizada correctamente' });
    })
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

module.exports = { getStates, getCityById, saveCustomerAddress, getAllAddress, deleteAddress, updateAddress, updateDefaultAddress }