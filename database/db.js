const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});

conexion.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err.stack);
        return;
    }
    console.log('Conectado en que th de la db?? ' + conexion.threadId);
});
module.exports = conexion