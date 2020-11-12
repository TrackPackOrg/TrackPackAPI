const fieldsValidation = (req, res, next) => {
    const { nombre, apellido, correo, passwd } = req.body;

    if (nombre === undefined || nombre === '') {
        return res.status(400).json({ ok: false, message: 'El nombre es obligatorio' });
    }
    if (apellido === undefined || apellido === '') {
        return res.status(400).json({ ok: false, message: 'El apellido es obligatorio' });
    }
    if (correo === undefined || correo === '') {
        return res.status(400).json({ ok: false, message: 'El correo es obligatorio' });
    }
    if (passwd === undefined || passwd === '') {
        return res.status(400).json({ ok: false, message: 'La contraseña es obligatorio' });
    }
    if (passwd.length <= 7) {
        return res.status(400).json({ ok: false, message: 'La contraseña debe tener almenos 8 caracteres' })
    }
    next();
}

module.exports = { fieldsValidation };