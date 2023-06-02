import { language, skills, Proficiencies } from '../../data/CharacterDetails';
import RaceSubrace from '../../data/RaceSubrace';
import { Background } from '../../data/Background';
import ClassSubclass from '../../data/ClassSubclass';
import { updateHitPoints } from './characterFunctions';
const _ = require('lodash'); 

const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

// Character Select

export const characterOptions = (selections, prof) => {
   const result = []
   
   selections.forEach((el, i) => {
      let charSelect = [];
      if (_.isPlainObject(el[0])) {
         const subcat = el[0].return[0][0].split('-')[0];
         charSelect = [subcat, el[0].init];
         const options = ['options']
         el[0].result.forEach((result,ind) => {
            if (result === 'return') {
               let arr = ['return', el[0].return[ind][1], subcat, 'cat', el[0].return[ind][2]]
               options.push(arr)
            } else {
               let arr = ['select', ...el[0].return[ind]]               
               options.push(arr)
            }
            // console.log(options)
         })
         charSelect.push(options)
         console.log(charSelect)
      } else if (el[0] === 'IF') {
         console.log(el)
         console.log(prof)
      } else {
         if (['skills','language','abilities'].includes(el[0])) {
            charSelect = [el[0], el[1]]
            if (el[0] === 'skills') {
               let skillNames = skills.map(el => el[0])
               el[2] === 'ALL' ? charSelect.push(skillNames) : charSelect.push(el[2])
            } else if (el[0] === 'language') {
               charSelect.push(Object.keys(language))
            } else if (el[0] === 'abilities') {
               el[2] === 'ALL' ? charSelect.push(abilities) : charSelect.push(el[2])
            } 
         } else {
            let shortName = el[0].split('-')
            charSelect = [shortName[0], el[1]];
            if (el[0] === 'proficiencies-ref' || el[0] === 'equipment-ref') {
               let split = el[2].split('.')
               if (split[1] === 'all') {
                  let result = [...Proficiencies[el[3]][split[0]].melee, ...Proficiencies[el[3]][split[0]].ranged];
                  charSelect.push(result)
                  charSelect.push(el[3])
               } else {
                  charSelect.push(Proficiencies[el[3]][el[2]])
                  charSelect.push(el[3])
                  charSelect.push(el[2])
               }
               // console.log('ref')
            } else if (el[0] === 'proficiencies-list' || el[0] === 'equipment-list') {
               charSelect.push(el[2])
               if (_.isArray(el[3])) charSelect.push(el[3])
               else {
                  let catArr = el[3].split('.');
                  charSelect.push(catArr[0])
                  if (catArr.length > 1) charSelect.push(catArr[1])
               }
               
               // console.log('list')
            }
         }       
      }
      if (!_.isEmpty(charSelect)) {
         // console.log(charSelect)
         result.push(charSelect)
      }
   })

   // selections.forEach((el, i) => {
   //    if (el[0] === 'OR') {
   //       el.shift();
   //       console.log(el)
   //       let options = []
   //       if (_.isArray(el[3])) el[2].map((e,i) => options.push([el[0], el[1], e, el[3][i]]));
   //       else el[2].map(e => options.push([el[0], el[1], e, el[3]]));
   //       console.log(options)
   //    } else if (el[0] === 'IF') {
   //       el.shift();
   //       console.log(el)
   //    } else {
   //       let charSelect = [el[0], el[1]]
   //       if (el[0] === 'skills') {
   //          let skillNames = skills.map(el => el[0])
   //          el[2] === 'ALL' ? charSelect.push(skillNames) : charSelect.push(el[2])
   //       } else if (el[0] === 'language') {
   //          charSelect.push(Object.keys(language))
   //       } else if (el[0] === 'abilities') {
   //          el[2] === 'ALL' ? charSelect.push(abilities) : charSelect.push(el[2])
   //       } else if (el[0] === 'proficiencies') {
   //          // will need to update to select other prof than tools
   //          if (_.isArray(el[2])) {
   //             el[2].shift();
   //             let refArray = el[2].map(ref => Proficiencies[el[3]][ref]);
   //             charSelect.push(refArray);
   //             // charSelect.push([Tools[el[2][1]], Tools[el[2][2]]])
   //          } else {
   //             charSelect.push(Proficiencies[el[3]][el[2]])
   //          }
   //          charSelect.push(el[3])
   //          charSelect.push(el[2])
   //       }
   //       result.push(charSelect)   
   //    } 
   // })

   return result;
}
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
            // if (ref === 'arr') {
            //    arr = opt.list[i]
            //    list.push(arr)
            // }
            // else if (ref === 'obj') {
            //    arr = getSelectionList(opt.list[i])
            //    list.push(arr)
            // }
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
   // for (let el in obj.options) {
   //    console.log(obj.options.el)
   //    if (el.type === 'single') {

   //    } else if (_.isArray(el.type)) {
   //       let list = [];
   //       el.ref.forEach((ref,i) => {
   //          if (ref === 'arr') {
   //             list.push(el.list[i])
   //          } else if (ref === 'obj') {
   //             let arr = getReferenceListSingle(el.list)
   //             // if (_.isArray(el.list[0])) arr = getReferenceListMerged(el.list)
   //             // else arr = getReferenceListSingle(el.list)
   //             list.push(arr)
   //          }})
   //       console.log(list)
   //    }
   //    let opt = {
   //       name: obj.name,
   //       cat: el.cat,
   //       count: el.count,
   //       result: el.result,
   //    }
   // }
   return results;
}
const getSelectionList = (ref) => {
   if (ref[0] === 'language') return Object.keys(language);
   if (_.isString(ref[0])) return ref.reduce((a,b) => a[b], Proficiencies)
   else return ref.map(key => Proficiencies[key[0]][key[1]][key[2]]).flat();
   // if (_.isString(ref[0])) {
   //    return ref.reduce((a,b) => a[b], Proficiencies)
   // } else {
   //    let arr = ref.map(key => Proficiencies[key[0]][key[1]][key[2]]);
   //    const result = arr.flat(2)
   //    console.log(result)
   //    return result
   // }
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
   let count = _.split(string, ' ').length;
   if (count > 1) {
      let corrected = _.words(string).map((word,i) => i === 0 ? _.capitalize(word) : noCaps.includes(word) ? word : _.capitalize(word))
      return corrected.join(' ');
   } else return _.capitalize(string)
   
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
   