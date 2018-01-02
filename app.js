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
    }
$scope.logId = function() {
      console.log($scope.id)
      }
    
  };