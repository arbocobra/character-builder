import { checkForNull, setModifiersByName } from "./helperFunctions";
const _ = require('lodash'); 

export const updateRace = (reference, val, current) => {
   // const abilitiesRef = current.abilities;
   // console.log(current.skills.total)
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
      extras_race: reference.extras,
      // skills: reference.skill,
      // bonusModifiers_race: reference.modifiers,
      // language: reference.language,
   }
   checkForNull(update, current)
   return update;
}

export const updateSubrace = (reference, val, current) => {
   const abilitiesRef = current.abilities;
   let modifiedAbilities = updateBonusAbilities(abilitiesRef, reference.modifiers, 'race')
   
   let update = {
      subrace: val,
      abilities: modifiedAbilities,
      extras_race: reference.extras,
      language: reference.language,
      bonusModifiers_race: reference.modifiers,
      skills: reference.skills,
   }
   checkForNull(update, current)
   return update;
}

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
   return modifiedAbilities;
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

const updateReferenceObject = (ref, val, cat) => {
   // console.log(ref.total)
   ref[cat] = val ? [...val].map(word => word.toLowerCase()) : []
   ref.total = _.uniq([...ref.race, ...ref.class, ...ref.background])
   return ref;
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