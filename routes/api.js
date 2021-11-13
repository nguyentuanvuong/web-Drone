const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        if (file.mimetype.split("/")[1] == 'x-zip-compressed') {
            cb(null, `${makeid(50)}.zip`);
        } else {
            cb(new Error("Not a zip File!!"), false);
        }
    }
})

const upload = multer({
    storage
});

const dir = './';

router.post('/update-dataset', upload.single('dataset'), (req, res) => {
    res.json(req.file);
});

router.get('/list-file',(req, res)=>{
    const files = fs.readdirSync(dir);
    res.json(files);
    
});

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

module.exports = router;