var router = require('express').Router();

router.get('/get', function(request, response){
 
    const sql = "SELECT id,name,number,member,date,expiry_date,date_format(created_on,'%d/%m/%Y %H:%i') as created_on from certifications limit 10";

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

    const sql = "INSERT INTO certifications (user_id,user_name,user_email,name,number,member,date,expiry_date) VALUES ('"+body.user_id+"' ,'"+body.user_name+"' , '"+body.user_email+"' ,'"+body.name+"' ,'"+body.number+"' ,'"+body.member+"' ,'"+body.date+"' ,'"+body.expiry_date+"')";

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

router.get('/get/:id', function(request, response){
 
   const { id } = request.params

   if (!id) {
        response.status(400).send('Fields are required');
   }
  
    const sql = "SELECT id,name,number,member,date,expiry_date,created_on,comments,user_name from certifications where id="+id;

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


router.post('/update-status', function(request, response){
 
    const { id } = request.params
    var body = request.body || {}

    body = JSON.parse(body);

    console.log(body);
    if (!body) {
        response.status(400).send('Fields are required');
    }
  
    const sql = "UPDATE certifications SET name='"+body.name+"',number='"+body.number+"', member='"+body.member +"', date='"+body.date+"', expiry_date='"+body.expiry_date+"', comments='"+body.comments+"' WHERE id="+body.id;

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

module.exports = router;