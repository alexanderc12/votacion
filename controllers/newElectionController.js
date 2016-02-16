var express = require('express');
var router = express.Router();
var Election = require('../models/election');
var Person = require('../models/person');

router.get('/', function(req, res) {
    res.render('newElection.html');
});

router.get('/all', function(req, res) {
    Election.find(function(err, elections) {
        if (err) {
            console.log(err);
        }
        res.json(elections);
    });
});

router.post('/', function(req, res) {
    var election = new Election({
        name: req.body.name,
        votersNumber: req.body.votersNumber,
        candidateList: req.body.candidateList
    });
    election.save(function(err) {
        if (err) {
            console.log(err);
        }
        for (var i = 0; i < req.body.votersNumber; i++) {
            var person = new Person({
                code: makeid(),
                idElection: election._id
            });
            person.save(function(err) {
                if (err) {
                    console.log(err);
                }
            });
        };
        res.send('ok');
    });
});

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

module.exports = router;