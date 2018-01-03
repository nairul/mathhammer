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
        scope.hits = scope.model.attacks*scope.model.bs;
        
        var WoundChances = []
        var Wounds = []
        var Unsaved = []  
        
        for (i=0;i<6;i++) {
          //calculate wound chances for T3..T8
          if (scope.model.strength == i+3) {
              WoundChances[i] = 3/6
            } else if (scope.model.strength <= (i+3)/2) {
              WoundChances[i] = 1/6
            } else if (scope.model.strength < i+3) {
              WoundChances[i] = 2/6
            } else if (scope.model.strength >= (i+3)*2) {
              WoundChances[i] = 5/6
            } else if (scope.model.strength > i+3) {
              WoundChances[i] = 4/6
            }
          }
          for (i=0;i<6;i++) {
            //calculate wounds for T3..T8
            Wounds[i] = WoundChances[i]*scope.hits
          }
          for (i=0;i<6;i++) {
            //calculate unsaved wounds for T3..T8
            Unsaved[i] = Wounds[i]*(1-(scope.model.save+scope.model.ap))
          }
          for (i=0;i<6;i++) {
            //calculate damage for T3..T8
            scope.model.damage[i] = Unsaved[i]*scope.model.d
          }
          for (i=0;i<6;i++) {
            //calculate dpp for T3..T8
            scope.model.dpp[i] = scope.model.damage[i]/scope.model.points        
          }
        //calculate wounds for T3..T8
        // scope.wounds = []
        // scope.woundsT3 = WoundChances[0]*scope.hits
        // scope.woundsT4 = WoundChances[1]*scope.hits
        // scope.woundsT5 = WoundChances[2]*scope.hits
        // scope.woundsT6 = WoundChances[3]*scope.hits
        // scope.woundsT7 = WoundChances[4]*scope.hits
        // scope.woundsT8 = WoundChances[5]*scope.hits
        // //calculate unsaved wounds for T3..T8
        // scope.unsavedT3 = scope.woundsT3*(1-(scope.model.save+scope.model.ap));
        // scope.unsavedT4 = scope.woundsT4*(1-(scope.model.save+scope.model.ap));
        // scope.unsavedT5 = scope.woundsT5*(1-(scope.model.save+scope.model.ap));
        // scope.unsavedT6 = scope.woundsT6*(1-(scope.model.save+scope.model.ap));
        // scope.unsavedT7 = scope.woundsT7*(1-(scope.model.save+scope.model.ap));
        // scope.unsavedT8 = scope.woundsT8*(1-(scope.model.save+scope.model.ap));
        //calculate damage for T3..T8
        // scope.model.damageT3 = scope.unsavedT3*scope.model.d;
        // scope.model.damageT4 = scope.unsavedT4*scope.model.d;
        // scope.model.damageT5 = scope.unsavedT5*scope.model.d;
        // scope.model.damageT6 = scope.unsavedT6*scope.model.d;
        // scope.model.damageT7 = scope.unsavedT7*scope.model.d;
        // scope.model.damageT8 = scope.unsavedT8*scope.model.d;
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
