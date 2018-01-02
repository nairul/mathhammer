angular
  .module("mathhammer", [])
  .controller("ModelController", ['$scope', ControllerFunction])

  	function ControllerFunction($scope) {
    var ctrl = this;
    
    var models = ["model.tpl.html"];
    
    ctrl.displayedModels = [];
    
    ctrl.addModel = function(modelIndex) {
      ctrl.displayedModels.push(models[modelIndex]
        );
      $scope.calc = function(attacks,bs,save,ap,d,points) {
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
    } 
  }
  };