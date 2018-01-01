angular.module("mathhammer", [])
  .controller("ModelController", function() {
    var ctrl = this;
    
    var models = [
      "model.tpl.html"
    ];
    
    ctrl.displayedModels = [];
    
    ctrl.addModel = function(modelIndex) {
      ctrl.displayedModels.push(models[modelIndex]);
    }

    ctrl.calcHits = function() {
    	
    }
  });