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
      $scope.hits = function(attacks,bs) {
      hits = attacks*bs
      return hits      
      }
      $scope.wounds = function() {
      wounds = hits*0.5
      return wounds
      }
    }
    
  };