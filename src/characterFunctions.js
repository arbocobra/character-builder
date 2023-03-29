import { setModifiersByName } from "./helperFunctions";

export const updateRace = (charRace, val, character) => {
   let update = {
      race: val,
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
   const currentBonus = cat === 'bonusModifiers_race' ? character.bonusModifiers_race 
   : cat === 'bonusModifiers_class' ? character.bonusModifiers_class
   : null;
   val.forEach(el => {
      setModifiersByName(el, currentBonus)
   })
   return {[cat]: currentBonus}
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
   console.log(charBackground)
   // return result;
}