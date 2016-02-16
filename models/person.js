var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
    code : String,
    idElection : String,
    state: { type: Boolean, default: false },
    idCandidate: { type: String, default: '' }
});

module.exports = mongoose.model('Person', PersonSchema);