window.app = angular
.module("mathhammer", [])

.controller("ModelController", ['$scope', function ControllerFunction($scope) {

  // array of all models so I can access specific models later
  $scope.models = [];

  // initialize models with starting values to reduce console errors
  // var initialModel = {
  //   name: 'Model',
  //   attacks: 6,
  //   bs: 0.5,
  //   strength: 4,
  //   save: 0.5,
  //   ap: 0,
  //   d: 1,
  //   points: 10,
  //   damageT3: 0,
  //   damageT4: 0,
  //   damageT5: 0,
  //   damageT6: 0,
  //   damageT7: 0,
  //   damageT8: 0,
  //   dppT3: 0,
  //   dppT4: 0,
  //   dppT5: 0,
  //   dppT6: 0,
  //   dppT7: 0,
  //   dppT8: 0
  // };
  var initialModel = {
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
    $scope.models.push(Object.assign({}, initialModel));
  };

}]);
