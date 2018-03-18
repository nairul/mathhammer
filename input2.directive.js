app.directive('input2', function() {
  return {
    restrict: 'E',
    templateUrl: 'input2.tpl.html',
    scope: {
      model: "=",
      models: "="
    },
    link: function(scope, elem, attr) {
      function calculate() {
        scope.deleteModel = function(model) {
          var index = scope.models.indexOf(model)
          scope.models.splice(index, 1)  
        }
        function add(a, b) {
          return a + b;
        }
        //grab input
        var selection = scope.model.selection
        var points = scope.model.points
        //
        var selectionDamage = []
        var damageT3 = []
        var damageT4 = []
        var damageT5 = []
        var damageT6 = []
        var damageT7 = []
        var damageT8 = []
        var damage = []
        var dpp = []

        if (selection.length>0){
          for (i=0;i<selection.length;i++) {
            selectionDamage.push(selection[i].damage)
            damageT3.push(selectionDamage[i][0])
            damageT4.push(selectionDamage[i][1])
            damageT5.push(selectionDamage[i][2])
            damageT6.push(selectionDamage[i][3])
            damageT7.push(selectionDamage[i][4])
            damageT8.push(selectionDamage[i][5])
          }
            damage[0] = damageT3.reduce(add, 0)
            damage[1] = damageT4.reduce(add, 0)
            damage[2] = damageT5.reduce(add, 0)
            damage[3] = damageT6.reduce(add, 0)
            damage[4] = damageT7.reduce(add, 0)
            damage[5] = damageT8.reduce(add, 0)
            dpp[0] = damage[0]/points
            dpp[1] = damage[1]/points
            dpp[2] = damage[2]/points
            dpp[3] = damage[3]/points
            dpp[4] = damage[4]/points
            dpp[5] = damage[5]/points
        }
        scope.model.damage = damage
        scope.model.dpp = dpp
      }

      //initial run
      calculate();
      scope.$watch("model", calculate, true);
    }
   };
  
})