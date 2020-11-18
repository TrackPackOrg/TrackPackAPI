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
    connection.query(`SELECT * from paquetes where idCarga='${idCarga}'`, (error, result) => {
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


module.exports = { savePackage, getPackageByLoadId };