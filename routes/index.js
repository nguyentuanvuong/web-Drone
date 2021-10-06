const express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.render('index');
  });
router.get('/connect-camera',(req,res)=>{
  res.render('camera');
    });
router.get('/ALlCam',(req,res)=>{
    res.render('ALlCam');
  });
router.get('/Mission',(req,res)=>{
    res.render('Mission');
});
router.get('/lora-map',(req, res)=>{
  res.render('mapLora');
});
router.get('/bank',(req,res)=>{
    res.render('bank');
  });
router.get('/chat',(req,res)=>{
    res.render('bank');
  });
router.get('/login',(req,res)=>{
    res.render('login');
  });
module.exports = router;