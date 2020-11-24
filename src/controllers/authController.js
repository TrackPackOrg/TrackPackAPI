const { json } = require("express")
const connection = require('../config/db');

const verify = (req, res) => {
    return res.json({ ok: true, message: 'Autorizado' });
}

const dashboard = (req, res) => {
    connection.query(`SELECT count(idCliente) as totalC from clientes`, (error, totalCustomers) => {
        if (error) {
            console.log(error);
            return;
        }
        const { totalC } = totalCustomers[0];
        connection.query(`SELECT COUNT(idEmpleado) as totalE from empleados`, (error2, totalEmployee) => {
            if (error2) {
                console.log(error2);
                return;
            }
            const { totalE } = totalEmployee[0];

            connection.query(`SELECT COUNT(idPaquete) as totalP from paquetes`, (error3, totalPackage) => {
                if (error3) {
                    console.log(error3);
                    return;
                }
                const { totalP } = totalPackage[0];
                return res.json({ ok: true, results: { totalC, totalE, totalP } });
            })
        })
    })
}

module.exports = { verify, dashboard };