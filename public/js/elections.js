var app = angular.module('electionsApp', []);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

function ElectionsController($http, $window, $scope) {
    this.name = '';
    this.votersNumber = 0;
    this.candidateList = [];
    this.candidateName = '';
    this.candidateLastName = '';
    this.candidatePhoto = '';

    this.elec = '';
    this.elecVote = '';
    $scope.electionsList = [];
    
    this.code = '';

    this.addCandidate = function() {
        this.candidateList.push({
            name: this.candidateName,
            lastName: this.candidateLastName,
            photo: '<img class="media-object" src="' + this.candidatePhoto + '" alt="Foto" style="height: 250px; width: 250px; display: block;">'
        });
        this.candidateName = '';
        this.candidateLastName = '';
        this.candidatePhoto = '';
    };

    this.create = function() {
        var data = {
            candidateList: this.candidateList,
            name: this.name,
            votersNumber: this.votersNumber
        };
        $http.post('/nuevaEleccion', data).then(function(res) {
            $window.location.href = '/';
        }, function() {
            console.log('Error 1');
        });
    };

    this.load = function() {
        $http.get('/nuevaEleccion/all').then(function(res) {
            $scope.electionsList = res.data;
        }, function() {
            console.log('Error 2');
        });
    };

    this.view = function() {
        if (this.elec != '') {
            $window.location.href = "/eleccion/?id=" + this.elec;
        }
    };
    
    this.vote = function() {
        if (this.elecVote != '') {
            $window.location.href = "/votar/?id=" + this.elecVote;
        }
    };
}

app.filter('unsafe', function($sce) {
    return $sce.trustAsHtml;
});

app.controller('ElectionsController', ['$http', '$window', '$scope', ElectionsController]);