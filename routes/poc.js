var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Poc = mongoose.model('Poc');
var html_dir = './view/';
/* GET users listing. */
var app = express();
var path = require('path');
app.use(express.static('public'));

router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/view/', 'Poc.html'));

});

router.get('/GetData', function (req, res, next) {
    
    Poc.find(function (error, pocs) {
        if (error) { return next(error); }
        if (!pocs) { return next(new Error('Not Found!!')); }
        res.end(JSON.stringify(pocs));
    });
    
    
});

module.exports = router;
