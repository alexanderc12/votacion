var express = require('express');
var router = express.Router();
var Election = require('../models/election');
var Person = require('../models/person');

router.get('/', function(req, res) {
    Election.findOne({
        '_id': req.query.id
    }, 'name votersNumber candidateList', function(err, election) {
        if (err) console.log(err);
        Person.find({
            'idElection': req.query.id
        }, function(err, personList) {
            if (err) return console.error(err);
            var result = [];
            for (var i = 0; i < election.candidateList.length; i++) {
                var count = 0;
                for (var j = 0; j < personList.length; j++) {
                    if(personList[j].idCandidate == election.candidateList[i]._id){
                        count++;
                    }
                }
                result.push({name: election.candidateList[i].name + ' '+ election.candidateList[i].lastName, votes: count});
            }

            res.render('election.html', {
                elect: election,
                persons: personList,
                resultList: result
            });
        })
    });
});

module.exports = router;