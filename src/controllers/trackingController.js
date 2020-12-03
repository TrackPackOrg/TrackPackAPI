const connection = require('../config/db');
const { getAddressFromCords } = require('../helpers/utilies');

const saveTracking = (req, res) => {
    const { idCliente, idCarga, idEmpleado, descripcion, datetimeTrack } = req.body;

    console.log(datetimeTrack);

    connection.query(`INSERT INTO tracking(idCarga, idEmpleado, descripcion, datetimeTrack) VALUES('${idCarga}', '${idEmpleado}', '${descripcion}', '${datetimeTrack}')`, (error, results) => {
        if(error){
            return res.status(400).json({ ok: false, error });
        }

        connection.query(`UPDATE cargas set idEstado=3 where idCarga='${idCarga}'`, (error2, results2) => {
            if(error2){
                return res.status(400).json({ ok: false, error: error2 });
            }

            return res.json({ ok: true, message: 'Cargar despachada correctamente' });
        })
    })
};

const reportTracking = (req, res) => {
    const { idEmpleado, idCarga, descripcion } = req.body;
    const datetimeTrack = new Date().toLocaleString();
    connection.query(`INSERT INTO tracking values(idCarga, idEmpleado, descripcion, datetimeTrack) VALUES('${idCarga}', '${idEmpleado}', '${descripcion}', '${datetimeTrack}')`, (error, results) => {
        if(error){
            return res.status(400).json({ ok: false, error });
        }
        return res.status(400).json({ ok: true, message: 'Carga registrada correctamente' });
    })
}

const getTrackingByLoadId = (req, res) => {
    const { idCarga } = req.query;
    if(idCarga === undefined || idCarga === ''){
        return res.status(400).json({ ok: false, error: 'No se a recivido la carga' });
    }

    if(isNaN(idCarga)){
        return res.status(400).json({ ok: false, error: 'La carga solo debe contener caracteres numericos' });
    }

    connection.query(`SELECT * from tracking where idCarga='${idCarga}' order by 1 desc`, (error, results) => {
        if(error){
            return res.status(400).json({ ok: false, error });
        }
        if(results.length === 0){
            return res.status(400).json({ ok: false, error: 'No se ha encontrado la carga, asegurese que esta haya sido despachada' });
        }

        return res.json({ ok: true, results });
    })
}

const updateLocation = async(req, res) => {
    let { lat, lng, descripcion, idEmpleado, idCarga } = req.body;
    let address;
    if(descripcion === undefined || descripcion === ''){
        address = await getAddressFromCords(lat, lng);
        descripcion = `Su paquete fue recibido en ${address}`;
    }
    const datetimeTrack = new Date().toLocaleString();

    connection.query(`INSERT INTO tracking(idCarga, idEmpleado, descripcion, datetimeTrack) VALUES('${idCarga}', '${idEmpleado}', '${descripcion}', '${datetimeTrack}')`, (error, results) => {
        if(error){
            return res.status(400).json({ ok: false, error });
        }

        return res.json({ ok: true, message: 'Carga registrada correctamente' });
    })
}

module.exports = { saveTracking, reportTracking, getTrackingByLoadId, updateLocation };