import { checkForNull, setModifiersByName, rollDice } from "./helperFunctions";
import { abilityScoreImprovements } from "./classFunctions";
import CharacterClassSubclass from "../../data/ClassSubclass";
const _ = require('lodash'); 

export const updateRace = (reference, val, currentChar) => {
   const current = JSON.parse(JSON.stringify(currentChar))
   let modifiedAbilities = updateBonusAbilities(current.abilities, reference.modifiers, 'race');
   let modifiedLanguages = updateReferenceObject(reference.language, current.languages, 'race');
   let modifiedSkills = updateReferenceObject(reference.skills, current.skills, 'race');
   let modifiedFeatures = updateReferenceObject(reference.extras, current.features, 'race');
   
   let update = {
      race: val,
      subrace: '',
      abilities: modifiedAbilities,
      features: modifiedFeatures,
      languages: modifiedLanguages,
      size: reference.size,
      skills: modifiedSkills,
      speed: reference.speed,
   }

   checkForNull(update, current)
   return update;
}

export const updateSubrace = (reference, val, currentChar, parentRef) => {
   const current = JSON.parse(JSON.stringify(currentChar));
   let modifiedAbilities = updateBonusAbilities(current.abilities, reference.modifiers, 'race');
   let languageRef = reference.language ? [...parentRef.language, ...reference.language].flat() : current.languages.race;
   let featureRef = reference.extras ? [...parentRef.extras, ...reference.extras].flat() : current.features.race;
   let modifiedLanguages = updateReferenceObject(languageRef, current.languages, 'race');
   let modifiedFeatures = updateReferenceObject(featureRef, current.features, 'race');
   
   let update = {
      subrace: val,
      abilities: modifiedAbilities,
      features: modifiedFeatures,
      languages: modifiedLanguages,
   }
   
   checkForNull(update, current)
   return update;
}

export const updateClass = (reference, val, currentChar) => {
   const current = JSON.parse(JSON.stringify(currentChar))
   let modifiedSkills = updateReferenceObject(reference.skills, current.skills, 'class');
   let modifiedProficiencies = updateReferenceObject(reference.proficiencies, current.proficiencies, 'class', 'proficiencies');
   // let modifiedFeatures = updateClassFeatures(val, current, 'class', current.level);
   let update = {
      // features: modifiedFeatures,
      skills: modifiedSkills,
      class: val,
      proficiencies: modifiedProficiencies,
      saving_throws: reference.saves,
      hit_dice: reference.hitDice,
      sub_name: reference.subName,
      class_asi: 0,
      class_scf: 0,
   }
   return update;
}
// export const updateSubclass = (reference, val, current) => {}

export const updateBackground = (reference, val, currentChar) => {
   const current = JSON.parse(JSON.stringify(currentChar))
   const isVariant = typeof reference.var === 'boolean' ? false : true;
   let modifiedSkills = updateReferenceObject(reference.skills, current.skills, 'background');
   let modifiedFeatures = updateReferenceObject([reference.feature], current.features, 'background');
   let modifiedEquipment = updateReferenceObject(reference.equipment, current.equipment, 'background');
   // let modifiedProficiencies = updateProficienciesObject(reference.proficiencies, current.proficiencies, 'background');
   let modifiedProficiencies = updateReferenceObject(reference.proficiencies, current.proficiencies, 'background', 'proficiencies');
   
   const update = {
      background: val,
      skills: modifiedSkills,
      features: modifiedFeatures,
      equipment: modifiedEquipment,
      proficiencies: modifiedProficiencies
   }
   update.variant = isVariant ? `Variant of ${reference.var}` : null;
   return update;
}

export const updateBaseAbilities = (val, current) => {
   const modifiedAbilities = JSON.parse(JSON.stringify(current.abilities))
   modifiedAbilities.base = val;
   if (_.isEmpty(modifiedAbilities.total)) modifiedAbilities.total = modifiedAbilities.base;
   else if (_.isEmpty(modifiedAbilities.totalBonus)) modifiedAbilities.total = modifiedAbilities.base;
   else {
      let newTotal = modifiedAbilities.base.map((el,i) => el + modifiedAbilities.totalBonus[i]);
      modifiedAbilities.total = newTotal;
   }
   let newModifiers = modifiedAbilities.total.map(el => Math.floor((el - 10) / 2));
   modifiedAbilities.modifiers = newModifiers;
   return {abilities: modifiedAbilities};
}

export const updateHitPoints = (val, current) => {
   const pointSelection = val ? val : current.hp_selection;
   const req_arr = [current.abilities.modifiers.length, pointSelection.length, current.class.length, current.level]
   if (_.every(req_arr, (el) => el > 0)) {
      const constMod = current.abilities.modifiers[2];
      const level = current.level;
      const diceVal = Number.parseInt(current.hit_dice.slice(1))
      const initVal = diceVal + constMod;
      if (level === 1) return { hit_points: initVal, hp_selection: pointSelection }
      else {
         let levelVal;
         if (pointSelection === 'average') {
            levelVal = (level - 1) * ((diceVal / 2 + 1) + constMod)
         } else levelVal = rollDice(level - 1, diceVal, constMod)
         return {
            hit_points: levelVal + initVal,
            hp_selection: pointSelection
         }
      } 
   } else {
      if (val) return {hp_selection: val}
      else return null;
   }
}

export const updateLevel = (val, current) => {
   const bonus = Math.ceil(val / 4) + 1;
   let result = {
      level: Number(val),
		proficiency_bonus: bonus,
   }

   // if (current.class.length) {
   //    let modifiedFeatures = updateClassFeatures(current, current.class, 'class', val);
   //    Object.assign(result, modifiedFeatures)
   //    console.log(result)
   // } 
   return result;
}

// export const updateASI = (curr, asi, scf) => {

// }


// SELECTIONS

export const updateSelectedTraits = (val, trait, charCurrent, ...cat) => {
   const current = JSON.parse(JSON.stringify(charCurrent))
   // console.log(val)
   // console.log(trait)
   // console.log(current)
   // console.log(...cat)
   let charCat = cat[0];
   
   let modifiedTrait;
   if (trait === 'abilities') {
      const currentAbility = current.abilities.bonus[charCat]
      val.forEach(el => setModifiersByName(el, currentAbility))
      modifiedTrait = updateBonusAbilities(current.abilities, currentAbility, charCat);
   } else if (trait === 'proficiencies'){
      let secondaryCat = cat?.[1];
      
      modifiedTrait = updateProficienciesObject(val, current[trait], charCat, secondaryCat);
      console.log(modifiedTrait)

   } else {
      modifiedTrait = updateTraitObject(val, current[trait], charCat)
   }
   return { [trait]: modifiedTrait }
}

const updateTraitObject = (val, ref, cat) => {
   let update = _.uniq([...ref[cat], ...val]);
   ref[cat] = update;
   ref.total = _.uniq([...ref.race, ...ref.class, ...ref.background])
   return ref;
}

const updateProficienciesObject = (val, ref, ...cats) => {
   let charCat = cats[0]

   // if ADD
   if (cats?.[1]) {
      let init = Object.assign({armor: [], tools: [], weapons: []}, {[cats[1]]: val})
      for (let pro in init) {
         if (init[pro].length) ref[charCat][pro] = [...init[pro], ...ref[charCat][pro]]
      }
   }
   
   // if SET
   else {
      for (let pro in val) {
         if (val[pro].length) ref[charCat][pro] = val[pro]
      }
   }

   for (let cat in ref.total) {
      ref.total[cat] = _.uniq([...ref.race[cat], ...ref.background[cat], ...ref.class[cat]])
   }
   return ref;
}

const updateReferenceObject = (val, current, ...cat) => {
   if (cat?.[1] === 'proficiencies') {
      let modifiedProficiencies = updateProficienciesObject(val, current, cat[0]);
      // console.log(modifiedProficiencies)
      return modifiedProficiencies;
   }
   else {
      current[cat[0]] = val ? val : []
      current.total = _.uniq([...current.race, ...current.class, ...current.background])
      return current;
   }

}

const updateBonusAbilities = (ref, val, cat) => {
   
   ref.bonus[cat] = val ? val : [0,0,0,0,0,0]
   
   if (_.some(ref.bonus, (value, key) => key !== cat && !_.isEmpty(value))) {
      let newTotal = ref.totalBonus.map((_,i) => ref.bonus.race[i] + ref.bonus.class[i])
      ref.totalBonus = newTotal;
   } else ref.totalBonus = ref.bonus[cat];

    if (!ref.base.length) ref.total = ref.totalBonus;
    else {
      let newTotal = ref.total.map((_,i) => ref.base[i] + ref.totalBonus[i])
      ref.total = newTotal;
      let newModifiers = ref.total.map(el => Math.floor((el - 10) / 2));
      ref.modifiers = newModifiers;
    }

   return ref;
}

export const updateClassFeatures = (currentChar) => {
   const current = JSON.parse(JSON.stringify(currentChar));
   const level = current.level;
   const charClass = current.class;
   // let asi = [];
   // let scf = [];
   if (level > 0 && charClass.length > 0) {
      // console.log(charClass + ': ' + level)
      const classFeats = CharacterClassSubclass.features[charClass][0];
      const special = CharacterClassSubclass.features[charClass][1];
      // console.log(special)
      const byLevel = classFeats.slice(1, level + 1)
      const arr = byLevel.flat()
      // const arr = byLevel.flat().filter(el => el !== 'asi' && el !== 'scf')
      let modifiedFeatures = updateReferenceObject(arr, current.features, 'class');
      const update = {features: modifiedFeatures}
      
      special.forEach((el,i) => {
         let specNameKey = `class_special_${i + 1}_name`;
         let specNameVal = special[i][0];
         let specCountKey = `class_special_${i + 1}_count`;
         let specCountVal = special[i][1][level];
         update[specNameKey] = specNameVal;
         update[specCountKey] = specCountVal;
      })
      
      // console.log(update)
      return update

   } else return null;
}