window.app = angular
.module("mathhammer", [])

.controller("ModelController", ['$scope', function ControllerFunction($scope) {


  // array of all models so I can access specific models later. 
  $scope.models = [];

  //chart
  function updateGraph() {
    var chartData = []

    for (var i=0;i<$scope.models.length;i++){
      chartData.push({
        label: $scope.models[i].name,
        backgroundColor: 'rgba(255, 255, 255, .4)', 
        borderColor: 'rgb(255, 99, 132)', 
        data: $scope.models[i].damage
      })
    }
    var damageCanvas = document.getElementById("damageChart").getContext('2d');
    var damageChart = new Chart(damageCanvas, {
      type: 'line',
      data: {
        labels: ["T3", "T4", "T5", "T6", "T7", "T8"],
        datasets: chartData,
      },
      options: {} 
      })
  }

  //initial run
  updateGraph();
  //
  $scope.$watch('models', updateGraph, true);

  //add new model object to array of all models
  $scope.addModel = function() {

    var newModel = {
      name: 'Model' + ' ' + ($scope.models.length+1),
      attacks: 6,
      bs: 0.5,
      strength: 4,
      save: 0.5,
      ap: 0,
      d: 1,
      points: 10,
      damage: [],
      dpp: []
    };

    $scope.models.push(Object.assign({}, newModel))
  };


}]);
