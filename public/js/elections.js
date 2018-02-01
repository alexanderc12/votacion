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

    this.elec = '';
    this.elecVote = '';
    $scope.electionsList = [];
    
    this.code = '';

    this.addCandidate = function() {
        var form = new FormData();
        form.append('photo',  $scope.imageSrc);
        $http.post('/nuevaEleccion/photo', form, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function(res) {
            this.candidateList.push({
                name: this.candidateName,
                lastName: this.candidateLastName,
                photo: '<img class="media-object" src="' + res.data + '" alt="Foto" style="height: 250px;' +
                ' width: 250px; display: block;">'
            });
            angular.element('#myModal').modal('hide');
        }.bind(this), function() {
            console.log('Error 1');
        });
    };

    this.openDialogNewCandidate = function () {
        this.cleanDialogNewCandidate();
        angular.element('#myModal').modal('show');
    }

    this.cleanDialogNewCandidate = function () {
        this.candidateName = '';
        this.candidateLastName = '';
        document.getElementById("file").value = null;
        $scope.imageSrc = '';
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
            console.log('Error al crear eleccion.');
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

    this.loadFile = function (files) {
        var reader = new FileReader();
        reader.addEventListener("load", function () {
            $scope.imageSrc = reader.result;
            $scope.$apply();
        }, false);
        reader.readAsDataURL(files[0]);
    };
}

app.filter('unsafe', function($sce) {
    return $sce.trustAsHtml;
});

app.controller('ElectionsController', ['$http', '$window', '$scope', ElectionsController]);