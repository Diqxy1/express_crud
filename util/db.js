const mysql = require("mysql");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'diqxy',
    password: '123321',
    port: 3306,
    database: 'nodejs',
    multipleStatements: true
});

/* Conexão */
db.connect((erro) => {
    if(erro){
        throw erro;
    }
    console.log(`Conectado ao banco de dados nodejs`)
});

global.db = db;

module.exports = db;