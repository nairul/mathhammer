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
        //calculate chances to wound for T3..T8
      var WoundChances = []  
        for (i=0;i<6;i++) {
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
        //calculate wounds for T3..T8
        scope.woundsT3 = WoundChances[0]*scope.hits
        scope.woundsT4 = WoundChances[1]*scope.hits
        scope.woundsT5 = WoundChances[2]*scope.hits
        scope.woundsT6 = WoundChances[3]*scope.hits
        scope.woundsT7 = WoundChances[4]*scope.hits
        scope.woundsT8 = WoundChances[5]*scope.hits
        //calculate unsaved wounds for T3..T8
        scope.unsavedT3 = scope.woundsT3*(1-(scope.model.save+scope.model.ap));
        scope.unsavedT4 = scope.woundsT4*(1-(scope.model.save+scope.model.ap));
        scope.unsavedT5 = scope.woundsT5*(1-(scope.model.save+scope.model.ap));
        scope.unsavedT6 = scope.woundsT6*(1-(scope.model.save+scope.model.ap));
        scope.unsavedT7 = scope.woundsT7*(1-(scope.model.save+scope.model.ap));
        scope.unsavedT8 = scope.woundsT8*(1-(scope.model.save+scope.model.ap));
        //calculate damage for T3..T8
        scope.damageT3 = scope.unsavedT3*scope.model.d;
        scope.damageT4 = scope.unsavedT4*scope.model.d;
        scope.damageT5 = scope.unsavedT5*scope.model.d;
        scope.damageT6 = scope.unsavedT6*scope.model.d;
        scope.damageT7 = scope.unsavedT7*scope.model.d;
        scope.damageT8 = scope.unsavedT8*scope.model.d;
        //calculate damage per point for T3..T8
        scope.dppT3 = scope.damageT3/scope.model.points;
        scope.dppT4 = scope.damageT4/scope.model.points;
        scope.dppT5 = scope.damageT5/scope.model.points;
        scope.dppT6 = scope.damageT6/scope.model.points;
        scope.dppT7 = scope.damageT7/scope.model.points;
        scope.dppT8 = scope.damageT8/scope.model.points;
      };

      // initial run
      updateValues();

      //
      scope.$watch("model", updateValues, true);
    }
  };
});
