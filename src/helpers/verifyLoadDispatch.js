const connection = require('../config/db');

const verifyLoadDispatch = (idPaquete) => {
    connection.query(`SELECT idCarga from paquetes where idPaquete='${idPaquete}'`, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        const { idCarga } = results[0];
        connection.query(`SELECT recibidoPor from paquetes where idCarga='${idCarga}'`, (error2, results2) => {
            if (error2) {
                console.log(error2);
                return;
            }
            let ready = true;
            results2.forEach((element) => {
                console.log(element);
                if (element.recibidoPor === null || element.recibidoPor === undefined || element.recibidoPor === '') {
                    ready = false;
                    return;
                }
            });
            if (ready) {
                connection.query(`UPDATE cargas SET idEstado='${2}' where idCarga='${ idCarga }'`, (error3, results3) => {
                    if (error3) {
                        console.log(error3);
                        return;
                    }
                    console.log('Despacho listo');
                });
            }

        });
    });
};

module.exports = { verifyLoadDispatch };