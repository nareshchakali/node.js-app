var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'samplemysql.mysql.database.azure.com',
    user: 'azure_root@samplemysql',
    password: 'Pavan2Kumar',
    database: 'snp',
    multipleStatements: true,
    ssl:true
});

conn.connect();

module.exports = conn;