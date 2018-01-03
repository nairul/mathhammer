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
      scope.model.damage = damage
      scope.model.dpp = dpp
        // calculate damage for T3..T8
        // scope.model.damageT3 = unsaved[0]*scope.model.d;
        // scope.model.damageT4 = unsaved[1]*scope.model.d;
        // scope.model.damageT5 = unsaved[2]*scope.model.d;
        // scope.model.damageT6 = unsaved[3]*scope.model.d;
        // scope.model.damageT7 = unsaved[4]*scope.model.d;
        // scope.model.damageT8 = unsaved[5]*scope.model.d;
        // //calculate damage per point for T3..T8
        // scope.model.dppT3 = scope.model.damageT3/scope.model.points
        // scope.model.dppT4 = scope.model.damageT4/scope.model.points
        // scope.model.dppT5 = scope.model.damageT5/scope.model.points
        // scope.model.dppT6 = scope.model.damageT6/scope.model.points
        // scope.model.dppT7 = scope.model.damageT7/scope.model.points
        // scope.model.dppT8 = scope.model.damageT8/scope.model.points
      };

      // initial run
      updateValues();

      //
      scope.$watch("model", updateValues, true);
    }
  };
});
