angular
  .module("mathhammer", [])
  .controller("ModelController", ['$scope', ControllerFunction])

  	function ControllerFunction($scope) {

    var ctrl = this;
    var model = "model.tpl.html"

    ctrl.displayedModels = [];
    ctrl.models = [];
 
 $scope.number = 0
 $scope.name = 'Model'
 $scope.attacks = 6
 $scope.bs = 0.5
 $scope.save = 0.5
 $scope.ap = -0.16
 $scope.d = 2
 $scope.points = 10


    ctrl.addModel = function() {
      ctrl.displayedModels.push(model);
      ctrl.models.push({name: '', attacks: ''})
      $scope.calc = function(number,name,attacks,bs,save,ap,d,points) {  
        let hits = attacks*bs
        let woundst4 = hits*0.5
        let unsaved = woundst4*(1-(save+ap))
        let damage = unsaved*d
        let dpp = d/points
        $scope.hits = hits
        $scope.woundst4 = woundst4
        $scope.unsaved = unsaved
        $scope.damage = damage
        $scope.dpp = dpp

        ctrl.models[number].name = name
        ctrl.models[number].attacks = attacks

        // number variable is a temporary solution. Users should not have to input the index number of every model. I want a unique index number to generate automatically for each model that is made.
      } 
    }
  };