const connection = require("../config/db");

const packageVerify = (req, res, next) => {
    //Middleware que se encarga de verificar los campos de la carga y que estos en realidad existan y correspondan al usuario en la base de datos

    const { idCarga, trackingUsa, idTipo, descripcion, idCurrier, idCliente } = req.body;
    const pattern = /^[A-Za-z0-9]*$/

    if (idCarga === undefined || idCarga === '') {
        return res.status(400).json({ ok: false, error: 'Se debe crear una carga para continuar' });
    }

    if (isNaN(idCarga)) {
        return res.status(400).json({ ok: false, error: 'El idCarga debe de ser numerico' });
    }

    if (trackingUsa === undefined || trackingUsa === '') {
        return res.status(400).json({ ok: false, error: 'Se debe especificar el numero de tracking para poder continuar' });
    }

    if (trackingUsa.trim().length < 5) {
        return res.status(400).json({ ok: false, error: 'El tracking debe de contener almenos 5 caracteres' });
    }

    if (trackingUsa.trim().length > 100) {
        return res.status(400).json({ ok: false, error: 'El numero de tracking no debe de contener mas de  100 caracteres' });
    }

    if (!pattern.exec(trackingUsa.trim())) {
        return res.status(400).json({ ok: false, error: 'El numero de tracking solo debe estar compuesto por letras y digitos' });
    }

    if (idTipo === undefined || idTipo === '') {
        return res.status(400).json({ ok: false, error: 'Se debe especificar el tipo de paquete' });
    }

    if (isNaN(idTipo)) {
        return res.status(400).json({ ok: false, error: 'El idTipo debe de ser numerico' });
    }

    if (descripcion === undefined || descripcion === '') {
        return res.status(400).json({ ok: false, error: 'Se debe especificar la descripcion del paquete para continuar' });
    }

    if (descripcion.trim().length < 8) {
        return res.status(400).json({ ok: false, error: 'La descripcion debe de contener almenos 8 caracteres' });
    }

    if (descripcion.trim().length > 200) {
        return res.status(400).json({ ok: false, error: 'La descripcion no debe de contener mas de 200 caracteres' });
    }

    if (idCurrier === undefined || idCurrier === '') {
        return res.status(400).json({ ok: false, error: 'Se debe especificar un Currier para continuar' });
    }

    if (isNaN(idCurrier)) {
        return res.status(400).json({ ok: false, error: 'El idCurrier debe de ser numerico' });
    }


    connection.query(`SELECT idCarga from cargas where idCliente='${idCliente}'`, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(results[0].idCarga);
        if (results[0].idCarga !== parseInt(idCarga)) {
            return res.status(400).json({ ok: false, error: 'La carga especificada no corresponde al cliente' });
        }
        connection.query(`SELECT idCurrier from curriers`, (error2, result2) => {
            let currierFound = false;
            if (error2) {
                console.log(error2);
                return;
            };
            for (let result of result2) {
                if (result.idCurrier == idCurrier) {
                    currierFound = true;
                    break;
                }
            }
            if (!currierFound) {
                return res.status(400).json({ ok: false, error: 'El currier especificado no coincide con los curriers en la base de datos' });
            } else {
                connection.query(`SELECT idTipo from tipospaquetes`, (error3, result3) => {
                    let typeFound = false;
                    if (error3) {
                        console.log(error3);
                        return;
                    }
                    for (let result of result3) {
                        if (result.idTipo == idTipo) {
                            typeFound = true;
                            break;
                        }
                    }
                    if (!typeFound) {
                        return res.status(400).json({ ok: false, error: 'El tipo de paquete especificado no coincide con los registrados' });
                    } else {
                        req.body.trackingUsa = trackingUsa.trim();
                        req.body.descripcion = descripcion.trim();
                        next();
                    }
                })
            }
        });
    });

};


module.exports = { packageVerify };