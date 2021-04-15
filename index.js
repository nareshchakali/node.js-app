var express = require('express');
var app = express();

var mysql = require('mysql');

//var conn = mysql.createConnection({host: "samplemysql.mysql.database.azure.com", user: "azure_root@samplemysql", password: {your_password}, database: {your_database}, port: 3306, ssl:{ca:fs.readFileSync({ca-cert filename})}});

var conn = mysql.createConnection({
    host: 'samplemysql.mysql.database.azure.com',
    user: 'azure_root@samplemysql',
    password: 'Pavan2Kumar',
    database: 'snp',
    multipleStatements: true,
    ssl:true
});

conn.connect();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
    next();
  });


app.use (function(reqest, response, next) {
    var data='';
    reqest.setEncoding('utf8');
    reqest.on('data', function(chunk) { 
       data += chunk;
    });

    reqest.on('end', function() {
        reqest.body = data;
        next();
    });
});

app.post('/api/create-contribution', function(request, response){
 
    const { id } = request.params
    var body = request.body || {}

    body = JSON.parse(body);

    if (!body) {
        response.status(400).send('Fields are required');
    }
  
    const sql = "INSERT INTO contributions (name,description,category,contr_status,status_comments,department) VALUES ('"+body.name+"' ,'"+body.desc+"' ,'"+body.category+"' ,'"+body.status+"' ,'"+body.status_comments+"' ,'"+body.department+"')";

    console.log(sql);
    conn.query(sql, 
        function (err, results, fields) {

          if (err) {
            console.log(err);
            response.status(400).send('Error in database operation');
          } else {  
            response.send(results);
          }
  
        });
    });

app.get('/api/get-contributions', function(request, response){
 
//    const { id } = request.params
//    var body = request.body || {}

//    body = JSON.parse(body);

//    if (!body) {
        //response.status(400).send('Fields are required');
//    }
  
    const sql = "SELECT contribution_id,name,description,category,contr_status,status_comments,department,created_on,updated_on from contributions limit 10";

    conn.query(sql, 
        function (err, results, fields) {

          if (err) {
            console.log(err);
            response.status(400).send('Error in database operation');
          } else {  
            response.send(results);
          }
  
        });
    });

app.get('/api/get-contribution/:id', function(request, response){
 
   const { id } = request.params
//    var body = request.body || {}

//    body = JSON.parse(body);

   if (!id) {
        response.status(400).send('Fields are required');
   }
  
    const sql = "SELECT contribution_id,name,description,category,contr_status,status_comments,department,created_on,updated_on from contributions where contribution_id="+id;

    conn.query(sql, 
        function (err, results, fields) {

          if (err) {
            console.log(err);
            response.status(400).send('Error in database operation');
          } else {  
            response.send(results);
          }
  
        });
    });

app.post('/api/update-contribution', function(request, response){
 
    const { id } = request.params
    var body = request.body || {}

    body = JSON.parse(body);

    console.log(body);
    if (!body) {
        response.status(400).send('Fields are required');
    }
  
    const sql = "UPDATE contributions SET name='"+body.name+"',description='"+body.desc+"', category='"+body.category +"', contr_status='"+body.status+"', status_comments='"+body.status_comments+"', department='"+body.department+"' WHERE contribution_id="+body.id;

    console.log(sql);
    conn.query(sql, 
        function (err, results, fields) {

          if (err) {
            console.log(err);
            response.status(400).send('Error in database operation');
          } else {  
            response.send(results);
          }
  
        });
    });

app.post('/api/delete-contribution', function(request, response){
 
    const { id } = request.params
    var body = request.body || {}

    body = JSON.parse(body);

    if (!body) {
        response.status(400).send('Fields are required');
    }
  


    const sql = "DELETE FROM contributions WHERE contribution_id="+body.id;

    conn.query(sql, 
        function (err, results, fields) {

          if (err) {
            console.log(err);
            response.status(400).send('Error in database operation');
          } else {  
            response.send(results);
          }
  
        });
    });


app.listen(3003, function () {
    console.log('Express server is listening on port 3003');
});