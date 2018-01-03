app.directive('myInputs', function() {
  return {
    restrict: 'E',
    templateUrl: 'model.tpl.html',
    scope: {
      model: "="
    },
    link: function(scope, elem, attr) {
      //calculate things
      function updateValues() {
        scope.hits = scope.model.attacks*scope.model.bs;
        
        if (scope.model.strength == 4) {
            scope.woundsT4 = 3/6*scope.hits
          } else if (scope.model.strength <= 4/2) {
            scope.woundsT4 = 1/6*scope.hits
          } else if (scope.model.strength < 4) {
            scope.woundsT4 = 2/6*scope.hits
          } else if (scope.model.strength >= 4*2) {
            scope.woundsT4 = 5/6*scope.hits
          } else if (scope.model.strength > 4) {
            scope.woundsT4 = 4/6*scope.hits
          }

        scope.unsaved = scope.woundsT4*(1-(scope.model.save+scope.model.ap));
        scope.damage = scope.unsaved*scope.model.d;
        scope.dpp = scope.model.d/scope.model.points;
      };

      // initial run
      updateValues();

      //
      scope.$watch("model", updateValues, true);
    }
  };
});
