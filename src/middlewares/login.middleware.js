const loginFieldsValidation = (req, res, next) => {
    const { correo, passwd } = req.body;

    if (correo === undefined || correo === ' ') {
        return res.status(400).json({ ok: false, error: 'El Correo o Contraseña no son válido' });
    }
    if (passwd === undefined || passwd === ' ') {
        return res.status(400).json({ ok: false, error: 'Contraseña no válida' });
    }

    next();
}

const verifyAccount = (req, res, next) => {

}

module.exports = { loginFieldsValidation }