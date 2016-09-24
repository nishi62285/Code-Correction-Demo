var mongoose = require('mongoose');
var PocSchema = new mongoose.Schema({
    value : String,
    count : Number
});

mongoose.model('Poc', PocSchema);