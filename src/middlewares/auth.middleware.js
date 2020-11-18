const jwt = require('jsonwebtoken');

const tokenRequired = (req, res, next) => {
    const token = req.get('token');
    if (token === undefined || token === '') {
        return res.status(400).json({ ok: false, error: 'No se ha recibido ningun token' });
    }

    jwt.verify(token, process.env.SECRET, (err, dec) => {
        if (err) {
            return res.status(403).json({ ok: false, error: 'Sin autorizacion' });
        }
        req.body.idCliente = dec.idCliente;
        next();
    })
}

module.exports = { tokenRequired };