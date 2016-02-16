var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ElectionSchema = new Schema({
    name: String,
    votersNumber: Number,
    candidateList: [{ name: String, lastName: String, photo: String }]
    
});

module.exports = mongoose.model('Election', ElectionSchema);