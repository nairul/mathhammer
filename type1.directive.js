app.directive('type1', function() {
  return {
    restrict: 'E',
    templateUrl: 'type1.tpl.html',
    scope: {
      model: "=",
      models: "=",
      rolls: "="
    },
    link: function(scope, elem, attr) {
      //set exact probabilities
      // var twoPlus = 5/6
      // var threePlus = 4/6
      // var fourPlus = 3/6
      // var fivePlus = 2/6
      // var sixPlus = 1/6
      // //set default selections  
      // scope.rolls = [
      // {name:'2+', value: twoPlus},
      // {name:'3+', value: threePlus},
      // {name:'4+', value: fourPlus},
      // {name:'5+', value: fivePlus},
      // {name:'6+', value: sixPlus},
      // {name:'7+', value: 0}
      // ]
      
      // scope.model.skill = scope.rolls[1]
      // scope.model.save = scope.rolls[1]

      function calculate() {
        //for .reduce() method
        function add(a, b) {
          return a + b;
        }
        scope.deleteModel = function(model) {
          var index = scope.models.indexOf(model)
          scope.models.splice(index, 1)  
        } 

        //CALCULATE HITS
        //grab input
        var skill = scope.model.skill.value
        var attacks = scope.model.attacks
        var hitRerolls = {
          ones: scope.model.rerolls.hit.ones,
          failed: scope.model.rerolls.hit.failed
        }
        var hitMod = scope.model.hitMod/6
        var hitTrigger = {}
        if (scope.model.hitTrigger.trigger) {
          hitTrigger = {
            roll: scope.model.hitTrigger.roll.value,
            attacks: scope.model.hitTrigger.attacks,
            hit: scope.model.hitTrigger.hit,
            mortals: scope.model.hitTrigger.mortals}
        } else {
          hitTrigger = {
            roll: 0,
            attacks: 0,
            hit: 0,
            mortals: 0,
          }
        }
        //modified skill 
        var mSkill = 0
        if (skill+hitMod>5/6) {
          mSkill = 5/6
        } else {
          mSkill = skill+hitMod
        }
        //modified trigger
        var mHitTrigger = 0
        
          if (hitTrigger.roll+hitMod>5/6) {
            mHitTrigger = 5/6
          } else if (hitTrigger.roll>=0) {
            mHitTrigger = hitTrigger.roll+hitMod
          }      
        //values per round 
        var roundHit = [0,0,0,0]
        var roundHitRerolls = [0,0]
        var roundHitTriggers = [0,0,0,0]
        //round 1 hits
        if (hitRerolls.failed && hitMod>=0) {
          roundHit[0] = attacks*skill
        } else {
          roundHit[0] = attacks*mSkill
        }
        //round 1 triggers
        if (skill<mHitTrigger && hitRerolls.failed) {
          roundHitTriggers[0] = hitTrigger.roll*attacks
        } else {
          roundHitTriggers[0] = mHitTrigger*attacks
        }
        //round 2 rolls
        if (hitRerolls.failed) {
        roundHitRerolls[0] = attacks-(skill*attacks)
        } else if (hitRerolls.ones) {
          roundHitRerolls[0] = ((1/6)*attacks)
        }
        //round 2 hits
        roundHit[1] = (mSkill*roundHitRerolls[0])
        //round 2 triggers
        roundHitTriggers[1] = mHitTrigger*roundHitRerolls[0]
        //round 3 rolls
        var bonusAttacks = hitTrigger.attacks*(roundHitTriggers[0]+roundHitTriggers[1])
        //round 3 hits
        if (hitRerolls.failed && hitMod>=0) {
          roundHit[2] = bonusAttacks*skill
        } else {
          roundHit[2] = bonusAttacks*mSkill
        }
        //round 3 triggers
        if (skill<mHitTrigger && hitRerolls.failed) {
          roundHitTriggers[2] = hitTrigger.roll*bonusAttacks
        } else {
          roundHitTriggers[2] = mHitTrigger*bonusAttacks
        }
        //round 4 rolls
        if (hitRerolls.failed) {
        roundHitRerolls[1] = bonusAttacks-(skill*bonusAttacks)
        } else if (hitRerolls.ones) {
          roundHitRerolls[1] = ((1/6)*bonusAttacks)
        }
        //round 4 hits
        roundHit[3] = (mSkill*roundHitRerolls[1])
        //round 4 triggers
        roundHitTriggers[3] = mHitTrigger*roundHitRerolls[1]
        //total triggers
        var hitTriggersTotal = roundHitTriggers.reduce(add, 0)
        // total hits
        var hitTotal = 0
        if (skill == 1) {
          hitTotal = attacks 
        } else {
        hitTotal = (roundHit.reduce(add, 0)) + (hitTriggersTotal*hitTrigger.hit) - (hitTriggersTotal*hitTrigger.mortals)
        }
        // show calculations in HTML
        scope.model.roundHit = roundHit
        scope.model.roundHitTriggers = roundHitTriggers
        scope.model.roundHitRerolls = roundHitRerolls
        scope.model.bonusAttacks = bonusAttacks
        scope.model.hitTriggersTotal = hitTriggersTotal
        scope.model.hitTotal = hitTotal
        //CALCULATE WOUNDS/UNSAVED/DAMAGE/DPP 
        //grab input
        var save = scope.model.save.value
        var strength = scope.model.strength
        var ap = scope.model.ap/6
        var d = scope.model.d
        var points = scope.model.points
        var woundRerolls = {
          ones: scope.model.rerolls.wound.ones,
          failed: scope.model.rerolls.wound.failed
        }
        var woundMod = scope.model.woundMod/6
        var woundTrigger = {}
        if (scope.model.woundTrigger.trigger) {
          woundTrigger = {
            roll: scope.model.woundTrigger.roll.value,
            mortals: scope.model.woundTrigger.mortals,
            d: scope.model.woundTrigger.d,
            ap: scope.model.woundTrigger.ap/6}
        } else {
          woundTrigger = {
            roll: 0,
            mortals: 0,
            d: 0,
            ap: 0,
          }
        }
        var autoWound = {}
        if (scope.model.autoWound.auto) {
          autoWound = {
            auto: true,
            roll: scope.model.autoWound.roll.value
          }
        } else {
          autoWound = {
            auto: false,
            roll: 0
          }
        } 
        //modified trigger
        var mWoundTrigger = 0
        if (woundTrigger.roll+woundMod>5/6) {
          mWoundTrigger = 5/6
        } else if (woundTrigger.roll>=0) {
          mWoundTrigger = woundTrigger.roll+woundMod
        } 
        //
        var roundWound = []
        var roundWoundRerolls = []
        var roundWoundTriggers = []
        var woundChances = []
        var mWoundChances = []
        var woundTriggersTotal = []
        var woundTotal = []
        //chances to fail save
        var fail = 0
        var tFail = 0
        if (1-(save+ap) > 1) {
          fail = 1
        } else {
          fail = 1-(save + ap)
        }
        if (1-(save + woundTrigger.ap) > 1) {
          tFail = 1
        } else {
          tFail = 1-(save + woundTrigger.ap)
        }
        //
        var unsavedTriggers = []
        var unsavedTotal = []
        var regDamage = []
        var mortals = []
        var damage = []
        var dpp = []
        //iterate over T3..T8
        for (var i=0;i<6;i++) {
          //values per round for T3..T8
          roundWound.push([0,0])
          roundWoundRerolls.push(0)
          roundWoundTriggers.push([0,0])
          //wound chances for T3..T8
          if (autoWound.auto) {
            woundChances[i] = autoWound.roll
          } else if (scope.model.strength == i+3) {
                woundChances[i] = 3/6
            } else if (scope.model.strength <= (i+3)/2) {
                woundChances[i] = 1/6
              } else if (scope.model.strength < i+3) {
                woundChances[i] = 2/6
                } else if (scope.model.strength >= (i+3)*2) {
                woundChances[i] = 5/6
                  } else if (scope.model.strength > i+3) {
                woundChances[i] = 4/6
                    }
          //modified wound chances for T3..T8
          if ((woundChances[i] + woundMod) > 5/6) {
            mWoundChances[i] = 5/6
          } else {
            mWoundChances[i] = woundChances[i] + woundMod
          }
          //round 1 wounds for T3..T8
          if (woundRerolls.failed && woundMod >= 0) {
            roundWound[i][0] = hitTotal*woundChances[i]
          } else {
            roundWound[i][0] = hitTotal*mWoundChances[i]
          }          
          //round 1 triggers for T3..T8
          if (woundChances[i] < mWoundTrigger && woundRerolls.failed) {
            roundWoundTriggers[i][0] = woundTrigger.roll * hitTotal
          } else {
            roundWoundTriggers[i][0] = mWoundTrigger * hitTotal
          }
          //round 2 rolls for T3..T8
          if (woundRerolls.failed) {
            roundWoundRerolls[i] = hitTotal * woundChances[i] 
          } else if (woundRerolls.ones) {
            roundWoundRerolls[i] = (1/6) * hitTotal
          } else {
            roundWoundRerolls[i] = 0
          }
          //round 2 wounds for T3..T8
          roundWound[i][1] = mWoundChances[i] * roundWoundRerolls[i]
          //round 2 triggers for T3..T8
          roundWoundTriggers[i][1] = mWoundTrigger * roundWoundRerolls[i] 
          //total triggers for T3..T8
          woundTriggersTotal[i] = roundWoundTriggers[i][0] + roundWoundTriggers[i][1] 
          //total wounds for T3..T8
          woundTotal[i] = roundWound[i][0] + roundWound[i][1] 
          //unsaved from triggers for T3..T8
          if (woundTrigger.ap < 0) {
            unsavedTriggers[i] = woundTriggersTotal[i] * tFail
          } else {
            unsavedTriggers[i] = woundTriggersTotal[i] * fail
          }          
          //unsaved total for T3..T8
          unsavedTotal[i] = unsavedTriggers[i]+((woundTotal[i] - woundTriggersTotal[i]) * fail) 
          //regular damage for T3..T8 
          if (woundTrigger.d > 0) {
            regDamage[i] = (unsavedTriggers[i] * woundTrigger.d) + ((unsavedTotal[i] - unsavedTriggers[i]) * d) 
          } else {
            regDamage[i] = unsavedTotal[i] * d
          }
          //mortals for T3..T8
          mortals[i] = (hitTriggersTotal * hitTrigger.mortals) + (woundTriggersTotal[i] * woundTrigger.mortals)
          //total damage for T3..T8
          damage[i] = regDamage[i] + mortals[i]
          //dpp for T3..T8
          dpp[i] = damage[i]/points

//BASIC OLD
            // //calculate unsaved wounds for T3..T8
            // unsavedTotal[i] = woundTotal[i] * (1-(save + ap))
            // //calculate damage for T3..T8
            // damage[i] = unsavedTotal[i] * d
//BASIC OLD     

          }

        //show calculations in html
        scope.model.roundWound = roundWound
        scope.model.roundWoundTriggers = roundWoundTriggers
        scope.model.roundWoundRerolls = roundWoundRerolls
        scope.model.woundTriggersTotal = woundTriggersTotal
        scope.model.woundTotal = woundTotal

        scope.model.unsavedTriggers = unsavedTriggers
        scope.model.unsavedTotal = unsavedTotal
        scope.model.regDamage = regDamage
        scope.model.mortals = mortals
        scope.model.damage = damage
        scope.model.dpp = dpp
      };

      // initial run
      calculate();
      //
      scope.$watch("model", calculate, true);

    }
  };
});