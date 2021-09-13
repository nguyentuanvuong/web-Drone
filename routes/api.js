const express = require('express');
var router = express.Router();
var mysql = require('mysql')

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

module.exports = router;