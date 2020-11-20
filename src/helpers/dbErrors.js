//Funciones de utilidad

//Detectar errores producidos por la base de datos

const dbErrorCode = ({ errno }) => {
    switch (errno) {
        case 1062:
            return { ok: false, error: 'Correo electronico ya registrado' };
        case 1451:
            return { ok: false, error: 'No se puede eliminar el campo porque tienes atributos asociados a el' }
        default:
            return { ok: false, error: 'Problemas temporales, intentalo de nuevo en unos minutos' };
    }
}

module.exports = { dbErrorCode };