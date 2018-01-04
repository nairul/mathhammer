app.directive('myInputs', function() {
  return {
    restrict: 'E',
    templateUrl: 'model.tpl.html',
    scope: {
      model: "="
    },
    link: function(scope, elem, attr) {
      function updateValues() {
        //calculate hits
        scope.hits = scope.model.attacks*scope.model.bs
        
        var wound_chances = []
        var wounds = []
        var unsaved = []
        var damage = []
        var dpp = []  
        
        for (var i=0;i<6;i++) {
          //calculate wound chances for T3..T8
          if (scope.model.strength == i+3) {
              wound_chances[i] = 3/6
            } else if (scope.model.strength <= (i+3)/2) {
              wound_chances[i] = 1/6
            } else if (scope.model.strength < i+3) {
              wound_chances[i] = 2/6
            } else if (scope.model.strength >= (i+3)*2) {
              wound_chances[i] = 5/6
            } else if (scope.model.strength > i+3) {
              wound_chances[i] = 4/6
            }
            //calculate wounds for T3..T8
            wounds[i] = wound_chances[i]*scope.hits
            //calculate unsaved wounds for T3..T8
            unsaved[i] = wounds[i]*(1-(scope.model.save+scope.model.ap))
            // //calculate damage for T3..T8
            damage[i] = unsaved[i]*scope.model.d
            // //calculate dpp for T3..T8
            dpp[i] = scope.model.damage[i]/scope.model.points        
          }
        //update arrays from app.js
      scope.model.damage = damage
      scope.model.dpp = dpp

      };

      // initial run
      updateValues();

      //
      scope.$watch("model", updateValues, true);

    }
  };
});