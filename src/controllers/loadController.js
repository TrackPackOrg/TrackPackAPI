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
    connection.query(`select cargas.idCarga, concat( municipios.municipio, ' / ',departamentos.departamento, ' - ', direcciones.direccion) as 'direccion', concat(clientes.nombre, ' ', clientes.apellido ) as 'nombre', estadoscargas.estado from cargas inner join direcciones on direcciones.idDireccion = cargas.idDireccion inner join municipios on municipios.idMunicipio = direcciones.idMunicipio inner join departamentos on municipios.idDepartamento = departamentos.idDepartamento inner join clientes on clientes.idCliente = cargas.idCliente inner join estadoscargas on estadoscargas.idEstado = cargas.idEstado where cargas.idCliente='${idCliente}'`, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(idCliente);
        return res.json({ ok: true, result });
    })
};

const updateLoadAddress = (req, res) => {
    const { idDireccion, idCliente } = req.body;
    connection.query(`UPDATE cargas set idDireccion='${idDireccion}' where idCliente=${idCliente}`, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        return res.json({ ok: true, message: 'Direccion modificada satisfactoriamente' });
    })
};


module.exports = { saveLoad, getAllLoads, updateLoadAddress };