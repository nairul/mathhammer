app.directive('userInputs', function() {
  return {
    restrict: 'E',
    templateUrl: 'model.tpl.html',
    scope: {
      model: "="
    },
    link: function(scope, elem, attr) {
      function calculate() {
        //for .reduce() method
        function add(a, b) {
          return a + b;
        }
        //CALCULATE HITS
        //grab input
        var skill = scope.model.skill
        var attacks = scope.model.attacks
        var hitRerolls = {
          ones: scope.model.rerolls.hits.ones,
          failed: scope.model.rerolls.hits.failed
        }
        var hitMod = scope.model.hitMod
        var hitTrigger = {}
        if (scope.model.hitTrigger.trigger) {
          hitTrigger = {
            roll: scope.model.hitTrigger.roll,
            attacks: scope.model.hitTrigger.attacks,
            hits: scope.model.hitTrigger.hits,
            mortals: scope.model.hitTrigger.mortals}
        } else {
          hitTrigger = {
            roll: 0,
            attacks: 0,
            hits: 0,
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
          } else if (hitTrigger.roll>0) {
            mHitTrigger = hitTrigger.roll+hitMod
          }      
        //values per round 
        var roundHits = [0,0,0,0]
        var roundHitRerolls = [0,0]
        var roundHitTriggers = [0,0,0,0]
        //round 1 hits
        if (hitRerolls.failed && hitMod>=0) {
          roundHits[0] = attacks*skill
        } else {
          roundHits[0] = attacks*mSkill
        }
        //round 1 triggers
        if (skill<mHitTrigger && hitReroll.failed) {
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
        roundHits[1] = (mSkill*roundHitRerolls[0])
        //round 2 triggers
        roundHitTriggers[1] = mHitTrigger*roundHitRerolls[0]
        //round 3 rolls
        var bonusAttacks = hitTrigger.attacks*(roundHitTriggers[0]+roundHitTriggers[1])
        //round 3 hits
        if (hitRerolls.failed && hitMod>=0) {
          roundHits[2] = bonusAttacks*skill
        } else {
          roundHits[2] = bonusAttacks*mSkill
        }
        //round 3 triggers
        if (skill<mHitTrigger && hitReroll.failed) {
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
        roundHits[3] = (mSkill*roundHitRerolls[1])
        //round 4 triggers
        roundHitTriggers[3] = mHitTrigger*roundHitRerolls[1]
        //total triggers
        var hitTriggersTotal = roundHitTriggers.reduce(add, 0)
        // total hits
        var hitsTotal = 0
        if (skill == 1) {
          hitsTotal = attacks 
        } else {
        hitsTotal = (roundHits.reduce(add, 0)) + (hitTriggersTotal*hitTrigger.hits) - (hitTriggersTotal*hitTrigger.mortals)
        }
        // show calculations in HTML
        scope.model.roundHits = roundHits
        scope.model.roundHitTriggers = roundHitTriggers
        scope.model.roundHitRerolls = roundHitRerolls
        scope.model.bonusAttacks = bonusAttacks
        scope.model.hitTriggersTotal = hitTriggersTotal
        scope.model.hitsTotal = hitsTotal
        //CALCULATE WOUNDS/UNSAVED/DAMAGE/DPP 
        //grab input
        var save = scope.model.save
        var strength = scope.model.strength
        var ap = scope.model.ap
        var d = scope.model.d
        var points = scope.model.points
        var woundRerolls = {
          ones: scope.model.rerolls.wounds.ones,
          failed: scope.model.rerolls.wounds.failed
        }
        var woundMod = scope.model.woundMod
        var woundTrigger = {}
        if (scope.model.woundTrigger.trigger) {
          woundTrigger = {
            roll: scope.model.woundTrigger.roll,
            mortals: scope.model.woundTrigger.mortals,
            d: scope.model.woundTrigger.d,
            ap: scope.model.hitTrigger.ap}
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
            roll: scope.model.autoWound.roll
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
        } else if (woundTrigger.roll>0) {
          mWoundTrigger = woundTrigger.roll+woundMod
        } 
        //
        var roundWounds = []
        var roundWoundRerolls = []
        var roundWoundTriggers = []
        var woundChances = []
        var woundTriggersTotal = []
        var woundsTotal = []
        var unsavedTriggers = []
        var unsavedTotal = []
        var regDamage = []
        var mortals = []
        var damage = []
        var dpp = []
        //iterate over T3..T8
        for (var i=0;i<6;i++) {
          //values per round for T3..T8
          roundWounds.push([0,0,0,0])
          roundWoundRerolls.push([0,0])
          roundWoundTriggers.push([0,0,0,0])
          //calculate wound chances for T3..T8
          if (scope.model.strength == i+3) {
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
            //calulcate modified wound chances for T3..T8

            //round 1 wounds for T3..T8

            //round 1 triggers for T3..T8

            //round 2 rolls for T3..T8

            //round 2 wounds for T3..T8

            //round 2 triggers for T3..T8

//BASIC OLD
            //calculate wounds for T3..T8
            woundsTotal[i] = woundChances[i]*hitsTotal
            //calculate unsaved wounds for T3..T8
            unsavedTotal[i] = woundsTotal[i]*(1-(save + ap))
            //calculate damage for T3..T8
            damage[i] = unsavedTotal[i]*d
//BASIC OLD


            //calculate dpp for T3..T8
            dpp[i] = damage[i]/points        
          }

        //show calculations in html
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