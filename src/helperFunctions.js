import { language, skills } from './data/CharacterDetails';

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
      // console.log(abilities)  
   })
   return result;
}

// class Ability {
// 	constructor(name, id) {
// 		this.name = name;
// 		this.id = id;
//       this.baseValue = 0;
// 	   this.raceBonusValue = 0;
// 	   this.classBonusValue = 0;
//       // this.modifier = 0;
// 	}
	
// 	get bonusValue() {
// 		return this.classBonusValue + this.raceBonusValue;
// 	}
// 	get displayName() {
// 	   return this.name.charAt(0).toUpperCase() + this.name.slice(1);
// 	}
// 	get totalValue() {
// 		return this.baseValue + this.bonusValue;
// 	}
//    get modifier() {
//       return this.baseValue > 0 ? Math.floor((this.totalValue - 10) / 2) : null;
//    }
// 	set baseValue(val) {
// 		this._baseValue = val;
// 	}
// 	set raceBonusValue(val) {
// 		this._raceBonusValue = val;
// 	}
// 	set classBonusValue(val) {
// 		this._classBonusValue = val;
// 	}
// }

// const abilityArr = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma' ]

// export const createAbilityObject = () => {
//    let abilities = {}
//    for (let [i, val] of abilityArr.entries()) {
//       let obj = new Ability (val, i)
//       abilities[val] = obj
//   }
//   return abilities;
// }

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