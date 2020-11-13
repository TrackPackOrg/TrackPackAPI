const fieldsValidationRegister = (req, res, next) => {
    const { nombre, apellido, correo, passwd, telefono } = req.body;

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
    if (telefono === undefined || telefono === '') {
        return res.status(400).json({ ok: false, message: 'El telefono es obligatorio' });
    }
    if (passwd.length <= 7) {
        return res.status(400).json({ ok: false, message: 'La contraseña debe tener almenos 8 caracteres' })
    }
    next();
}

const phoneVerify = (req, res, next) => {
    const { telefono } = req.body;
    let phoneSplit = telefono.split('-');
    let newPhoneFormat = "";
    if (phoneSplit.length >= 1) {
        for (let i = 0; i < phoneSplit.length; i++) {
            newPhoneFormat += phoneSplit[i].toString();
        }
        req.body.telefono = newPhoneFormat;
    }

    next();
}

module.exports = { fieldsValidationRegister, phoneVerify };