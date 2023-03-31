import { setModifiersByName } from "./helperFunctions";

export const updateRace = (charRace, val, character) => {
   const abilitiesRef = character.abilities;
   let modifiedAbilities = updateBonusAbilities(abilitiesRef, charRace.modifiers, 'race')
   let update = {
      race: val,
      abilities: modifiedAbilities,
      extras_race: charRace.extras,
      language: charRace.language,
      bonusModifiers_race: charRace.modifiers,
      size: charRace.size,
      skills: charRace.skills,
      speed: charRace.speed
   }
   checkForNull(update, character)
   return update;
}

const updateBonusAbilities = (ref, val, cat) => {
   ref.bonus[cat] = val ? val : [0,0,0,0,0,0]

   if (Object.keys(ref.bonus).filter(el => ref.bonus[el].length).some(el => el !== cat)) {
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

const checkForNull = (update, character) => {
   if (Object.values(update).includes(null)) {
      let key = getKeyByValue(update);
      update[key] = character[key];
      checkForNull(update, character)
   } else return update;
}

const getKeyByValue = (object) => Object.keys(object).find(key => object[key] === null);

export const updateSubrace = (charRace, val, character) => {
   // console.log(character)
   let update = {
      subrace: val,
      extras_race: charRace.extras,
      language: charRace.language,
      bonusModifiers_race: charRace.modifiers,
      skills: charRace.skills,
   }
   checkForNull(update, character)
   return update;
}

export const updateSkills = (val, character) => {
   let current = character.skills;
   val.forEach(el => {
      if (!current.includes(el)) current.push(el);
   })
   return {skills: current}
}

export const updateLanguage = (val, character) => {
   let current = character.language;
   val.forEach(el => {
      if (!current.includes(el)) current.push(el);
   })
   return {language: current}
}

export const updateBonus = (val, character, cat) => {
   const current = [...character[cat]]
   val.forEach(el => setModifiersByName(el, current))
   const abilitiesRef = {...character.abilities};
   let modifiedCat = cat.split('_')
   let modifiedAbilities = updateBonusAbilities(abilitiesRef, current, modifiedCat[1])
   return {
      [cat]: current,
      abilities: modifiedAbilities
   }
}

export const updateBackground = (charBackground, val, character) => {
   // let result;
   // if (!parent) {
   //    const charBack = char.background[val];
   //    result = {
   //       background: val,
   //       variant: 'N/A',
   //       extras: {
   //          background: charBack.feature,
   //       }
   //    }
   // } else {
   //    const charBackVar = char.variant[val];
   //    result = {
   //       background: parent,
   //       variant: val,
   //       extras: {
   //          background: charBackVar.feature,
   //       }
   //    }
   // };
   return {background: val}
   // console.log(val)
   // return result;
}
