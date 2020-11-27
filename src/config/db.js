const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'trackpack'
});

connection.connect((err) => {
    if (err) {
        console.error('error: ' + err.stack);
        return;
    }

    console.log('Conectado a la base de datos');
});

//Exportamos esta variable para hacer uso de ella en otro ficheros js
module.exports = connection;



// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'omgwsyvt_mhaniac',
//     password: '',
//     database: 'omgwsyvt_trackpack'
// });

// connection.connect((err) => {
//     if (err) {
//         console.error('error: ' + err.stack);
//         return;
//     }

//     console.log('Conectado a la base de datos');
// });

// //Exportamos esta variable para hacer uso de ella en otro ficheros js
// module.exports = connection;