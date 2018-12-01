var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/locations', db.getAlllocation);
router.get('/api/locations/:id', db.getSinglelocation);
router.post('/api/locations', db.createlocation);
router.put('/api/locations/:id', db.updatelocation);
router.delete('/api/locations/:id', db.removelocation);


module.exports = router;