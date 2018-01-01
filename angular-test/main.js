var app = angular.module('addDivApp', []);

app.controller('addDivController', function($scope) {

});

app.directive('addDivDirective', function() {
  return {
    restrict: 'A',
    scope: true,
    template: '<button id="addDiv" class="btn btn-default" ng-click="click()">Add</button>',
    controller: function($scope, $element, $compile) {
      $scope.clicked = 0;
      $scope.click = function() {
        $('body').append($compile($('.form-group').clone())($scope));
      }
    }
  }
});