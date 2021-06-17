var express = require('express');
var app = express();
var port = 8080;

global.conn = require('./config/connections');

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

app.use('/intellectual_property',require('./routes/intellectual_property'));
app.use('/certifications',require('./routes/certifications'));
app.use('/business',require('./routes/business'));
app.use('/trainings',require('./routes/trainings'));


app.listen(port, function () {
    console.log('Express server is listening on port ',port);
});

module.exports = conn;