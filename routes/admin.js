const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/index');
});

module.exports = router;