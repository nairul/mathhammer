window.app = angular
.module("mathhammer", [])

.controller("ModelController", ['$scope', function ControllerFunction($scope) {
  //default type
  $scope.type = {
    isCombi: false
  };
  //array of all models
  $scope.models = [];
  //array of colors
  var colorPallet = [
    {
      color: '#e6194b',
      inUse: false
    },
    {
      color: '#3cb44b',
      inUse: false
    },
    {
      color: '#ffe119',
      inUse: false
    },
    {
      color: '#0082c8',
      inUse: false
    },
    {
      color: '#f58231',
      inUse: false
    },
    {
      color: '#911eb4',
      inUse: false
    },
    {
      color: '#46f0f0',
      inUse: false
    },
    {
      color: '#f032e6',
      inUse: false
    },
    {
      color: '#d2f53c',
      inUse: false
    },
    {
      color: '#fabebe',
      inUse: false
    }
  ];
   
  //exact roll probabilities
  var twoPlus = 5/6
  var threePlus = 4/6
  var fourPlus = 3/6
  var fivePlus = 2/6
  var sixPlus = 1/6
  //roll options
  $scope.rolls = [
    {name:'2+', value: twoPlus},
    {name:'3+', value: threePlus},
    {name:'4+', value: fourPlus},
    {name:'5+', value: fivePlus},
    {name:'6+', value: sixPlus},
    {name:'7+', value: 0}
  ]
  // $scope.mods = [
  //   {name:'1', value: twoPlus},
  //   {name:'-1', value: twoPlus},
  //   {name:'0', value: twoPlus},
  //   {name:'1', value: twoPlus},
  //   {name:'2', value: threePlus},
  //   {name:'3', value: fourPlus},
  //   {name:'4', value: fivePlus},
  //   {name:'5', value: sixPlus},
  // ]  
  // {name:'D3', value: 2},
  // {name:'2D3', value: 4},
  // {name:'D6', value: 3.5},
  // {name:'2D6', value: 7},
  // {name:'3D6', value: 2}

  //add new model object to array of all models
  $scope.addModel = function() {
    var colorItem = colorPallet.find(a => !a.inUse)
    colorItem.inUse = true
    var newCombiModel = {
      isCombi: true,
      selection: [],
      name: 'Model' + ' ' + ($scope.models.length+1),
      points: 10,
      damage: [],
      dpp: [],
      // color: colorPallet[$scope.models.length]
      color: colorItem.color
      // color: colorPallet.find(function(element){
      //   return !element.inUse
      // }).color
    };

    var newModel = {
      //height
      // height: 100,
      //basic default
      isCombi: false,
      name: 'Model' + ' ' + ($scope.models.length+1),
      attacks: 6,
      skill: $scope.rolls[1],
      strength: 4,
      save: $scope.rolls[1],
      ap: 0,
      d: 1,
      points: 10,
      //advanced default
      rerolls: {
        hits: {
          ones: false,
          failed: false,
        },
        wounds: {
          ones: false,
          failed: false,
        }
      },

      hitMod: 0,
      hitTrigger: {
        trigger: false,
        roll: $scope.rolls[4],
        attacks: 0,
        hit: 0,
        mortals: 0},

      woundMod: 0,
      woundTrigger: {
        trigger: false,
        roll: $scope.rolls[4],
        mortals: 0,
        d: 0,
        ap: 0
      },

      autoWound: {
        auto: false,
        roll: $scope.rolls[2],
      },
      //hit calculations
      roundHit: [0,0,0,0],
      roundHitTriggers: [0,0,0,0],
      roundHitRerolls: [0,0],
      bonusAttacks: 0,
      hitTriggersTotal: 0,
      hitTotal: 0,
      //wound calculations
      roundWound: [],
      roundWoundTriggers: [],
      roundWoundRerolls: [],
      woundTriggersTotal : [],
      woundTotal: [],
      //unsaved calculations
      unsavedTriggers: [],
      unsavedTotal: [],
      regDamage: [],
      mortals : [],
      //results
      damage: [],
      avgDamage: 0,
      dpp: [],
      //color
      colorItem: colorItem
      //css
    };

    $scope.models.push(Object.assign({},
      $scope.type.isCombi ? newCombiModel : newModel));

    //graph
    function generateDamageData() {
      return  $scope.models.map(function(model, index) {
          return {
            label: model.name,
            backgroundColor: 'rgba(255, 255, 255, 0)',
            borderColor: model.colorItem.color,
            data: model.damage
          };
        })
    }
    function generateDppData() {
      return  $scope.models.map(function(model, index) {
          return {
            label: model.name,
            backgroundColor: 'rgba(255, 255, 255, 0)',
            borderColor: model.colorItem.color,
            data: model.dpp
          };
        })
    }
    //Damage Chart
    var damageChart = new Chart(document.getElementById("damage-chart").getContext('2d'), {
      type: 'line',
      data: {
        labels: ["T3", "T4", "T5", "T6", "T7", "T8"],
        datasets: generateDamageData()
      },
      // maintainAspectRatio: false,
      options: {
        title: {
            display: true,
            text: 'Damage'
          },        
        responsive: true,
        maintainAspectRatio: true,
        elements: {
              line: {
                  tension: 0, // disables bezier curves
              }
          }
      }
    });
    //DPP Chart
    var dppChart = new Chart(document.getElementById("dpp-chart").getContext('2d'), {
      type: 'line',
      data: {
        labels: ["T3", "T4", "T5", "T6", "T7", "T8"],
        datasets: generateDppData()
      },
      // maintainAspectRatio: false,
      options: {
        title: {
            display: true,
            text: 'Damage Per Point (DPP)'
          },
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
      damageChart.data.datasets = generateDamageData();
      dppChart.data.datasets = generateDppData();
      damageChart.update();
      dppChart.update();
    }, true);

  };

}]);
