window.app = angular
.module("mathhammer", [])

.controller("ModelController", ['$scope', function ControllerFunction($scope) {

  // array of all models so I can access specific models later. 
  // start with 1 initial model on the page
  $scope.models = [{
    name: 'Model',
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
    name: 'Model',
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
    $scope.models.push(Object.assign({}, newModel));
  };


}]);
