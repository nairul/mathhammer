app.directive('myInputs', function() {
  return {
    restrict: 'E',
    templateUrl: 'model.tpl.html',
    scope: {
      model: "="
    },
    link: function(scope, elem, attr) {
      //calculate things
      scope.hits = scope.model.attacks*scope.model.bs
      scope.woundst4 = scope.model.hits*0.5
      scope.unsaved = scope.model.woundst4*(1-(scope.model.save+scope.model.ap))
      scope.damage = scope.unsaved*scope.model.d
      scope.dpp = scope.model.d/scope.model.points
    }
  };
});
