window.app = angular
.module("mathhammer", [])

.controller("ModelController", ['$scope', function ControllerFunction($scope) {

  // array of all models so I can access specific models later
  $scope.models = [];

  // initialize models with starting values to reduce console errors
  var initialModel = {
    name: 'Model',
    attacks: 6,
    bs: 0.5,
    strength: 4,
    save: 0.5,
    ap: -0.16,
    d: 2,
    points: 10
  };

  $scope.addModel = function() {
    //add new model object to array of all models
    $scope.models.push(Object.assign({}, initialModel));
  };

}]);
