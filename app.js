window.app = angular
.module("mathhammer", [])

.controller("ModelController", ['$scope', function ControllerFunction($scope) {


  // array of all models so I can access specific models later. 
  $scope.models = [{
  // start with 1 model on the page
    name: 'Model 1',
    attacks: 6,
    bs: 0.5,
    strength: 4,
    save: 0.5,
    ap: 0,
    d: 1,
    points: 10,
    damage: [],
    dpp: []
  }];

  var newModel = {
    name: 'Model' + ' ' + $scope.models.length, // why doesn't this work
    attacks: 6,
    bs: 0.5,
    strength: 4,
    save: 0.5,
    ap: 0,
    d: 1,
    points: 10,
    damage: [],
    dpp: []
  };

  $scope.addModel = function() {
    //add new model object to array of all models
    $scope.models.push(Object.assign({}, newModel))
  };


}]);
