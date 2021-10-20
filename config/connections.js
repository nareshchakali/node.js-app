var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'snpkcmysql.mysql.database.azure.com',
    user: 'snpadmin@snpkcmysql',
    password: '%g""&F6G4M=#)Szb',
    database: 'dev',
    multipleStatements: true,
    ssl:true
});

conn.connect();

module.exports = conn;