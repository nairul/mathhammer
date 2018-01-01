angular
.module("myApp", [])
.controller('ctrl',['$scope', function ($scope) {
    $scope.logId = function() {
        console.log($scope.id);
    }
}]);