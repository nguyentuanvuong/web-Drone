const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
      const { originalname } = file;
      cb(null, originalname);
  }
})
const upload = multer({ dest: 'uploads/' }); // or simply { dest: 'uploads/' }

router.post('/update/dataset', upload.single('dataset'),(req,res)=>{
  return res.json({ status: 'OK', uploaded: req.files.length });
});

module.exports = router;