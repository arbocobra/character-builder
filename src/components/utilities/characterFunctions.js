import { checkForNull, setModifiersByName, rollDice } from "./helperFunctions";
import { spellcastingAlt, getClassFeaturesFunctions } from "./classFunctions";
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
      speed: currentChar.speed + reference.speed,
   }

   checkForNull(update, current)
   return update;
}

export const updateSubrace = (reference, val, currentChar, parentRef) => {
   const current = JSON.parse(JSON.stringify(currentChar));
   let modifiedAbilities = updateBonusAbilities(current.abilities, reference.modifiers, 'race');
   let languageRef = reference.language ? [...parentRef.language, ...reference.language].flat() : parentRef.language;
   let featureRef = reference.extras ? [...current.features.race, ...reference.extras].flat() : current.features.race;
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

// need to clear clear class proficiencies/equipment/etc..? when changing classes
export const updateClass = (reference, val, currentChar) => {
   const current = JSON.parse(JSON.stringify(currentChar))
   let modifiedSkills = updateReferenceObject(reference.skills, current.skills, 'class');
   let modifiedProficiencies = setProficienciesObject(reference.proficiencies, current.proficiencies, 'class');
   let modifiedEquipment = setProficienciesObject(reference.equipment, current.equipment, 'class');
   let modifiedFeatures = updateClassFeatures(val, current)
   
   let update = {
      class_spell_save: reference.spell_save,
      skills: modifiedSkills,
      class: val,
      proficiencies: modifiedProficiencies,
      equipment: modifiedEquipment,
      saving_throws: reference.saves,
      hit_dice: reference.hitDice,
      sub_name: reference.subName,
      subclass: '',
      class_scf_count: reference.class_scf_count,
      spellcaster: reference.spellcaster,
   }

   if (modifiedFeatures) {
      // if (update.spellcaster) update.class_spellcasting = spellcastingAlt(current.level, val, update.class_spell_save, current.proficiency_bonus, current)
      
      Object.assign(update, modifiedFeatures)
      // console.log(update)
   }
   return update;
}
// export const updateSubclass = (reference, val, current) => {}

export const updateBackground = (reference, val, currentChar) => {
   const current = JSON.parse(JSON.stringify(currentChar))
   const isVariant = typeof reference.var === 'boolean' ? false : true;
   let modifiedSkills = updateReferenceObject(reference.skills, current.skills, 'background');
   let modifiedFeatures = updateReferenceObject([reference.feature], current.features, 'background');
   let modifiedEquipment = setProficienciesObject(reference.equipment, current.equipment, 'background');
   let modifiedProficiencies = setProficienciesObject(reference.proficiencies, current.proficiencies, 'background');
   
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

export const updateLevel = (val, charCurrent) => {
   const current = JSON.parse(JSON.stringify(charCurrent))
   let modifiedFeatures = updateClassFeatures(val, current)
   const bonus = Math.ceil(val / 4) + 1;
   let result = {
      level: Number(val),
		proficiency_bonus: bonus,
   }
   if (modifiedFeatures) {
      // if (current.spellcaster) result.class_spellcasting = spellcastingAlt(val, current.class, result.proficiency_bonus, current.class_spell_save, current)
      Object.assign(result, modifiedFeatures)
      // console.log(result)
   }

   return result;
}

// export const updateASI = (curr, asi, scf) => {

// }


// SELECTIONS

export const updateSelectedTraits = (val, trait, charCurrent, ...cat) => {
   const current = JSON.parse(JSON.stringify(charCurrent))
   let charCat = cat[0] === 'subrace' ? 'race' : cat[0];
   
   let modifiedTrait;
   if (trait === 'abilities') {
      const currentAbility = current.abilities.bonus[charCat]
      val.forEach(el => setModifiersByName(el, currentAbility))
      modifiedTrait = updateBonusAbilities(current.abilities, currentAbility, charCat);
   } else if (['proficiencies', 'equipment'].includes(trait)){
      let secondaryCat = cat?.[1];
      modifiedTrait = updateProficienciesObject(val, current[trait], charCat, secondaryCat, trait);
      // console.log(modifiedTrait)
   } else if (trait === 'asi') {
      modifiedTrait = updateBonusAbilities(current.abilities, val, 'class');
      trait = 'abilities'
   } else {
      modifiedTrait = updateTraitObject(val, current[trait], charCat)
   }
   return { [trait]: modifiedTrait }
}

const updateTraitObject = (val, ref, cat) => {
   let update = _.uniq([...ref[cat], ...val]);
   ref[cat] = update;
   if (ref.class.includes('tongue of the sun and moon')) {
      ref.total = 'ALL - from Tongue of the Sun and Moon'
      return ref;
   } else {
      ref.total = _.uniq([...ref.race, ...ref.class, ...ref.background])
      return ref;
   }
   // let update = _.uniq([...ref[cat], ...val]);
   // ref[cat] = update;
   // ref.total = _.uniq([...ref.race, ...ref.class, ...ref.background])
   // return ref;
}

const updateProficienciesObject = (val, ref, cat, type, trait) => {
   // if Specific type of proficiency
   let init = {armor: [], tools: [], weapons: []};
   if (trait === 'equipment') init.other = [];
   Object.assign(init, {[type]: val})

   for (let pro in init) {
      if (init[pro].length) ref[cat][pro] = [...init[pro], ...ref[cat][pro]]
   }
   for (let cat in ref.total) {
      ref.total[cat] = _.uniq([...ref.race[cat], ...ref.background[cat], ...ref.class[cat]])
   }
   return ref;
}

const setProficienciesObject = (val, ref, cat) => {
   for (let pro in val) {
      if (val[pro].length) ref[cat][pro] = val[pro];
      else ref[cat][pro] = [];
   }
   for (let cat in ref.total) {
      ref.total[cat] = _.uniq([...ref.race[cat], ...ref.background[cat], ...ref.class[cat]])
   }
   return ref;

}

const updateReferenceObject = (val, current, ...cat) => {
   current[cat[0]] = val ? val : []
   current.total = _.uniq([...current.race, ...current.class, ...current.background])
   return current;
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

export const updateClassFeatures = (val, currentChar) => {
   const current = JSON.parse(JSON.stringify(currentChar));
   let level, charClass;
   if (typeof val === 'string') {
      level = current.level;
      charClass = val;
   } else if (typeof val === 'number') {
      level = val;
      charClass = current.class;
   }
   // const level = current.level;
   // const charClass = current.class;
   if (level > 0 && charClass.length > 0) {
      const classFeats = CharacterClassSubclass.features[charClass][0];
      const special = CharacterClassSubclass.features[charClass][1];
      const byLevel = classFeats.slice(1, level + 1)
      const arr = byLevel.flat()
      let modifiedFeatures = updateReferenceObject(arr, current.features, 'class');
      const update = {features: modifiedFeatures}
      
      return update

   } else return null;
}

export const updateArmor = (currentChar, unarmoredMod) => {
   // let result;
   const current = JSON.parse(JSON.stringify(currentChar)); 
   if (unarmoredMod) current.armor_class.base = unarmoredMod + 10
   else current.armor_class.base = current.abilities.modifiers[1] + 10

   const armorValArr = Object.values(current.armor_class).slice(0,-1)
   current.armor_class.total = _.sum(armorValArr)

   // console.log(Object.values(current.armor_class))
   return {armor_class: current.armor_class};
}