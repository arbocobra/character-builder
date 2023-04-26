import { skills } from '../../data/CharacterDetails';
const _ = require('lodash'); 

export const calcSpellsKnown = (charClass, level, mod) => {
   let result;
   let arr;
   switch (charClass) {
      case 'artificer':
         result = mod + Math.floor(level / 2);
         break;
      case 'bard':
         arr = [0,4,5,6,7,8,9,10,11,12,14,15,15,16,18,19,19,20,22,22,22]
         result = arr[level]
         break;
      case 'cleric':
         result = mod + level;
         break;
      case 'druid':
         result = mod + level;
         break;
      case 'paladin':
         result = mod + Math.floor(level / 2);
         break;
      case 'ranger':
         arr = [0,0,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11]
         result = arr[level]
         break;
      case 'sorcerer': 
         arr = [0,2,3,4,5,6,7,8,9,10,11,12,12,13,13,14,14,15,15,15,15];
         result = arr[level]
         break;
      case 'warlock':
         arr = [0,2,3,4,5,6,7,8,9,10,10,11,11,12,12,13,13,14,14,15,15];
         result = arr[level]
         break;
      case 'wizard':
         result = mod + level;
         break;
      default: 
         result = 1;
   }

   return result > 0 ? result : 1;
}

export const getClassFeaturesFunctions = (current, ref) => {
   const charClass = current.class;
   const level = current.level;
   const args = [level, current, ref]
   const arr = ClassSpells[charClass][1].filter((el,i) => i <= level).flat();
   const update = {}
   arr.forEach(el => {
      let result = el(args);
      Object.assign(update, result);
   })
   console.log(update)
}


const spellcasting = (args) => {
   const level = args[0];
   const current = args[1];
   const ref = args[2];

   const charClass = current.class;
   const spellSaveAbility = ref.spell_save;
   const profBonus = current.proficiency_bonus;

   let spellMod = args[1].abilities.modifiers?.[spellSaveAbility];
   spellMod = _.isNumber(spellMod) ? spellMod : 0;
   const spellsKnown = calcSpellsKnown(charClass,level,spellMod)

   const spellSlots = spellSlotsObj[charClass][level];
   const saveDC = 8 + profBonus + spellMod;
   const attackMod = profBonus + spellMod;

   return {
      'spell slots': spellSlots,
      'spells known': spellsKnown,
      'spell save': saveDC,
      'spell attack': attackMod
   };
}

const infuseItem = (args) => {
   const level = args[0];
   let indexKnown = [0,2,6,10,14,18].findLastIndex(el => el <= level)
   const infusionsKnown = [null,4,6,8,10,12][indexKnown]
   let indexItems = [0,2,6,10,14,18].findLastIndex(el => el <= level)
   const infusedItems = [null,2,3,4,5,6][indexItems]
   return {
      'infusions known': infusionsKnown,
      'infused items': infusedItems
   }
}
const rage = (args) => {
   const level = args[0];
   let indexRage = [0,1,3,6,12,17,20].findLastIndex(el => el <= level)
   const rageNum = [null,2,3,4,5,6,'unlimited'][indexRage]
   let indexDamage = [0,1,9,16].findLastIndex(el => el <= level)
   const rageDamage = [null,'+2','+3','+4'][indexDamage]
   return {
      rages: rageNum,
      'rage damage': rageDamage
   }
}
const primalKnowledge = (args) => {
   const level = args[0];
   const ref = args[2].select;

   const count = [3,10].filter(el => level >= el).length;
   const arr = ref.filter(el => el[0] === 'skills').flat()
   return {'primal knowledge': ['skills', count, arr[2]]}
}
const brutalCritical = (args) => {
   const level = args[0];
   let indexBrutal = [0,9,13,17].findLastIndex(el => el <= level)
   const brutalCrit = [null,'+1 dice','+2 dice','+3 dice'][indexBrutal];
   return {
      'brutal critial': brutalCrit
   }
}
const bardicInspiration = (args) => {
   const level = args[0];
   let index = [0,1,5,10,15].findLastIndex(el => el <= level)
   const bardInsp = [null,'d6','d8','d10','d12'][index];
   return {
      'bardic inspiration': bardInsp
   }
}
const songRest = (args) => {
   const level = args[0];
   let index = [0,2,9,13,17].findLastIndex(el => el <= level)
   const songRest = [null,'d6','d8','d10','d12'][index];
   return {
      'song of rest': songRest
   }
}
const jackTrades = (args) => {
   const current = args[1];
   const profBonus = current.proficiency_bonus;
   const halfPB = Math.floor(profBonus / 2);
   const currentSkills = current.skills.total;
   const filterSkills = skills.map(el => el[0]).filter(el => !currentSkills.includes(el))
   return {
      'jack of all trades': [filterSkills, halfPB],
   }
}
const expertise = (args) => {
   const level = args[0];
   const count = [3,10].filter(el => level >= el).length;
   const skills = args[1].skills.total;
   return {
      'expertise': ['skills', count, skills]
   }
}
const bardicVersatility = (args) => {
   console.log('bardicVersatility incomplete')
   return {versatility: 'noop'}
}
const magicalSecrets = (args) => {
   const level = args[0];
   const count = [10,14,18].filter(el => level >= el).length * 2;
   return {
      'magical secrets': ['** select spells', count]
   }
}
const channelDivinity = (args) => {
   const level = args[0];
   let channelDiv = [2,6,18].filter(el => level >= el).length
   return {
      'channel divinity': channelDiv
   }
}
const harnessDivinePower = (args) => {
   const level = args[0];
   let harnessDiv = [2,6,18].filter(el => level >= el).length
   return {
      'harness divine power': harnessDiv
   }
}
const cantripVersatility = (args) => {
   console.log('cantripVersatility incomplete')
   return {versatility: 'noop'}
}
const destroyUndead = (args) => {
   const level = args[0];
   let index = [0,5,8,11,14,17].findLastIndex(el => el <= level)
   const destroyUndead = [null,'CR 1/2', 'CR 1', 'CR 2', 'CR 3', 'CR 4'][index];
   return {
      'destroy undead': destroyUndead
   }
}
const divineIntervention = (args) => {
   const level = args[0];
   return {'divine intervention': level}
}
const druidic = (args) => {
   const languages = args[1].languages;
   return {
      'druidic': [languages, 'druidic']
   }
}
const wildShape = (args) => {
   const level = args[0];
   let index = [0,2,4,8].findLastIndex(el => el <= level)
   const limits = [null,'CR 1/4 - No flying / swimming speed', 'CR 1/2 - No flying speed', 'CR 1'][index];
   return {
      'wild shape': limits
   }
}

const fightingStyle = (args) => {}
const secondWind = (args) => {}
const actionSurge = (args) => {}
const martialVersatility = (args) => {
   console.log('martialVersatility incomplete')
   return {versatility: 'noop'}
}
const extraAttack = (args) => {}
const indomitable = (args) => {}

const unarmoredDefense = (args) => {}
const martialArts = (args) => {}
const ki = (args) => {}
const unarmoredMovement = (args) => {}
const tongueSunMoon = (args) => {}
const diamondSoul = (args) => {}

const divineSense = (args) => {}
const layHands = (args) => {}
const auraProtection = (args) => {}
const auraCourage = (args) => {}
const cleansingTouch = (args) => {}

const favoredEnemy = (args) => {}
const naturalExplorer = (args) => {}
const deftExplore = (args) => {}
const favoredFoe = (args) => {}
const primevalAwareness = (args) => {}
const primalAwareness = (args) => {}
const hidePlainSight = (args) => {}
const naturesVeil = (args) => {}

const sneakAttack = (args) => {}
const thievesCant = (args) => {}
const abilityScore = (args) => {}
const slipperyMind = (args) => {}

const fontMagic = (args) => {}
const metamagic = (args) => {}
const sorcerousVersatility = (args) => {
   console.log('sorcerousVersatility incomplete')
   return {versatility: 'noop'}
}

const eldritchInvocations = (args) => {}
const pactBoon = (args) => {}
const eldritchVersatility = (args) => {
   console.log('eldritchVersatility incomplete')
   return {versatility: 'noop'}
}
const mysticArcanum = (args) => {}

const arcaneRecovery = (args) => {}
const spellMastery = (args) => {}
const signatureSpells = (args) => {}

export const ClassSpells = {
   artificer: [
      [[],['spellcasting'], ['infuse item'], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
      [[],[spellcasting], [infuseItem], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
   ],
   barbarian: [
      [[],['rage'], [], ['primal knowledge'], [], [], [], [], [], ['brutal critical'], [], [], [], [], [], [], [], [], [], [], []],
      [[],[rage], [], [primalKnowledge], [], [], [], [], [], [brutalCritical], [], [], [], [], [], [], [], [], [], [], []],
   ],
   bard: [
      [[],['spellcasting', 'bardic inspiration'], ['jack of all trades', 'song of rest'], ['expertise'], ['bardic versatility'], [], [], [], [], [], ['magical secrets'], [], [], [], [], [], [], [], [], [], []],
      [[],[spellcasting, bardicInspiration], [jackTrades, songRest], [expertise], [bardicVersatility], [], [], [], [], [], [magicalSecrets], [], [], [], [], [], [], [], [], [], []],
   ],
   cleric: [
      [[],['spellcasting'], ['channel divinity', 'harness divine power'], [], ['cantrip versatility'], ['destroy undead'], [], [], [], [], ['divine intervention'], [], [], [], [], [], [], [], [], [], []],
      [[],[spellcasting], [channelDivinity, harnessDivinePower], [], [cantripVersatility], [destroyUndead], [], [], [], [], [divineIntervention], [], [], [], [], [], [], [], [], [], []],
   ],
   druid: [
      [[],['spellcasting', 'druidic'], ['wild shape'], [], ['cantrip versatility'], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
      [[],[spellcasting, druidic], [wildShape], [], [cantripVersatility], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
   ],
   fighter: [
      [[], ['fighting style', 'second wind'], ['action surge'], [], ['martial versatility'], ['extra attack'], [], [], [], ['indomitable'], [], [], [], [], [], [], [], [], [], [], []],
      [[], [fightingStyle, secondWind], [actionSurge], [], [martialVersatility], [extraAttack], [], [], [], [indomitable], [], [], [], [], [], [], [], [], [], [], []],
   ],
   monk: [
      [[], ['unarmored defense', 'martial arts'], ['ki', 'unarmored movement'], [], [], [], [], [], [], [], [], [], [], ['tongue of the sun and moon'], ['diamond soul'], [], [], [], [], [], []],
      [[], [unarmoredDefense, martialArts], [ki, unarmoredMovement], [], [], [], [], [], [], [], [], [], [], [tongueSunMoon], [diamondSoul], [], [], [], [], [], []],
   ],
   paladin: [
      [[], ['divine sense', 'lay on hands'], ['fighting style', 'spellcasting'], ['harness divine power'], ['martial versatility'], [], ['aura of protection'], [], [], [], ['aura of courage'], [], [], [], ['cleansing touch'], [], [], [], [], [], []],
      [[], [divineSense, layHands], [fightingStyle, spellcasting], [harnessDivinePower], [martialVersatility], [], [auraProtection], [], [], [], [auraCourage], [], [], [], [cleansingTouch], [], [], [], [], [], []],
   ],
   ranger: [
      [[], ['favored enemy', 'natural explorer', 'deft explore', 'favored foe'], ['fighting style', 'spellcasting'], ['primeval awareness', 'primal awareness'], ['martial versatility'], [], [], [], [], [], ['hide in plain sight', 'nature\'s veil'], [], [], [], [], [], [], [], [], [], []],
      [[], [favoredEnemy, naturalExplorer, deftExplore, favoredFoe], [fightingStyle, spellcasting], [primevalAwareness, primalAwareness], [martialVersatility], [], [], [], [], [], [hidePlainSight, naturesVeil], [], [], [], [], [], [], [], [], [], []],
   ],
   rogue: [
      [[], ['expertise', 'sneak attack', 'thieves\' cant'], [], [], [], [], [], [], [], [], ['ability score improvement'], [], [], [], [], ['slippery mind'], [], [], [], [], []],
      [[], [expertise, sneakAttack, thievesCant], [], [], [], [], [], [], [], [], [abilityScore], [], [], [], [], [slipperyMind], [], [], [], [], []],
   ],
   sorcerer: [
      [[], ['spellcasting'], ['font of magic'], ['metamagic'], ['sorcerous versatility'], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
      [[], [spellcasting], [fontMagic], [metamagic], [sorcerousVersatility], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
   ],
   warlock: [
      [[], ['pact magic'], ['eldritch invocations'], ['pact boon'], ['eldritch versatility'], [], [], [], [], [], [], ['mystic arcanum'], [], [], [], [], [], [], [], [], []],
      [[], [spellcasting], [eldritchInvocations], [pactBoon], [eldritchVersatility], [], [], [], [], [], [], [mysticArcanum], [], [], [], [], [], [], [], [], []],
   ],
   wizard: [
      [[], ['spellcasting', 'arcane recovery'], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], ['spell mastery'], [], ['signature spells']],
      [[], [spellcasting, arcaneRecovery], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [spellMastery], [], [signatureSpells]],
   ],
}

const spellSlotsObj = {
   artificer: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [2, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [2, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [2, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [2, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 3, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 3, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [4, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [4, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [4, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [4, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [4, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [4, 4, 3, 3, 3, 2, 0, 0, 0, 0],
      [4, 4, 3, 3, 3, 2, 0, 0, 0, 0],
   ],
   barbarian: [],
   bard: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 3, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [3, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [3, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [4, 4, 3, 3, 3, 2, 0, 0, 0, 0],
      [4, 4, 3, 3, 3, 2, 1, 0, 0, 0],
      [4, 4, 3, 3, 3, 2, 1, 0, 0, 0],
      [4, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [4, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [4, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [4, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [4, 4, 3, 3, 3, 2, 1, 1, 1, 1],
      [4, 4, 3, 3, 3, 3, 1, 1, 1, 1],
      [4, 4, 3, 3, 3, 3, 2, 1, 1, 1],
      [4, 4, 3, 3, 3, 3, 2, 2, 1, 1],
   ],
   cleric: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [3, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [3, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [4, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [4, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [4, 4, 3, 3, 0, 0, 0, 0, 0, 0],
      [4, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [4, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [4, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [5, 4, 3, 3, 3, 2, 0, 0, 0, 0],
      [5, 4, 3, 3, 3, 2, 1, 0, 0, 0],
      [5, 4, 3, 3, 3, 2, 1, 0, 0, 0],
      [5, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [5, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [5, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [5, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [5, 4, 3, 3, 3, 2, 1, 1, 1, 1],
      [5, 4, 3, 3, 3, 3, 1, 1, 1, 1],
      [5, 4, 3, 3, 3, 3, 2, 1, 1, 1],
      [5, 4, 3, 3, 3, 3, 2, 2, 1, 1],
   ],
   druid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 3, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [3, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [3, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [4, 4, 3, 3, 3, 2, 0, 0, 0, 0],
      [4, 4, 3, 3, 3, 2, 1, 0, 0, 0],
      [4, 4, 3, 3, 3, 2, 1, 0, 0, 0],
      [4, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [4, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [4, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [4, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [4, 4, 3, 3, 3, 2, 1, 1, 1, 1],
      [4, 4, 3, 3, 3, 3, 1, 1, 1, 1],
      [4, 4, 3, 3, 3, 3, 2, 1, 1, 1],
      [4, 4, 3, 3, 3, 3, 2, 2, 1, 1],
   ],
   fighter: [],
   monk: [],
   paladin: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 0, 0, 0, 0],
   ],
   ranger: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 0, 0, 0, 0],
   ],
   rogue: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [2, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [2, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 3, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 3, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 3, 0, 0, 0, 0, 0, 0],
      [3, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [3, 4, 3, 3, 1, 0, 0, 0, 0, 0]
   ],
   sorcerer: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [4, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [4, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [4, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [5, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [5, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [5, 4, 3, 3, 0, 0, 0, 0, 0, 0],
      [5, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [5, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [5, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [6, 4, 3, 3, 3, 2, 0, 0, 0, 0],
      [6, 4, 3, 3, 3, 2, 1, 0, 0, 0],
      [6, 4, 3, 3, 3, 2, 1, 0, 0, 0],
      [6, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [6, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [6, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [6, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [6, 4, 3, 3, 3, 2, 1, 1, 1, 1],
      [6, 4, 3, 3, 3, 3, 1, 1, 1, 1],
      [6, 4, 3, 3, 3, 3, 2, 1, 1, 1],
      [6, 4, 3, 3, 3, 3, 2, 2, 1, 1]
   ],
   warlock: [
      [2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 2, 0, 0, 0, 0, 0, 0, 0],
      [3, 0, 2, 0, 0, 0, 0, 0, 0, 0],
      [3, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [3, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      [3, 0, 0, 0, 2, 0, 0, 0, 0, 0],
      [3, 0, 0, 0, 2, 0, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 2, 0, 0, 0, 0],
      [4, 0, 0, 0, 0, 2, 0, 0, 0, 0],
      [4, 0, 0, 0, 0, 3, 0, 0, 0, 0],
      [4, 0, 0, 0, 0, 3, 0, 0, 0, 0],
      [4, 0, 0, 0, 0, 3, 0, 0, 0, 0],
      [4, 0, 0, 0, 0, 3, 0, 0, 0, 0],
      [4, 0, 0, 0, 0, 3, 0, 0, 0, 0],
      [4, 0, 0, 0, 0, 3, 0, 0, 0, 0],
      [4, 0, 0, 0, 0, 4, 0, 0, 0, 0],
      [4, 0, 0, 0, 0, 4, 0, 0, 0, 0],
      [4, 0, 0, 0, 0, 4, 0, 0, 0, 0],
      [4, 0, 0, 0, 0, 4, 0, 0, 0, 0]
   ],
   wizard: [
      [3, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [3, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [4, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [4, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [4, 4, 3, 3, 0, 0, 0, 0, 0, 0],
      [4, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [4, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [4, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [5, 4, 3, 3, 3, 2, 0, 0, 0, 0],
      [5, 4, 3, 3, 3, 2, 1, 0, 0, 0],
      [5, 4, 3, 3, 3, 2, 1, 0, 0, 0],
      [5, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [5, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [5, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [5, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [5, 4, 3, 3, 3, 2, 1, 1, 1, 1],
      [5, 4, 3, 3, 3, 3, 1, 1, 1, 1],
      [5, 4, 3, 3, 3, 3, 2, 1, 1, 1],
      [5, 4, 3, 3, 3, 3, 2, 2, 1, 1],
   ],
}

// export const abilityScoreImprovements = (current) => {
//    const level = current.level;
//    const asiLevels = [4,8,12,16,19];
//    const classBonus = current.abilities.bonus.class;
//    if (_.isEmpty(classBonus)) {
//       let ref = {select: []}
//       for (let i = 0; i <= level; i++) {
//          if (asiLevels.includes(i)) ref.select.push(['abilities', 2, 'ALL'])
//       }
//       return ref;
//    }
// }