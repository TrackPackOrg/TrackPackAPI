const loginFieldsValidation = (req, res, next) => {
    const { correo, passwd } = req.body;

    if (correo === undefined || correo === ' ') {
        return res.status(400).json({ ok: false, error: 'El Correo es Inválido' });
    }
    if (passwd === undefined || passwd === ' ') {
        return res.status(400).json({ ok: false, error: 'Contraseña Inválida' });
    }

    //No se si esto va :'''v
    connection.query(`SELECT * from clientes where passwd=${passwd}`, (error, result) => {
        if (error) {
            return res.status(400).json({ ok: false, error: '' })
        }

    })


}