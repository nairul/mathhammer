app.directive('myInputs', function() {
  return {
    restrict: 'E',
    templateUrl: 'model.tpl.html',
    scope: "=",
    link: function(scope, elem, attr) {
      $scope.calc = function(index,name,attacks,bs,strength,save,ap,d,points) {
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

        // Push models to an array so I can access specific models later for graph/display purposes
        $scope.models[index].name = name
        $scope.models[index].attacks = attacks
        $scope.models[index].bs = bs
        $scope.models[index].strength = strength
        $scope.models[index].save = save
        $scope.models[index].ap = ap
        $scope.models[index].d = d
        $scope.models[index].points = points

        // user index variable is a temporary solution. Users should not have to input the index number of every model. I want a unique index number to generate automatically for each model that is made.
      }
    };
  };
});
