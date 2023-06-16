import { language, skills, Proficiencies } from '../../data/CharacterDetails';
import RaceSubrace from '../../data/RaceSubrace';
import { Background } from '../../data/Background';
import ClassSubclass from '../../data/ClassSubclass';
import { updateHitPoints } from './characterFunctions';

const _ = require('lodash'); 

const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

// Character Select

export const characterSelections = (val, cat) => {
   let selections = cat === 'class' ? ClassSubclass.select[val + 'Select'] : cat === 'race' ? RaceSubrace.select[val + 'Select'] : Background.select[val + 'Select'];
   const options = {
      direct: [],
      multi: [],
   };
   selections.forEach((el,i) => {
      if (el.type === 'list') {
         const option = characterSelectionList(el,i, cat)
         options.direct.push(option)
      } else if (el.type === 'multi') {
         const option = characterSelectionMulti(el,i, cat)
         options.multi.push(option)
      }
   })
   // console.log(options)
   return options
}

const characterSelectionList = (obj,i, cat) => {
   // console.log(obj)
   let list;
   if (obj.ref === 'arr') list = obj.list;
   else if (obj.ref === 'obj')  list = getSelectionList(obj.list)

   return {
      index: i,
      catName: cat,
      list: list,
      cat: obj.cat,
      result: obj.result,
      count: obj.count,
      name: obj.name,
   }
}
const characterSelectionMulti = (obj,i, cat) => {
   // console.log(obj)
   const direct = [];
   const results = {
      index: i,
      catName: cat,
      init: obj.init,
      name: obj.name,
   }
   
   for (let el of Object.keys(obj.options)) {
      const opt = obj.options[el]
      // console.log(opt)
      let result = {
         name: obj.name,
         cat: opt.cat,
         count: opt.count,
         result: opt.result,
      }
      let list = [];
      if (_.isArray(opt.ref)) {
         // let arr = [];
         opt.ref.forEach((ref,i) => {
            if (ref === 'arr') list.push(opt.list[i])
            else if (ref === 'obj') list.push(getSelectionList(opt.list[i]))
         })
      } else {
         if (opt.ref === 'arr') list = [opt.list]
         else if (opt.ref === 'obj') list = [getSelectionList(opt.list)]
         // list.flat();
      }
      
      result.list = list.flat()
      direct.push(result)
   }
   results.direct = direct;
   return results;
}
const getSelectionList = (ref) => {
   if (ref[0] === 'languages') return Object.keys(language);
   if (_.isString(ref[0])) return ref.reduce((a,b) => a[b], Proficiencies)
   else return ref.map(key => Proficiencies[key[0]][key[1]][key[2]]).flat();
}

export const getReferenceObject = (val, cat, parent) => {
   const ref = {};
   if (cat === 'race') Object.assign(ref, {...RaceSubrace.race[val]})
   else if (cat === 'subrace') {
      if (val === 'N/A') Object.assign(ref, {...RaceSubrace.race[parent]});
      else Object.assign(ref, {...RaceSubrace.subrace[parent][val]});
   } else if (cat === 'background') Object.assign(ref, {...Background.background[val]});
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
   const noCaps = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'or' , 'the', 'to']
   let count = _.split(string, ' ').length;
   if (count > 1) {
      let corrected = _.words(string).map((word,i) => i === 0 ? _.capitalize(word) : noCaps.includes(word) ? word : _.capitalize(word))
      return corrected.join(' ');
   } else return _.capitalize(string)
}

export const equipArmor = (armorUpper, currentChar, equip) => {
   const char = JSON.parse(JSON.stringify(currentChar));
   const currentArmor = char.armor_class;
   let val = _.lowerCase(armorUpper)
   let armorObj = Proficiencies.armor
   let armorType, armor;
   for (let cat in armorObj) {
      if (Object.keys(armorObj[cat]).includes(val)) {
         armorType = cat
         armor = armorObj[cat][val]
   }}
   if (equip) {
      if (armorType === 'heavy') {
         currentArmor.base = null
         currentArmor.armor = armor.class
      } else if (armorType === 'shields') currentArmor.shield = armor.class
      else if (armorType === 'medium') {
         currentArmor.base = currentChar.abilities.modifiers[1] > 2 ? 12 : currentChar.abilities.modifiers[1] + 10;
         currentArmor.armor = armor.class
      } else currentArmor.armor = armor.class
   } else {
      if (armorType === 'shields') currentArmor.shield = 0;
      else {
         currentArmor.base = currentChar.abilities.modifiers[1] + 10;
         currentArmor.armor = 0
      }
   }
   if (['barbarian', 'monk'].includes(char.class) && currentArmor.armor + currentArmor.shield === 0) {
      let charMods = char.abilities.modifiers
      const baseMod = char.class === 'monk' ? charMods[1] + charMods[4] : charMods[1] + charMods[2]
      unarmoredDefense(currentArmor, baseMod)
   } else {
      const armorValArr = Object.values(currentArmor).slice(0,-1)
      currentArmor.total = _.sum(armorValArr)
      let result =  {armor_class: currentArmor}
      return result
   }
} 
export const unarmoredDefense = (currentArmor, mod) => {
   currentArmor.base = mod + 10;
   const armorValArr = Object.values(currentArmor).slice(0,-1)
   currentArmor.total = _.sum(armorValArr)
   let result =  {armor_class: currentArmor}
   return result
}