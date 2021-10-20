var router = require('express').Router();

router.get('/dashboard', function(request, response){
 
  
    const sql = "SELECT category,COUNT(id) as count FROM intellectual_property GROUP BY category";

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

router.post('/create', function(request, response){
 
    const { id } = request.params
    var body = request.body || {}

    body = JSON.parse(body);

    if (!body) {
        response.status(400).send('Fields are required');
    }
  
    const sql = "INSERT INTO intellectual_property (user_id,user_name,user_email,name,description,category,department,url) VALUES ('"+body.user_id+"' ,'"+body.user_name+"' , '"+body.user_email+"' ,'"+body.name+"' ,'"+body.desc+"' ,'"+body.category+"','"+body.department+"','"+body.url+"')";

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

router.get('/get', function(request, response){
 
    //const body = JSON.parse(request.body);

    //let limit = body.page * 10;

    const sql = "SELECT id,name,description,category,contr_status,url,status_comments,department,date_format(created_on,'%d/%m/%Y %H:%i') as created_on,updated_on,user_name from intellectual_property";

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

router.get('/get/:id', function(request, response){
 
   const { id } = request.params

   if (!id) {
        response.status(400).send('Fields are required');
   }
  
    const sql = "SELECT id,name,description,category,contr_status,status_comments,department,created_on,updated_on,user_name,url from intellectual_property where id="+id;

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

router.post('/update', function(request, response){
 
    const { id } = request.params
    var body = request.body || {}

    body = JSON.parse(body);

    console.log(body);
    if (!body) {
        response.status(400).send('Fields are required');
    }
  
    const sql = "UPDATE intellectual_property SET name='"+body.name+"',description='"+body.desc+"', category='"+body.category +"', department='"+body.department +"', url='"+body.url+"' WHERE id="+body.id;

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

router.post('/update-status', function(request, response){
 
    const { id } = request.params
    var body = request.body || {}

    body = JSON.parse(body);

    console.log(body);
    if (!body) {
        response.status(400).send('Fields are required');
    }
  
    const sql = "UPDATE intellectual_property SET name='"+body.name+"',description='"+body.desc+"', category='"+body.category +"', contr_status='"+body.status+"', status_comments='"+body.status_comments+"', department='"+body.department +"', url='"+body.url+"'  WHERE id="+body.id;

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


router.post('/delete', function(request, response){
 
    const { id } = request.params
    var body = request.body || {}

    body = JSON.parse(body);

    if (!body) {
        response.status(400).send('Fields are required');
    }
  


    const sql = "DELETE FROM intellectual_property WHERE id="+body.id;

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

module.exports = router;