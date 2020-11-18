const connection = require('../config/db');
const saveLoad = (req, res) => {
    const { idCliente, idDireccion } = req.body;
    connection.query(`INSERT INTO cargas(idCliente, idDireccion) VALUES('${idCliente}', '${idDireccion}')`, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        return res.json({ ok: true, messsage: 'Carga creada correctamente', idCarga: result.insertId });
    })
}

const getAllLoads = (req, res) => {
    const { idCliente } = req.body;
    connection.query(`SELECT * from cargas where idCliente='${idCliente}'`, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(idCliente);
        return res.json({ ok: true, result });
    })
}


module.exports = { saveLoad, getAllLoads };