var express = require('express');
var app = express();

var mysql = require('mysql');
var port = process.env.port | 3003;
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

app.get('/api/get-certifications', function(request, response){
 
    const sql = "SELECT id,name,number,member,date,expiry_date,created_on from certifications limit 10";

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

    app.post('/api/create-certification', function(request, response){
 
    const { id } = request.params
    var body = request.body || {}

    body = JSON.parse(body);

    if (!body) {
        response.status(400).send('Fields are required');
    }
  
    const sql = "INSERT INTO certifications (name,number,member,date,expiry_date) VALUES ('"+body.name+"' ,'"+body.number+"' ,'"+body.member+"' ,'"+body.date+"' ,'"+body.expiry_date+"')";

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

    app.get('/api/get-certification/:id', function(request, response){
 
   const { id } = request.params
//    var body = request.body || {}

//    body = JSON.parse(body);

   if (!id) {
        response.status(400).send('Fields are required');
   }
  
    const sql = "SELECT id,name,number,member,date,expiry_date,created_on from certifications where id="+id;

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


app.post('/api/update-certification', function(request, response){
 
    const { id } = request.params
    var body = request.body || {}

    body = JSON.parse(body);

    console.log(body);
    if (!body) {
        response.status(400).send('Fields are required');
    }
  
    const sql = "UPDATE certifications SET name='"+body.name+"',number='"+body.number+"', member='"+body.member +"', date='"+body.date+"', expiry_date='"+body.expiry_date+"' WHERE id="+body.id;

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


app.post('/api/delete-certification', function(request, response){
 
    const { id } = request.params
    var body = request.body || {}

    body = JSON.parse(body);

    if (!body) {
        response.status(400).send('Fields are required');
    }
  


    const sql = "DELETE FROM certifications WHERE id="+body.id;

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

app.post('/api/create-business', function(request, response){
 
    const { id } = request.params
    var body = request.body || {}

    body = JSON.parse(body);

    if (!body) {
        response.status(400).send('Fields are required');
    }
  
    const sql = "INSERT INTO business_development (name,type) VALUES ('"+body.name+"' ,'"+body.type+"')";

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

app.get('/api/get-business', function(request, response){
 
    const sql = "SELECT id,name,type,created_on,updated_on from business_development limit 10";

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

    app.get('/api/get-business/:id', function(request, response){
 
   const { id } = request.params

   if (!id) {
        response.status(400).send('Fields are required');
   }
  
    const sql = "SELECT id,name,type,status from business_development where id="+id;

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

app.post('/api/update-business', function(request, response){
 
    const { id } = request.params
    var body = request.body || {}

    body = JSON.parse(body);

    console.log(body);
    if (!body) {
        response.status(400).send('Fields are required');
    }
  
    const sql = "UPDATE business_development SET name='"+body.name+"',type='"+body.type+"' WHERE id="+body.id;

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


app.listen(port, function () {
    console.log('Express server is listening on port ',port);
});