angular
  .module("mathhammer", [])
  .controller("ModelController", ['$scope', ControllerFunction])

  	function ControllerFunction($scope) {

    var ctrl = this;

    //default html template when user adds model
    var model = "model.tpl.html"

    //this array holds all the html templates created by user
    ctrl.displayedTemplates = [];

    // array of all models so I can access specific models later
    ctrl.models = [];

    // initialize models with starting values to reduce console errors
    $scope.number = 0
    $scope.name = 'Model'
    $scope.attacks = 6
    $scope.bs = 0.5
    $scope.strength = 4
    $scope.save = 0.5
    $scope.ap = -0.16
    $scope.d = 2
    $scope.points = 10

    ctrl.addModel = function() {
      ctrl.displayedTemplates.push(model);
      ctrl.models.push({name: '', attacks: '', bs: '', strength: '', save: '', ap: '', d: '', points: ''})
      $scope.calc = function(number,name,attacks,bs,strength,save,ap,d,points) {  
        
        //calculate things
        let hits = attacks*bs
        let woundst4 = hits*0.5
        let unsaved = woundst4*(1-(save+ap))
        let damage = unsaved*d
        let dpp = d/points
        
        //allow calculated values to be accessed in html
        $scope.hits = hits
        $scope.woundst4 = woundst4
        $scope.unsaved = unsaved
        $scope.damage = damage
        $scope.dpp = dpp

        // Push models to an array so I can access specific models later (for graph/display purposes)
        ctrl.models[number].name = name
        ctrl.models[number].attacks = attacks
        ctrl.models[number].bs = bs
        ctrl.models[number].strength = strength
        ctrl.models[number].save = save
        ctrl.models[number].ap = ap
        ctrl.models[number].d = d
        ctrl.models[number].points = points

        // number is a temporary solution. Users should not have to input the index number of every model. I want a unique index number to generate automatically for each model that is made.
      } 
    }
  };