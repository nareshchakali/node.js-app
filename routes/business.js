var router = require('express').Router();

router.post('/create', function(request, response){
 
    const { id } = request.params
    var body = request.body || {}

    body = JSON.parse(body);

    if (!body) {
        response.status(400).send('Fields are required');
    }
  
    const sql = "INSERT INTO business_development (user_id,user_name,user_email,name,type,description,url) VALUES ('"+body.user_id+"' ,'"+body.user_name+"' , '"+body.user_email+"' ,'"+body.name+"' ,'"+body.type+"','"+body.description+"','"+body.url+"')";

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
 
    const sql = "SELECT id,name,type,description,date_format(created_on,'%d/%m/%Y %H:%i') as created_on,date_format(updated_on,'%d/%m/%Y %H:%i') as updated_on,user_name from business_development limit 10";

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
  
    const sql = "SELECT id,name,type,status,comments,description,created_on,updated_on,user_name,url from business_development where id="+id;

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
  
    const sql = "UPDATE business_development SET name='"+body.name+"',type='"+body.type+"',description='"+body.description+"', url='"+body.url+"' WHERE id="+body.id;

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
  
    const sql = "UPDATE business_development SET name='"+body.name+"',type='"+body.type+"',comments='"+body.comments+"',description='"+body.description+"', url='"+body.url+"'  WHERE id="+body.id;

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
  


    const sql = "DELETE FROM business_development WHERE id="+body.id;

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