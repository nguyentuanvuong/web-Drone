const express = require('express');
var router = express.Router();
var mysql = require('mysql')
var fs = require('fs');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'detect_covid19'
  })
  
// db.connect();

router.get('/camera',(req,res)=>{
    db.query('SELECT * FROM `camera`',(error, results, fields)=>{
      res.send(results);
    });
  });

router.get('/:path/:file', function(req, res, next) {
  var path = './data/'+req.params.path+'/'+req.params.file;
  var fd = fs.readFileSync(path,function(err){
    if(err) res.send(err);
  });
  var data = JSON.parse(fd);
  res.json(data);
});

module.exports = router;