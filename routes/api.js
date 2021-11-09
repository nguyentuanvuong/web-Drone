const express = require('express');
const router = express.Router();
const fs = require('fs');
const formidable = require('formidable');


router.post('/update/dataset',(req,res)=>{

  res.send('req');
});

// http://localhost:8000/api/test?firstname=Tuan&lastname=Vuong
router.get('/test',(req,res)=>{
  const spawn = require('child_process').spawn;
  var process = spawn('python', [
    './train/detect.py'
  ]);
  process.stdout.on('data', function(data) {
    console.log(data.toString());
    res.send(data.toString());
  });
});


module.exports = router;