const mysql = require("mysql2");

require("dotenv").config();

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

conn.connect((err) =>{
    if(err) console.log(`Erro na conexão com o banco: ${err.message}`);
});

//Padroniza as consultas e transforma a query callback em promise
exports.dbQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        conn.query(sql, params, (err, result) => {
            if(err) reject(`Erro na consulta: ${err.message}`);
            resolve(result);
        });
    });
}