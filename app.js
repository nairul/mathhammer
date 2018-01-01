angular
  .module("mathhammer", [])
  .controller("MathhammerController", 
    [MathhammerControllerFunction
  ])

function MathhammerControllerFunction () {
  this.models= modelData
  this.addModel = function() {
    let model = {name: this.newModel.name, attacks: this.newModel.attacks, bs: this.newModel.bs}
    this.models.push(model)
  }
}

let modelData = [
  { name: 'Bolter', attacks: '2', bs: '0.5' },
  { name: 'Heavy Bolter', attacks: '3', bs: '0.33' }
]