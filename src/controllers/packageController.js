const connection = require('../config/db');

const savePackage = (req, res) => {
    const { idCarga, trackingUsa, idTipo, descripcion, idCurrier, idCliente } = req.body;
    connection.query(`INSERT INTO paquetes(idCarga, trackingUsa, idTipo, descripcion, idCurrier) VALUES('${idCarga}', '${trackingUsa}', '${idTipo}', '${descripcion}', '${idCurrier}')`, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }

        return res.json({ ok: true, message: 'Paquete registrado satisfactoriamente', idPaquete: result.insertId });
    })
};

const getPackageByLoadId = (req, res) => {
    const { idCarga } = req.query;
    connection.query(`select paquetes.idPaquete, paquetes.idCarga, paquetes.descripcion, curriers.nombreCurrier, tipospaquetes.tipo, paquetes.trackingUsa from paquetes inner join curriers on paquetes.idCurrier = curriers.idCurrier inner join tipospaquetes on paquetes.idTipo = tipospaquetes.idTipo where paquetes.idCarga='${idCarga}'`, (error, result) => {
        if (error) {
            console.log(error);
            return;

        }
        if (result.length === 0) {
            return res.json({ ok: false, error: 'Carga no encontrada' });
        }

        return res.json({ ok: true, result });
    });

}

const getCurriers = (req, res) => {
    connection.query(`SELECT * from curriers`, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        return res.json({ ok: true, result });
    });
}

const getPackageType = (req, res) => {
    connection.query('SELECT * from tipospaquetes', (error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        return res.json({ ok: true, result });
    });
}

const deletePackage = (req, res) => {
    const { idPaquete } = req.query;
    connection.query(`DELETE from paquetes where idPaquete='${idPaquete}'`, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        return res.json({ ok: true, message: 'Paquete eliminado correctamente' });
    });
};

const updatePackage = (req, res) => {
    const { idCarga, trackingUsa, idTipo, descripcion, idCurrier, idCliente, idPaquete } = req.body;
    connection.query(`UPDATE paquetes set idCarga='${idCarga}', trackingUsa='${trackingUsa}', idTipo='${idTipo}', descripcion='${descripcion}', idCurrier='${idCurrier}' where idPaquete='${idPaquete}'`, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        return res.json({ ok: true, message: 'Paquete actualizado correctamente' });
    })

}


module.exports = { savePackage, getPackageByLoadId, getCurriers, getPackageType, deletePackage, updatePackage };