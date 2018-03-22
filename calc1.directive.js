app.directive('calc1', function() {
  return {
    restrict: 'E',
    templateUrl: 'calc1.tpl.html',
    scope: {
      model: "=",
      models: "=",
      rolls: "=",
      index: "="
    },
    link: function(scope, elem, attr) {
      function grabHeight() {
      var elementA = angular.element(document.querySelectorAll('.models-grid'))
      var elementB = angular.element(document.querySelectorAll('.calcs-grid'))
      var heightA = elementA[0].offsetHeight;
      var heightB = elementB[0].offsetHeight;
      scope.model.height = heightA 

      }
      grabHeight()
      scope.$watch('model', grabHeight, true)
    }
    }
  }
});