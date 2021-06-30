var router = require('express').Router();


router.post('/create', function(request, response){
 
    const { id } = request.params
    var body = request.body || {}

    body = JSON.parse(body);

    if (!body) {
        response.status(400).send('Fields are required');
    }
  
    const sql = "INSERT INTO intellectual_property (user_id,user_name,user_email,name,description,category,department) VALUES ('"+body.user_id+"' ,'"+body.user_name+"' , '"+body.user_email+"' ,'"+body.name+"' ,'"+body.desc+"' ,'"+body.category+"','"+body.department+"')";

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
 
    const sql = "SELECT id,name,description,category,contr_status,status_comments,department,created_on,updated_on from intellectual_property limit 10";

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
  
    const sql = "SELECT id,name,description,category,contr_status,status_comments,department,created_on,updated_on,user_name from intellectual_property where id="+id;

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
  
    const sql = "UPDATE intellectual_property SET name='"+body.name+"',description='"+body.desc+"', category='"+body.category +"', department='"+body.department+"' WHERE id="+body.id;

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
  
    const sql = "UPDATE intellectual_property SET name='"+body.name+"',description='"+body.desc+"', category='"+body.category +"', contr_status='"+body.status+"', status_comments='"+body.status_comments+"', department='"+body.department+"' WHERE id="+body.id;

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