var express = require('express');
var router = express.Router();
var Election = require('../models/election');
var Person = require('../models/person');

router.get('/', function(req, res) {
    console.log(req.query.id);
    Election.findOne({
        '_id': req.query.id
    }, 'name candidateList', function(err, election) {
        if (err) console.log(err);
        Person.find({
            'idElection': req.query.id
        }, function(err, personList) {
            if (err) return console.error(err);
            res.render('vote.html', {
                elect: election,
                persons: personList
            });
        })
    });
});

router.get('/registrar', function(req, res) {
    Person.findOne({
        'code': req.query.code
    }, function(err, person) {
        if (err) {
            console.log(err);
            res.render('error.html');
        }
        if (person != null && person.idElection == req.query.eleccion && person.state == false) {
            person.state = true;
            person.idCandidate = req.query.candidato;
            person.save(function(err) {
                if (err) {
                    console.log(err);
                    res.render('error.html');
                }
                res.render('ok.html');
            });
        }
        else {
            res.render('error.html');
        }
    });
});

module.exports = router;