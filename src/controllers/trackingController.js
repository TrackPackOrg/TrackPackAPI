const connection = require('../config/db');
const { getAddressFromCords } = require('../helpers/utilies');

const saveTracking = (req, res) => {
    const { idCliente, idCarga } = req.body;

    connection.query(`UPDATE cargas set idEstado=3 where idCarga='${idCarga}'`, (error2, results2) => {
        if(error2){
            return res.status(400).json({ ok: false, error: error2 });
        }

        return res.json({ ok: true, message: 'Cargar despachada correctamente' });
    })
};

const dispatchTracking = (req, res) => {
    const { idCarga, idEmpleado, } = req.body;
    const datetimeTrack = new Date().toLocaleString();
    const descripcion = 'Su carga ha sido despachada y esta en proceso de exportacion.'

    connection.query(`INSERT INTO tracking(idCarga, idEmpleado, descripcion, datetimeTrack) VALUES('${idCarga}', '${idEmpleado}', '${descripcion}', '${datetimeTrack}')`, (error, results) => {
        if(error){
            return res.status(400).json({ ok: false, error });
        }

        connection.query(`UPDATE cargas set idEstado=4 where idCarga='${idCarga}'`, (error2, results2) => {
            if(error2){
                return res.status(400).json({ ok: false, error: error2 });
            }

            return res.json({ ok: true, message: 'La carga ha sido despachada correctamente' });
        })
    })
}

const getDispatchTracking = (req, res) => {
    connection.query(`select cargas.idCarga, concat( clientes.nombre,' ', clientes.apellido) as 'nombre', concat(departamentos.departamento, ' - ', municipios.municipio) as 'direccion' from cargas join clientes on cargas.idCliente = clientes.idCliente join direcciones on cargas.idDireccion = direcciones.idDireccion join municipios on direcciones.idMunicipio = municipios.idMunicipio join departamentos on departamentos.idDepartamento = municipios.idDepartamento where idEstado=3`, (error, results) => {
        if(error){
            return res.status(400).json({ ok: false, error });
        }


        return res.json({ ok: true, results });
    })
}

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
    });
}

const getTrackingByQuery = async(req, res) => {
    const { idCarga } = req.query;
    const { idEmpleado } = req.body;

    connection.query(`SELECT tracking.idTracking, tracking.idEmpleado, tracking.idCarga, tracking.descripcion, concat(clientes.nombre, ' ', clientes.apellido) as 'nombre' from tracking inner join cargas on tracking.idCarga = cargas.idCarga inner join clientes on cargas.idCliente = clientes.idCliente where tracking.idCarga like '${idCarga}%' order by 1 desc limit 1`, (error, results) => {
        if(error){
            return res.status(400).json({ ok: false, error });
        }
        for(let result of results){
            console.log(result);
            if(result.idEmpleado === idEmpleado){
                return res.json({ ok: true , results:[] });
            }
        }
        return res.json({ ok: true, results });
    })

}

module.exports = { saveTracking, reportTracking, getTrackingByLoadId, updateLocation, getTrackingByQuery, dispatchTracking, getDispatchTracking };