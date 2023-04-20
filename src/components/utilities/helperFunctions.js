import { language, skills, Proficiencies } from '../../data/CharacterDetails';
import RaceSubrace from '../../data/RaceSubrace';
import { Background } from '../../data/Background';
import ClassSubclass from '../../data/ClassSubclass';
import { updateHitPoints } from './characterFunctions';
const _ = require('lodash'); 

const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

// Character Select

export const characterOptions = (selections) => {
   const result = []
   selections.forEach((el, i) => {
      let charSelect = [el[0], el[1]]
      if (el[0] === 'skills') {
         let skillNames = skills.map(el => el[0])
         el[2] === 'ALL' ? charSelect.push(skillNames) : charSelect.push(el[2])
      } else if (el[0] === 'language') {
         charSelect.push(Object.keys(language))
      } else if (el[0] === 'abilities') {
         el[2] === 'ALL' ? charSelect.push(abilities) : charSelect.push(el[2])
      } else if (el[0] === 'proficiencies') {
         // will need to update to select other prof than tools
         if (_.isArray(el[2])) {
            el[2].shift();
            let refArray = el[2].map(ref => Proficiencies[el[3]][ref]);
            charSelect.push(refArray);
            // charSelect.push([Tools[el[2][1]], Tools[el[2][2]]])
         } else {
            charSelect.push(Proficiencies[el[3]][el[2]])
         }
         charSelect.push(el[3])
         charSelect.push(el[2])
      }
      result.push(charSelect)    
   })
   return result;
}

export const getReferenceObject = (val, cat, parent) => {
   const ref = {};
   if (cat === 'race') Object.assign(ref, {...RaceSubrace.race[val]})
   else if (cat === 'subrace') {
      if (val === 'N/A') Object.assign(ref, {...RaceSubrace.race[parent]});
      else Object.assign(ref, {...RaceSubrace.subrace[parent][val]});
   } else if (cat === 'background') Object.assign(ref, {...Background[val]});
   else if (cat === 'class') Object.assign(ref, {...ClassSubclass[cat][val]})
   return ref;
}

export const updateConnectedTraits = (update, current) => {
   // const current = characterRef.current
   let updateArr = Object.keys(update)
   const results = {};
   if (!_.isEmpty(_.intersection(updateArr, ['abilities', 'level', 'hit_dice']))) {
      if (!_.isEmpty(current.hp_selection)) {
         let hpUpdate = updateHitPoints(current.hp_selection, current);
         Object.assign(results, hpUpdate)
      }
   }
   // if (!_.isEmpty(_.intersection(updateArr, ['class', 'level']))) {

   //    if (!_.isEmpty(current.hp_selection)) {
   //       let hpUpdate = updateHitPoints(current.hp_selection, current);
   //       Object.assign(results, hpUpdate)
   //    }
   // }
   return results;
}

// Character Functions

export const checkForNull = (update, character) => {
   if (Object.values(update).includes(null)) {
      let key = getKeyByValue(update);
      update[key] = character[key];
      checkForNull(update, character)
   } else return update;
}

const getKeyByValue = (object) => Object.keys(object).find(key => object[key] === null);

export const setModifiersByName = (name, current) => {
   let index;
   switch (name) {
      case 'strength': 
         index = 0;
         break;
      case 'dexterity':
         index = 1;
         break;
      case 'constitution':
         index = 2;
         break;
      case 'intelligence':
         index = 3;
         break;
      case 'wisdom':
         index = 4;
         break;
      case 'charisma':
         index = 5;
         break;
   }
   let val = current[index];
   current[index] = val + 1;
}

export const rollDice = (num, dice, mod) => {
   const result = [];
   for (let i = 0; i < num; i++) {
      let random = Math.ceil(Math.random() * dice)
      result.push(random + mod)
   }
   console.log(result)
   return _.sum(result)
}

// Dropdown

export const toggleList = (div) => {
   let arrow = div.previousElementSibling.children[0];
   div.classList.toggle('open');
   div.classList.toggle('closed');
   arrow.classList.toggle('arrow-down');
   arrow.classList.toggle('arrow-up');
};

// Display Bio

export const smartCase = (string) => {
   const noCaps = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'the', 'to']
   let corrected = _.words(string).map(word => noCaps.includes(word) ? word : _.capitalize(word))
   return corrected.join(' ');
}
// export const requiresSelection = (char, cat) => {
   //    const result = [false, []];
   //    if (cat === 'race') {
   //       if (char.skills[0].includes('OR')) {
   //          result[0] = true;
   //          result[1].push('skills');
   //       }
   //       if (char.language[0].includes('+')) {
   //          result[0] = true;
   //          result[1].push('language');
   //       }
   //       if (char.bonusModifiers_race.includes('-')) {
   //          result[0] = true;
   //          result[1].push('abilities');
   //       }
   //    }
   //    return result;
   // }
   