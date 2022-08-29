import { TitanTypeComponent } from "~/helpers/TypeComponent.js";

export class TitanSpell extends TitanTypeComponent {
   prepareDerivedData() {
      // Reset aspects array
      this.parent.aspects = [];

      // Reference to standard aspects
      const standardAspects = this.parent.system.standardAspects;

      // Range
      const rangeCosts = {
         self: 0,
         touch: 1,
         m10: 2,
         m30: 3,
         m50: 4
      };
      this._calculateStandardAspectCost(standardAspects.range, rangeCosts, 0);
      this._prepareStandardAspectData(standardAspects.range, game.i18n.localize("LOCAL.range.label"), false, false, false);

      // Target
      const targetCosts = {
         target: 0,
         m5Radius: 3,
         m10Radius: 6,
      };
      this._calculateStandardAspectCost(standardAspects.target, targetCosts, 0);
      this._prepareStandardAspectData(standardAspects.target, game.i18n.localize("LOCAL.target.label"), false, false, false);

      // Damage
      this._calculateStandardAspectCost(standardAspects.damage, 1, 1);
      this._prepareStandardAspectData(standardAspects.damage, game.i18n.localize("LOCAL.damage.label"), true, false, 1);

      // Healing
      this._calculateStandardAspectCost(standardAspects.healing, 1);
      this._prepareStandardAspectData(standardAspects.healing, game.i18n.localize("LOCAL.healing.label"), true, false, 1);

      // Rounds
      this._calculateStandardAspectCost(standardAspects.rounds, 1);
      this._prepareStandardAspectData(standardAspects.rounds, game.i18n.localize("LOCAL.rounds.label"), true, false, 1);

      // Decrease Mod
      this._calculateStandardAspectCost(standardAspects.decreaseMod, 0, 2);
      this._prepareStandardAspectData(standardAspects.decreaseMod, game.i18n.localize("LOCAL.decreaseMod.label"), true, true, 1);

      // Increase Mod
      this._calculateStandardAspectCost(standardAspects.increaseMod, 0, 2);
      this._prepareStandardAspectData(standardAspects.increaseMod, game.i18n.localize("LOCAL.increaseMod.label"), true, true, 1);

      // Decrease Rating
      this._calculateStandardAspectCost(standardAspects.decreaseRating, 0, 1);
      this._prepareStandardAspectData(standardAspects.decreaseRating, game.i18n.localize("LOCAL.decreaseRating.label"), true, true, 1);

      // Increase Rating
      this._calculateStandardAspectCost(standardAspects.increaseRating, 0, 1);
      this._prepareStandardAspectData(standardAspects.increaseRating, game.i18n.localize("LOCAL.increaseRating.label"), true, true, 1);

      // Decrease Resistance
      this._calculateStandardAspectCost(standardAspects.decreaseResistance, 0, 1);
      this._prepareStandardAspectData(standardAspects.decreaseResistance, game.i18n.localize("LOCAL.decreaseResistance.label"), true, true, 1);

      // Increase Resistance
      this._calculateStandardAspectCost(standardAspects.increaseResistance, 0, 1);
      this._prepareStandardAspectData(standardAspects.increaseResistance, game.i18n.localize("LOCAL.increaseResistance.label"), true, true, 1);

      // Decrease Attribute
      this._calculateStandardAspectCost(standardAspects.decreaseAttribute, 0, 4);
      this._prepareStandardAspectData(standardAspects.decreaseAttribute, game.i18n.localize("LOCAL.decreaseAttribute.label"), true, true, 1);

      // Increase Attribute
      this._calculateStandardAspectCost(standardAspects.increaseAttribute, 0, 4);
      this._prepareStandardAspectData(standardAspects.increaseAttribute, game.i18n.localize("LOCAL.increaseAttribute.label"), true, true, 1);

      // Decrease Skill
      this._calculateStandardAspectCost(standardAspects.decreaseSkill, 0, 1);
      this._prepareStandardAspectData(standardAspects.decreaseSkill, game.i18n.localize("LOCAL.decreaseSkill.label"), true, true, 1);

      // Increase Skill
      this._calculateStandardAspectCost(standardAspects.increaseSkill, 0, 1);
      this._prepareStandardAspectData(standardAspects.increaseSkill, game.i18n.localize("LOCAL.increaseSkill.label"), true, true, 1);

      // Inflict Condition
      const inflictConditionCosts = {
         blinded: 4,
         charmed: 2,
         deafened: 1,
         frightened: 3,
         incapacitated: 6,
         poisoned: 4,
         prone: 2,
         restrained: 5,
         stunned: 4,
         unconscious: 7
      };
      this._calculateStandardAspectCost(standardAspects.inflictCondition, 0, inflictConditionCosts);
      this._prepareStandardAspectData(standardAspects.inflictCondition, game.i18n.localize("LOCAL.inflictCondition.label"), false, true, false);

      // Remove Condition
      this._calculateStandardAspectCost(standardAspects.removeCondition, 0, 2, 5);
      this._prepareStandardAspectData(standardAspects.removeCondition, game.i18n.localize("LOCAL.removeCondition.label"), false, true, false);

      // Decrease Speed
      this._calculateStandardAspectCost(standardAspects.decreaseSpeed, 0, 1);
      this._prepareStandardAspectData(standardAspects.decreaseSpeed, game.i18n.localize("LOCAL.decreaseSpeed.label"), true, true, 1);

      // Increase Speed
      this._calculateStandardAspectCost(standardAspects.increaseSpeed, 0, 1);
      this._prepareStandardAspectData(standardAspects.increaseSpeed, game.i18n.localize("LOCAL.increaseSpeed.label"), true, true, 1);


      console.log(this.parent.aspects);
   }

   _calculateStandardAspectCost(aspect, enabledCost, optionCost, allOptionCost) {
      // If enabled
      if (aspect.enabled) {
         // If all options
         if (aspect.allOptions) {
            aspect.cost = allOptionCost;
         }

         // Otherwise
         else {
            // Initialize enabled cost
            aspect.cost = typeof enabledCost === `object` ? enabledCost[aspect.value] : enabledCost;

            // Calculate option cost
            if (aspect.option) {
               for (const [key, value] of Object.entries(aspect.option)) {
                  if (value === true) {
                     aspect.cost += typeof optionCost === 'object' ? optionCost[key] : optionCost;
                  }
               }
            }

            // Cap the action cost
            if (allOptionCost) {
               aspect.cost = Math.min(aspect.cost, allOptionCost);
            }
         }

         // Halve cost if a resistance is set
         if (aspect.resistanceCheck && aspect.resistanceCheck !== "none") {
            aspect.cost = Math.ceil(aspect.cost / 2);
         }
      }
      else {
         aspect.cost = 0;
      }
   }

   _prepareStandardAspectData(aspect, label, overcast, requireOptions, initialValue,) {
      if (aspect.enabled) {
         // Check for options
         const option = [];
         if (aspect.option) {
            for (const [key, value] of Object.entries(aspect.option)) {
               if (value === true) {
                  option.push(key);
               }
            }
         }

         if (!requireOptions || option.length > 0) {
            // Initialize aspect entry
            const aspectEntry = {
               label: label,
               cost: aspect.cost,
            };

            // Overcast
            if (overcast) {
               aspectEntry.overcast = true;
            }

            // Initial value
            if (overcast === true) {
               aspectEntry.initialValue = initialValue;
            }
            else if (aspect.value) {
               aspectEntry.initialValue = aspect.value;
            }

            // Options
            if (option.length > 0) {
               aspectEntry.option = option;
            }

            // Resistance check
            if (aspect.resistanceCheck && aspect.resistanceCheck !== "none") {
               aspectEntry.resistanceCheck = aspect.resistanceCheck;
            }

            // Push to the aspects array
            this.parent.aspects.push(aspectEntry);
         }
      }
   }
}