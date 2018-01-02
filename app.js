angular
  .module("mathhammer", [])
  .controller("ModelController", ['$scope', ControllerFunction])

  	function ControllerFunction($scope) {

    var ctrl = this;
    var template = "model.tpl.html"
    
    ctrl.displayedTemplates = [];
    // ctrl.models = function Model(name,attacks,bs,save,ap,d,points) {
    //   this.name = name
    //   this.attacks = attacks
    //   this.bs = bs
    //   this.save = save
    //   this.ap = ap
    //   this.d = d
    //   this.points = points
    // }

    ctrl.addTemplate = function() {
      ctrl.displayedTemplates.push(template);
      $scope.calc = function(name,attacks,bs,save,ap,d,points) {  
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