var router = require('express').Router();

router.post('/create', function(request, response){
 
    const { id } = request.params
    var body = request.body || {}

    body = JSON.parse(body);

    if (!body) {
        response.status(400).send('Fields are required');
    }
  
    const sql = "INSERT INTO trainings (name,category,description) VALUES ('"+body.name+"' ,'"+body.category+"','"+body.description+"' )";

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
 
    const sql = "SELECT id,name,category,created_on,updated_on from trainings limit 10";

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
  
    const sql = "SELECT id,name,category,status,description,comments,created_on,updated_on from trainings where id="+id;

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
  
    const sql = "UPDATE trainings SET name='"+body.name+"',category='"+body.category+"',description='"+body.description+"' WHERE id="+body.id;

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
  
    const sql = "UPDATE trainings SET name='"+body.name+"',category='"+body.category+"',comments='"+body.comments+"',status='"+body.status+"',description='"+body.description+"' WHERE id="+body.id;

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
  


    const sql = "DELETE FROM trainings WHERE id="+body.id;

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