window.app = angular
.module("mathhammer", [])

.controller("ModelController", ['$scope', function ControllerFunction($scope) {


  // array of all models so I can access specific models later.
  $scope.models = [];

  var colorPallet = [
    '#e6194b',
    '#3cb44b',
    '#ffe119',
    '#0082c8',
    '#f58231',
    '#911eb4',
    '#46f0f0',
    '#f032e6',
    '#d2f53c',
    '#fabebe'
  ];

  function generateDataSet() {
    return  $scope.models.map(function(model, index) {
        return {
          label: model.name,
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderColor: model.color,
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
    maintainAspectRatio: false,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      elements: {
            line: {
                tension: 0, // disables bezier curves
            }
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
      dpp: [],
      color: colorPallet[$scope.models.length]
    };

    $scope.models.push(Object.assign({}, newModel))
  };

}]);
