import { language, skills } from '../../data/CharacterDetails';
import RaceSubrace from '../../data/RaceSubrace';
import { Background } from '../../data/Background';
import ClassSubclass from '../../data/ClassSubclass';
const _ = require('lodash'); 

const abilities = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];

export const requiresSelection = (char, cat) => {
   const result = [false, []];
   if (cat === 'race') {
      if (char.skills[0].includes('OR')) {
         result[0] = true;
         result[1].push('skills');
      }
      if (char.language[0].includes('+')) {
         result[0] = true;
         result[1].push('language');
      }
      if (char.bonusModifiers_race.includes('-')) {
         result[0] = true;
         result[1].push('bonusModifiers_race');
      }
   }
   return result;
}

export const toggleList = (div) => {
   let arrow = div.previousElementSibling.children[0];
   div.classList.toggle('open');
   div.classList.toggle('closed');
   arrow.classList.toggle('arrow-down');
   arrow.classList.toggle('arrow-up');
};

export const characterOptions = (char, selections) => {
   const result = []
   selections.forEach((el, i) => {
      let charSelect = [el[0], el[1]]
      if (el[0] === 'skills') {
         let skillNames = skills.map(el => el[0])
         el[2] === 'ALL' ? charSelect.push(skillNames) : charSelect.push(el[2])
      } else if (el[0] === 'language') {
         charSelect.push(Object.keys(language))
      } else if (el[0] === 'bonusModifiers_race') {
         el[2] === 'ALL' ? charSelect.push(abilities) : charSelect.push(el[2])
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
   let ability = name.toLowerCase();
   switch (ability) {
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

export const smartCase = (string) => {
   const noCaps = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'the', 'to']
   let corrected = _.words(string).map(word => noCaps.includes(word) ? word : _.capitalize(word))
   return corrected.join(' ');
}