const { json } = require("express")

const verify = (req, res) => {
    return res.json({ ok: true, message: 'Autorizado' });
}

module.exports = { verify };