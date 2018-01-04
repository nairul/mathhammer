window.app = angular
.module("mathhammer", [])

.controller("ModelController", ['$scope', function ControllerFunction($scope) {


  // array of all models so I can access specific models later.
  $scope.models = [];

  function generateDataSet() {
    return  $scope.models.map(function(model) {
        return {
          label: model.name,
          backgroundColor: 'rgba(255, 255, 255, .4)',
          borderColor: 'rgb(255, 99, 132)',
          data: model.damage
        };
      })
  }

  var damageChart = new Chart(document.getElementById("damage-chart").getContext('2d'), {
    type: 'line',
    data: {
      labels: ["T3", "T4", "T5", "T6", "T7", "T8"],
      datasets: generateDataSet()
    },
    options: {
      animation: {
        duration: 0
      }
    }
  });

  $scope.$watch('models', function updateGraph() {
    damageChart.data.datasets = generateDataSet();
    damageChart.update();
  }, true);

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
