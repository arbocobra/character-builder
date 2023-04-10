import { checkForNull, setModifiersByName, rollDice } from "./helperFunctions";
const _ = require('lodash'); 

export const updateRace = (reference, val, current) => {
   let modifiedAbilities = updateBonusAbilities(current.abilities, reference.modifiers, 'race');
   let modifiedLanguages = updateReferenceObject(current.languages, reference.language, 'race');
   let modifiedSkills = updateReferenceObject(current.skills, reference.skills, 'race');
   let modifiedFeatures = updateReferenceObject(current.features, reference.extras, 'race');
   
   let update = {
      race: val,
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

export const updateSubrace = (reference, val, current, parentRef) => {
   let modifiedAbilities = updateBonusAbilities(current.abilities, reference.modifiers, 'race');
   let languageRef = reference.language ? [...parentRef.language, ...reference.language].flat() : current.languages.race;
   let featureRef = reference.extras ? [...parentRef.extras, ...reference.extras].flat() : current.features.race;
   let modifiedLanguages = updateReferenceObject(current.languages, languageRef, 'race');
   let modifiedFeatures = updateReferenceObject(current.features, featureRef, 'race');
   
   let update = {
      subrace: val,
      abilities: modifiedAbilities,
      features: modifiedFeatures,
      languages: modifiedLanguages,
   }
   
   checkForNull(update, current)
   return update;
}

export const updateClass = (reference, val, current) => {
   let update = {
      class: val,
      saving_throws: reference.saves,
      hit_dice: reference.hitDice,
      sub_name: reference.subName
   }
   return update;
}

// export const updateSubclass = (reference, val, current) => {}

export const updateBaseAbilities = (val, current) => {
   const modifiedAbilities = current.abilities;
   modifiedAbilities.base = val;
   if (_.isEmpty(modifiedAbilities.total)) modifiedAbilities.total = modifiedAbilities.base;
   else {
      let newTotal = modifiedAbilities.base.map((el,i) => el + modifiedAbilities.totalBonus[i]);
      modifiedAbilities.total = newTotal;
   }
   let newModifiers = modifiedAbilities.total.map(el => Math.floor((el - 10) / 2));
   modifiedAbilities.modifiers = newModifiers;
   return {abilities: modifiedAbilities};
   // return modifiedAbilities;
}

export const updateBackground = (reference, val, current) => {
   const isVariant = typeof reference.var === 'boolean' ? false : true;
   let modifiedSkills = updateReferenceObject(current.skills, reference.skills, 'background');
   let modifiedFeatures = updateReferenceObject(current.features, [reference.feature], 'background');
   let modifiedEquipment = updateReferenceObject(current.equipment, reference.equipment, 'background');
   let modifiedProficiencies = updateReferenceObject(current.proficiencies, reference.proficiency, 'background');
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

export const updateSelectedTraits = (val, trait, {...current}, cat) => {
   const ref = {...current[trait]}
   let modifiedTrait;
   if (trait === 'abilities') {
      const currentAbility = [...current.abilities.bonus[cat]]
      val.forEach(el => setModifiersByName(el, currentAbility))
      modifiedTrait = updateBonusAbilities(ref, currentAbility, cat);
   } else {
      modifiedTrait = updateTraitObject(ref, val, cat)
   }
   return { [trait]: modifiedTrait }
}

export const updateHitPoints = (val, current) => {
   if (current.abilities.modifiers.length) {
      const constMod = current.abilities.modifiers[2];
      const level = current.level;
      const diceVal = Number.parseInt(current.hit_dice.slice(1))
      const initVal = diceVal + constMod;
   
      if (level === 1) return { hit_points: initVal }
      else {
         let levelVal;
         if (val === 'average') {
            levelVal = (level - 1) * ((diceVal / 2 + 1) + constMod)
         } else levelVal = rollDice(level - 1, diceVal, constMod)
         return {
            hit_points: levelVal + initVal,
            hp_selection: val
         }
      } 
   }
}

const updateReferenceObject = (ref, val, cat) => {
   ref[cat] = val ? [...val].map(word => word.toLowerCase()) : []
   ref.total = _.uniq([...ref.race, ...ref.class, ...ref.background])
   return ref;
}

const updateTraitObject = (ref, val, cat) => {
   let update = _.uniq([...ref[cat], ...val]);
   ref[cat] = update;
   ref.total = _.uniq([...ref.race, ...ref.class, ...ref.background])
   return ref;
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