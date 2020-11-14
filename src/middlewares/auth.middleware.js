const jwt = require('jsonwebtoken');

const tokenRequire = (req, res, next) => {
    const { token } = req.query;
    if (token === undefined || token === '') {
        return res.status(400).json({ ok: false, error: 'No se ha recibido ningun token' });
    }

    jwt.verify(token, process.env.SECRET, (err, dec) => {
        if (err) {
            return res.status(403).json({ ok: false, error: 'Sin autorizacion' });
        }
        next();
    })
}

module.exports = { tokenRequire };