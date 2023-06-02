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
   
   if (charClass === 'artificer') return artificerFeatures(update)
   if (charClass === 'barbarian') return barbarianFeatures(update)
   if (charClass === 'bard') return bardFeatures(update)
   if (charClass === 'cleric') return clericFeatures(update)
   if (charClass === 'druid') return druidFeatures(update)
   if (charClass === 'fighter') return fighterFeatures(update)
   if (charClass === 'monk') return monkFeatures(update)
   if (charClass === 'paladin') return paladinFeatures(update)
   if (charClass === 'ranger') return rangerFeatures(update)
   if (charClass === 'rogue') return rogueFeatures(update)
   if (charClass === 'sorcerer') return sorcererFeatures(update)
   if (charClass === 'warlock') return warlockFeatures(update)
   if (charClass === 'wizard') return wizardFeatures(update)
}

const artificerFeatures = (results) => {
   // console.log(results)
   const feats = Object.keys(results);
   const calcFuncs = {}
   const specialDetails = {}
   feats.forEach(el => {
      if (el !== 'spellcasting') specialDetails[el] = results[el]
   })
   return [calcFuncs, specialDetails, results.spellcasting]
}
const barbarianFeatures = (results) => {
   // console.log(results)
   const feats = Object.keys(results);
   const calcFuncs = {}
   const specialDetails = {}
   feats.forEach(el => {
      if (['primal knowledge', 'unarmored defense'].includes(el)) calcFuncs[el] = results[el];
      else specialDetails[el] = results[el];
   })
   return [calcFuncs, specialDetails]
}
const bardFeatures = (results) => {
   // console.log(results)
   const feats = Object.keys(results);
   const calcFuncs = {}
   const specialDetails = {}
   feats.forEach(el => {
      if (['bardic inspiration','song of rest'].includes(el)) specialDetails[el] = results[el];
      else if (el !== 'spellcasting') calcFuncs[el] = results[el]
   })
   return [calcFuncs, specialDetails, results.spellcasting]
}
const clericFeatures = (results) => {
   // console.log(results)
   const feats = Object.keys(results);
   const calcFuncs = {}
   const specialDetails = {}
   feats.forEach(el => {
      if (['versatility'].includes(el)) calcFuncs[el] = results[el]
      else if (el !== 'spellcasting') specialDetails[el] = results[el]
   })
   return [calcFuncs, specialDetails, results.spellcasting]
}
const druidFeatures = (results) => {
   const feats = Object.keys(results);
   const calcFuncs = {}
   const specialDetails = {}
   feats.forEach(el => {
      if (['wild shape'].includes(el)) specialDetails[el] = results[el]
      else if (el !== 'spellcasting') calcFuncs[el] = results[el]
   })
   return [calcFuncs, specialDetails, results.spellcasting]
}
const fighterFeatures = (results) => {
   // console.log(results)
   const feats = Object.keys(results);
   const calcFuncs = {}
   const specialDetails = {}
   feats.forEach(el => {
      if (['versatility', 'fighting style'].includes(el)) calcFuncs[el] = results[el]
      else specialDetails[el] = results[el]
   })
   return [calcFuncs, specialDetails]
}
const monkFeatures = (results) => {
   // console.log(results)
   const feats = Object.keys(results);
   const calcFuncs = {}
   const specialDetails = {}
   feats.forEach(el => {
      if (['ki','martial arts'].includes(el)) specialDetails[el] = results[el]
      else calcFuncs[el] = results[el]
   })
   return [calcFuncs, specialDetails]
}
const paladinFeatures = (results) => {
   // console.log(results)
   const feats = Object.keys(results);
   const calcFuncs = {}
   const specialDetails = {}
   feats.forEach(el => {
      if (['versatility', 'fighting style'].includes(el)) calcFuncs[el] = results[el];else if (el !== 'spellcasting') specialDetails[el] = results[el];
   })
   return [calcFuncs, specialDetails, results.spellcasting]
}
const rangerFeatures = (results) => {
   // console.log(results)
   const selectOpts = {select: [['feature', 1, ['favored enemy', 'favored foe']],['feature', 1, ['deft explorer', 'natural explorer']], ['feature', 1, ['primal awareness', 'primeval awareness']],['feature', 1, ['hide in plain sight', 'nature\'s veil']]]}
   const feats = Object.keys(results);
   const calcFuncs = {}
   const specialDetails = {}
   feats.forEach(el => {
      if (el !== 'spellcasting') calcFuncs[el] = results[el]
   })
   Object.assign(calcFuncs,selectOpts)
   return [calcFuncs, specialDetails, results.spellcasting]
}
const rogueFeatures = (results) => {
   // console.log(results)
   const feats = Object.keys(results);
   const calcFuncs = {}
   const specialDetails = {}
   feats.forEach(el => {
      if (['sneak attack'].includes(el)) {
         specialDetails[el] = results[el]
      } else if (el !== 'ability score') {
         calcFuncs[el] = results[el]
      }
   })
   Object.assign(calcFuncs, {select: ['abilities', 2, 'ALL']})
   // console.log(calcFuncs)
   // console.log(specialDetails)
   return [calcFuncs, specialDetails]
}
const sorcererFeatures = (results) => {
   // console.log(results)
   const feats = Object.keys(results);
   const calcFuncs = {}
   const specialDetails = {}
   feats.forEach(el => {
      if (['sorcery points'].includes(el)) {
         specialDetails[el] = results[el]
      } else if (el !== 'spellcasting') {
         calcFuncs[el] = results[el]
      }
   })
   // console.log(calcFuncs)
   // console.log(specialDetails)
   return [calcFuncs, specialDetails, results.spellcasting]
}
const warlockFeatures = (results) => {
   // console.log(results)
   const feats = Object.keys(results);
   const calcFuncs = {}
   const specialDetails = {}
   feats.forEach(el => {
      if (el !== 'spellcasting') {
         calcFuncs[el] = results[el]
      }
   })
   // console.log(calcFuncs)
   // console.log(specialDetails)
   return [calcFuncs, specialDetails, results.spellcasting]
}
const wizardFeatures = (results) => {
   // console.log(results)
   const feats = Object.keys(results);
   const calcFuncs = {}
   const specialDetails = {}
   feats.forEach(el => {
      if (['arcane recovery'].includes(el)) {
         specialDetails[el] = results[el]
      } else if (el !== 'spellcasting') {
         calcFuncs[el] = results[el]
      }
   })
   // console.log(calcFuncs)
   // console.log(specialDetails)
   return [calcFuncs, specialDetails, results.spellcasting]
}

export const spellcastingAlt = (level, charClass, spellSaveAbility, profBonus, current) => {
   // const spellSaveAbility = current.class_spell_save;
   // const profBonus = current.proficiency_bonus;

   let saveMod = current.abilities.modifiers?.[spellSaveAbility];
   const spellMod = _.isNumber(saveMod) ? saveMod : 0;
   const spellsKnown = calcSpellsKnown(charClass,level,spellMod)

   const spellSlots = spellSlotsObj[charClass][level];
   const saveDC = 8 + profBonus + spellMod;
   const attackMod = profBonus + spellMod;

   return {
      spell_slots: spellSlots,
      spells_known: spellsKnown,
      spell_modifier: spellMod,
      spell_save: saveDC,
      spell_attack: attackMod
   };
}

const spellcasting = (args) => {
   const level = args[0];
   const current = args[1];
   const ref = args[2];

   const charClass = current.class;
   const spellSaveAbility = ref.spell_save;
   const profBonus = current.proficiency_bonus;

   let saveMod = args[1].abilities.modifiers?.[spellSaveAbility];
   const spellMod = _.isNumber(saveMod) ? saveMod : 0;
   const spellsKnown = calcSpellsKnown(charClass,level,spellMod)

   const spellSlots = spellSlotsObj[charClass][level];
   const saveDC = 8 + profBonus + spellMod;
   const attackMod = profBonus + spellMod;

   return {
      spellcasting: {
         spell_slots: spellSlots,
         spells_known: spellsKnown,
         spell_modifier: spellMod,
         spell_save: saveDC,
         spell_attack: attackMod
      }
   };
}
// ***
const infuseItem = (args) => {
   const level = args[0];
   let indexKnown = [0,2,6,10,14,18].findLastIndex(el => el <= level)
   const infusionsKnown = [null,4,6,8,10,12][indexKnown]
   let indexItems = [0,2,6,10,14,18].findLastIndex(el => el <= level)
   const infusedItems = [null,2,3,4,5,6][indexItems]
   return {
      'infusions known': infusionsKnown,
      'infused items': infusedItems,
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
const unarmoredDefenseBarbarian = (args) => {
   const armor = args[1].armor;
   const dexMod = args[1].abilities.modifiers[1];
   const conMod = args[1].abilities.modifiers[2];
   return {
      'unarmored defense': [armor, [dexMod, conMod]],
   }
}
const primalKnowledge = (args) => {
   const level = args[0];
   const ref = args[2].select;

   const count = [3,10].filter(el => level >= el).length;
   const arr = ref.filter(el => el[0] === 'skills').flat()
   return {
      'primal knowledge': ['** skills', count, arr[2]]
   }
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
   const bardInsp = [null,'1d6','1d8','1d10','1d12'][index];
   return {
      'bardic inspiration': bardInsp
   }
}
const songRest = (args) => {
   const level = args[0];
   let index = [0,2,9,13,17].findLastIndex(el => el <= level)
   const songRest = [null,'1d6','1d8','1d10','1d12'][index];
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
      'expertise': ['** skills', count, skills]
   }
}
const bardicVersatility = (args) => {
   // console.log('bardicVersatility incomplete')
   return {versatility: '** noop'}
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
      'channel divinity': `${channelDiv} uses`
   }
}
const harnessDivinePower = (args) => {
   const level = args[0];
   let harnessDiv = [2,6,18].filter(el => level >= el).length
   return {
      'harness divine power': `${harnessDiv} uses`
   }
}
const cantripVersatility = (args) => {
   // console.log('cantripVersatility incomplete')
   return {versatility: '** noop'}
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
   return {'divine intervention': `roll ${level} or less / 100`}
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
// ***
const fightingStyle = (args) => {
   const features = args[1].features;
   return {
      'fighting style': [features, fightingStyleObj[args[1].class]]
   }
}
const secondWind = (args) => {
   const level = args[0];
   return {
      'second wind': `d10 + ${level}`,
   }
}
const actionSurge = (args) => {
   const level = args[0];
   let actionSurge = [2,17].filter(el => level >= el).length
   return {
      'action surge': `${actionSurge} uses`
   }
}
const martialVersatility = (args) => {
   // console.log('martialVersatility incomplete')
   return {versatility: '**noop'}
}
const extraAttackFighter = (args) => {
   const level = args[0];
   let extraAttack = [5,11,20].filter(el => level >= el).length
   return {
      'extra attack': `+${extraAttack}`
   }
}
const indomitable = (args) => {
   const level = args[0];
   let indom = [9,13,17].filter(el => level >= el).length
   return {
      'indomitable': `${indom} uses`
   }
}
const unarmoredDefenseMonk = (args) => {
   const armor = args[1].armor;
   const dexMod = args[1].abilities.modifiers[1];
   const wisMod = args[1].abilities.modifiers[4];
   return {
      'unarmored defense': [armor, [dexMod, wisMod]]
   }
}
const martialArts = (args) => {
   const level = args[0];
   let index = [0,1,5,11,17].findLastIndex(el => el <= level)
   const martialA = [null,'1d4','1d6','1d8','1d10'][index];
   return {
      'martial arts': martialA
   }
}
const ki = (args) => {
   const level = args[0];
   return {
      'ki': level > 1 ? level : null,
   }
}
const unarmoredMovement = (args) => {
   const level = args[0];
   const speed = args[1].speed;
   let index = [0,2,6,10,14,18].findLastIndex(el => el <= level)
   const unarmMov = [null,'+10 ft.','+15 ft.','+20 ft.','+25 ft.','+30 ft.'][index];
   return {
      'unarmored movement': [unarmMov, [speed, Number.parseInt(unarmMov)]],
   }
}
const tongueSunMoon = (args) => {
   const languages = args[1].languages;
   return {
      'tongue of the sun and moon': ['ALL - from Tongue of the Sun and Moon', languages]
   }
}
const diamondSoul = (args) => {
   const saves = args[1].saving_throws;
   return {
      'diamond soul': [['strength','dexterity','constitution','intelligence','wisdom','charisma'], saves]
   }
}
const divineSense = (args) => {
   const chaMod = args[1].abilities.modifiers[5];
   return {
      'divine sense': `${chaMod + 1} uses`
   }
}
const layHands = (args) => {
   const level = args[0];
   return {
      'lay on hands': `pool of ${level * 5}`
   }
}
const auraProtection = (args) => {
   const level = args[0];
   let chaMod = args[1].abilities.modifiers[5];
   if (chaMod < 1) chaMod = 1;
   const range = level >= 18 ? '30\' range' : level >= 6 ? '10\' range' : null;
   return {
      'aura of protection': `+${chaMod}, ${range}`
   }
}
const auraCourage = (args) => {
   const level = args[0];
   const range = level >= 18 ? '30\' range' : level >= 10 ? '10\' range' : null;
   return {
      'aura of courage': range
   }
}
const cleansingTouch = (args) => {
   const chaMod = args[1].abilities.modifiers[5];
   return {
      'cleansing touch': `${chaMod < 1 ? 1 : chaMod} uses`
   }
}
// ***
const favoredEnemy = (args) => {
   const level = args[0];
   const lang = args[1].languages;
   const selections = [1,6,14].filter(el => level >= el).length;
   const options = ['aberrations', 'beasts', 'celestials', 'constructs', 'dragons', 'elementals', 'fey', 'fiends', 'giants', 'monstrosities', 'oozes', 'plants', 'undead', 'OR 2 humanoid species']
   return {
      'favored enemy': [[lang, 'Languages of favoured enemies'], options, selections]
   }
}
// ***
const naturalExplorer = (args) => {
   const level = args[0];
   const selections = [1,6,10].filter(el => level >= el).length;
   const options = ['arctic', 'coast', 'desert', 'forest', 'grassland', 'mountain', 'swamp', 'the underdark'];
   return {
      'favored enemy': [options, selections]
   }
}
// ***
const deftExplore = (args) => {
   const level = args[0];
   const current = args[1];
   let index = [0,1,6,10].findLastIndex(el => el <= level)
   const deftEx = [null,'canny','roving', 'tireless'][index];
   let wisMod = current.abilities.modifiers[4];
   if (wisMod < 1) wisMod = 1
   return {
      'deft explorer': [deftEx, [current.skill,current.proficiency_bonus, current.languages, 2], [current.speed + 5],[current.proficiency_bonus, wisMod]]
   }
}
const favoredFoe = (args) => {
   const level = args[0];
   let index = [0,1,6,14].findLastIndex(el => el <= level)
   const damage = [null,'1d4','1d6','1d8'][index]
   return {
      'favored foe': damage
   }
}
// ***
const primevalAwareness = (args) => {
   return {
      'primeval awareness': null,
   }
}
const primalAwareness = (args) => {
   const level = args[0];
   let index = [3,5,9,13,17].filter(el => level >= el).length;
   const spells = ['speak with animals','beast sense','speak with plants','locate creature','commune with nature'].slice(0, index + 1);
   return {
      'primal awareness': spells, 
   }
}
// ***
const hidePlainSight = (args) => {
   return {
      'hide in plain sight': null,
   }
}
// ***
const naturesVeil = (args) => {
   const proficB = args[1].proficiency_bonus;
   return {
      'nature\'s veil': proficB,
   }
}
const sneakAttack = (args) => {
   const level = args[0];
   let index = [0,1,3,5,7,9,11,13,15,17,19].findLastIndex(el => el <= level)
   const damage = [null, '1d6','2d6','3d6','4d6','5d6','6d6','7d6','8d6','9d6','10d6'][index]
   return {
      'sneak attack': `+${damage} damage`
   }
}
const thievesCant = (args) => {
   const languages = args[1].languages;
   return {
      'thieves\' cant': [languages, 'thieves\' cant']
   }
}
// **
const abilityScore = (args) => {
   return {
      'ability score': {select: ['abilities', 2, 'ALL']},
   }
}
const slipperyMind = (args) => {
   const saves = args[1].saving_throws;
   return {
      'slippery mind': [saves, 'wisdom']
   }
}
const fontMagic = (args) => {
   const level = args[0];
   const sorceryPts = level > 2 ? level : null;
   return {
      'sorcery points': sorceryPts,
   }
}
// **
const metamagic = (args) => {
   const level = args[0];
   let selection = [3,10,17].filter(el => level >= el).length + 1;
   const arr = [['careful spell','distant spell','empowered spell','extended spell','heightened spell','quickened spell','seeking spell','subtle spell','transmuted spell','twinned spell']];
   return {
      'metamagic': [selection, arr]
   }
}
const sorcerousVersatility = (args) => {
   // console.log('sorcerousVersatility incomplete')
   return {versatility: 'noop'}
}
// **
const eldritchInvocations = (args) => {
 return {
   'eldritch invocations': 'get spell array'
 }
}
// **
const pactBoon = (args) => {
   const arr = ['pact of the blade','pact of the tome','pact of the chain','pact of the talisman']
   return {
      'pact boon': arr
   }
}
const eldritchVersatility = (args) => {
   // console.log('eldritchVersatility incomplete')
   return {versatility: 'noop'}
}
const mysticArcanum = (args) => {
   const level = args[0];
   let index = [0,11,13,15,17].findLastIndex(el => el <= level);
   const selection = index === 0 ? null : [6,7,8,9].slice(0,index)
   return {
      'mystic arcanum': selection
   }
}
const arcaneRecovery = (args) => {
   const level = args[0];
   return {
      'arcane recovery': `spell slot value - ${Math.ceil(level / 2)}`
   }
}
// **
const spellMastery = (args) => {
   return {
      'spell mastery': 'get spellbook'
   }
}
// **
const signatureSpells = (args) => {
   return {
      'signature spells': 'get spellbook'
   }
}

export const ClassSpells = {
   artificer: [
      [[],['spellcasting'], ['infuse item'], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
      [[],[spellcasting], [infuseItem], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
   ],
   barbarian: [
      [[],['rage', 'unarmored defense (barbarian)'], [], ['primal knowledge'], [], [], [], [], [], ['brutal critical'], [], [], [], [], [], [], [], [], [], [], []],
      [[],[rage, unarmoredDefenseBarbarian], [], [primalKnowledge], [], [], [], [], [], [brutalCritical], [], [], [], [], [], [], [], [], [], [], []],
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
      [[], ['fighting style', 'second wind'], ['action surge'], [], ['martial versatility'], ['extra attack - fighter'], [], [], [], ['indomitable'], [], [], [], [], [], [], [], [], [], [], []],
      [[], [fightingStyle, secondWind], [actionSurge], [], [martialVersatility], [extraAttackFighter], [], [], [], [indomitable], [], [], [], [], [], [], [], [], [], [], []],
   ],
   monk: [
      [[], ['unarmored defense (monk)', 'martial arts'], ['ki', 'unarmored movement'], [], [], [], [], [], [], [], [], [], [], ['tongue of the sun and moon'], ['diamond soul'], [], [], [], [], [], []],
      [[], [unarmoredDefenseMonk, martialArts], [ki, unarmoredMovement], [], [], [], [], [], [], [], [], [], [], [tongueSunMoon], [diamondSoul], [], [], [], [], [], []],
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
      [0, 0, 0, 0, 0, 0],
      [2, 2, 0, 0, 0, 0],
      [2, 2, 0, 0, 0, 0],
      [2, 3, 0, 0, 0, 0],
      [2, 3, 0, 0, 0, 0],
      [2, 4, 2, 0, 0, 0],
      [2, 4, 2, 0, 0, 0],
      [2, 4, 3, 0, 0, 0],
      [2, 4, 3, 0, 0, 0],
      [2, 4, 3, 2, 0, 0],
      [3, 4, 3, 2, 0, 0],
      [3, 4, 3, 3, 0, 0],
      [3, 4, 3, 3, 0, 0],
      [3, 4, 3, 3, 1, 0],
      [4, 4, 3, 3, 1, 0],
      [4, 4, 3, 3, 2, 0],
      [4, 4, 3, 3, 2, 0],
      [4, 4, 3, 3, 3, 1],
      [4, 4, 3, 3, 3, 1],
      [4, 4, 3, 3, 3, 2],
      [4, 4, 3, 3, 3, 2],
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
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0],
      [0, 3, 0, 0, 0, 0],
      [0, 3, 0, 0, 0, 0],
      [0, 4, 2, 0, 0, 0],
      [0, 4, 2, 0, 0, 0],
      [0, 4, 3, 0, 0, 0],
      [0, 4, 3, 0, 0, 0],
      [0, 4, 3, 2, 0, 0],
      [0, 4, 3, 2, 0, 0],
      [0, 4, 3, 3, 0, 0],
      [0, 4, 3, 3, 0, 0],
      [0, 4, 3, 3, 1, 0],
      [0, 4, 3, 3, 1, 0],
      [0, 4, 3, 3, 2, 0],
      [0, 4, 3, 3, 2, 0],
      [0, 4, 3, 3, 3, 1],
      [0, 4, 3, 3, 3, 1],
      [0, 4, 3, 3, 3, 2],
      [0, 4, 3, 3, 3, 2],  
   ],
   ranger: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0],
      [0, 3, 0, 0, 0, 0],
      [0, 3, 0, 0, 0, 0],
      [0, 4, 2, 0, 0, 0],
      [0, 4, 2, 0, 0, 0],
      [0, 4, 3, 0, 0, 0],
      [0, 4, 3, 0, 0, 0],
      [0, 4, 3, 2, 0, 0],
      [0, 4, 3, 2, 0, 0],
      [0, 4, 3, 3, 0, 0],
      [0, 4, 3, 3, 0, 0],
      [0, 4, 3, 3, 1, 0],
      [0, 4, 3, 3, 1, 0],
      [0, 4, 3, 3, 2, 0],
      [0, 4, 3, 3, 2, 0],
      [0, 4, 3, 3, 3, 1],
      [0, 4, 3, 3, 3, 1],
      [0, 4, 3, 3, 3, 2],
      [0, 4, 3, 3, 3, 2],
   ],
   rogue: [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [2, 2, 0, 0, 0],
      [2, 3, 0, 0, 0],
      [2, 3, 0, 0, 0],
      [2, 3, 0, 0, 0],
      [2, 4, 2, 0, 0],
      [2, 4, 2, 0, 0],
      [2, 4, 2, 0, 0],
      [3, 4, 3, 0, 0],
      [3, 4, 3, 0, 0],
      [3, 4, 3, 0, 0],
      [3, 4, 3, 2, 0],
      [3, 4, 3, 2, 0],
      [3, 4, 3, 2, 0],
      [3, 4, 3, 3, 0],
      [3, 4, 3, 3, 0],
      [3, 4, 3, 3, 0],
      [3, 4, 3, 3, 1],
      [3, 4, 3, 3, 1],
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
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
}
export const spellcastingArtificer = () => {
	return (
		<div className='spellcasting'>
			<p className='intro'>You've studied the workings of magic and how to cast spells, channeling the magic through objects. To observers, you don't appear to be casting spells in a conventional way; you appear to produce wonders from mundane items and outlandish inventions.</p>
			<ul>
				<li>You produce your artificer spell effects through your tools. You must have a spellcasting focus - specifically thieves' tools or some kind of artisan's tool - in hand when you cast any spell with this Spellcasting feature</li>
				<ul>
					<li>After you gain the Infuse Item feature at 2nd level, you can also use any item bearing one of your infusions as a spellcasting focus</li>
				</ul>
				<li>At 1st level, you know 2 cantrips of your choice from the artificer spell list. At higher levels, you learn additional artificer cantrips of your choice</li>
				<li>The table shows how many spell slots you have to cast your artificer spells of 1st level and higher</li>
				<li>To cast one of your artificer spells of 1st level or higher, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest</li>
            {/* spells PREPARED */}
				<li>You prepare the list of spells that are available for you to cast, choosing from the artificer spell list - the spells must be of a level for which you have spell slots</li>
				<li>You can change your list of prepared spells when you finish a long rest</li>
				<ul>
					<li>Preparing a new list of artificer spells requires time spent tinkering with your spellcasting focuses: at least 1 minute per spell level for each spell on your list</li>
				</ul>
				<li>Intelligence is your spellcasting ability for your artificer spells - Your understanding of the theory behind magic allows you to wield these spells with superior skill.</li>
				<ul>
					<li>In addition, you use your Intelligence modifier when setting the saving throw DC for an artificer spell you cast and when making an attack roll with one</li>
				</ul>
				<li>You can cast any artificer spell you know as a ritual if that spell has the ritual tag and you have the spell prepared</li>
			</ul>
		</div>
	);	
}
export const spellcastingBard = () => {
	return (
		<div className="spellcasting">
		<p className="intro">You have learned to untangle and reshape the fabric of reality in harmony with your wishes and music. Your spells are part of your vast repertoire, magic that you can tune to different situations.</p>
		<ul>
      <li>At 1st level, you know 2 cantrips of your choice from the Bard spell list. At higher levels, you learn additional Bard cantrips of your choice</li>
         <li>The table shows how many spell slots you have to cast your Bard spells of 1st level and higher</li>
			<li>To cast one of your Bard spells of 1st level or higher, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest</li>
         {/* spells KNOWN */}
         <li>You select spells of your choice from the Bard spell list as you gain levels</li>
			<li>The Spells Known column of the Bard table shows when you learn more Bard spells of your choice. Each of these spells must be of a level for which you have spell slots</li>
         <ul><li>When you gain a level in this class, you can choose one of the Bard spells you know and replace it with another spell from the Bard spell list</li></ul>
			<li>Charisma is your spellcasting ability for your Bard spells - your magic comes from the heart and soul you pour into the performance of your music or oration</li>
				<ul><li>In addition, you use your Charisma modifier when setting the saving throw DC for a Bard spell you cast and when making an attack roll with one</li></ul>
		<li>You can cast any Bard spell you know as a ritual if that spell has the ritual tag and you have the spell prepared</li>
      <li>You can use a musical instrument as a spellcasting focus for your bard spells</li>      
		</ul>
		</div>
	)	
}
export const spellcastingCleric = () => {
	return (
		<div className="spellcasting">
		<p className="intro">As a conduit for divine power, you can cast cleric spells.</p>
		<ul>
			<li>At 1st level, you know 3 cantrips of your choice from the Cleric spell list. At higher levels, you learn additional Cleric cantrips of your choice</li>
         <li>The table shows how many spell slots you have to cast your Cleric spells of 1st level and higher</li>
			<li>To cast one of your Cleric spells of 1st level or higher, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest</li>
         {/* spells PREPARED */}
         <li>You prepare the list of spells that are available for you to cast, choosing from the Cleric spell list - the spells must be of a level for which you have spell slots</li>
			<li>You can change your list of prepared spells when you finish a long rest</li>
         <ul>
            <li>Preparing a new list of cleric spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list</li>
         </ul>   
			<li>Wisdom is your spellcasting ability for your Cleric spells - The power of your spells comes from your devotion to your deity</li>
			<ul>
            <li>In addition, you use your Wisdom modifier when setting the saving throw DC for a Cleric spell you cast and when making an attack roll with one</li>
         </ul>
		   <li>You can cast any Cleric spell you know as a ritual if that spell has the ritual tag and you have the spell prepared</li>
         <li>You can use a holy symbol as a spellcasting focus for your cleric spells</li>
		</ul>
		</div>
	)	
}
export const spellcastingDruid = () => {
	return (
		<div className="spellcasting">
         <p className="intro">Drawing on the divine essence of nature itself, you can cast spells to shape that essence to your will.</p>
         <ul>
            <li>At 1st level, you know 2 cantrips of your choice from the Druid spell list. At higher levels, you learn additional Druid cantrips of your choice</li>
            <li>The table shows how many spell slots you have to cast your Druid spells of 1st level and higher</li>
            <li>To cast one of your Druid spells of 1st level or higher, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest</li>
            {/* spells PREPARED */}
            <li>You prepare the list of spells that are available for you to cast, choosing from the Druid spell list - the spells must be of a level for which you have spell slots</li>
            <li>You can change your list of prepared spells when you finish a long rest</li>
            <ul>
               <li>Preparing a new list of druid spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list</li>
            </ul>   
            <li>Wisdom is your spellcasting ability for your druid spells, since your magic draws upon your devotion and attunement to nature.</li>
            <ul>
               <li>In addition, you use your Wisdom modifier when setting the saving throw DC for a Druid spell you cast and when making an attack roll with one</li>
            </ul>
            <li>You can cast any Druid spell you know as a ritual if that spell has the ritual tag and you have the spell prepared</li>
            <li>You can use a druidic focus as a spellcasting focus for your druid spells</li>
         </ul>
		</div>
	)	
}
export const spellcastingPaladin = () => {
	return (
		<div className="spellcasting">
		<p className="intro">By 2nd level, you have learned to draw on divine magic through meditation and prayer to cast spells as a cleric does.</p>
         <ul>
            <li>The table shows how many spell slots you have to cast your Paladin spells of 1st level and higher</li>
            <li>To cast one of your Paladin spells of 1st level or higher, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest</li>
            {/* spells PREPARED */}
            <li>You prepare the list of spells that are available for you to cast, choosing from the Paladin spell list - the spells must be of a level for which you have spell slots</li>
            <li>You can change your list of prepared spells when you finish a long rest</li>
            <ul>
               <li>Preparing a new list of paladin spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list.</li>
            </ul>   
            <li>Charisma is your spellcasting ability for your paladin spells, since their power derives from the strength of your convictions</li>
            <ul>
               <li>In addition, you use your Charisma modifier when setting the saving throw DC for a Paladin spell you cast and when making an attack roll with one</li>
            </ul>
            <li>You can use a holy symbol as a spellcasting focus for your paladin spells.</li>
         </ul>
		</div>
	)	
}
export const spellcastingRanger = () => {
	return (
		<div className="spellcasting">
		<p className="intro">By the time you reach 2nd level, you have learned to use the magical essence of nature to cast spells, much as a druid does.</p>
		<ul>
         <li>The table shows how many spell slots you have to cast your Ranger spells of 1st level and higher</li>
			<li>To cast one of your Ranger spells of 1st level or higher, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest</li>
         <li>You select spells of your choice from the Ranger spell list as you gain levels</li>
			<li>The Spells Known column of the Ranger table shows when you learn more Ranger spells of your choice. Each of these spells must be of a level for which you have spell slots</li>
         <ul>
            <li>When you gain a level in this class, you can choose one of the Ranger spells you know and replace it with another spell from the Ranger spell list</li>
         </ul>
            {/* casting ability */}
			<li>Wisdom is your spellcasting ability for your ranger spells, since your magic draws on your attunement to nature. You use your Wisdom whenever a spell refers to your spellcasting ability</li>
         <ul>
            <li>In addition, you use your Wisdom modifier when setting the saving throw DC for a Ranger spell you cast and when making an attack roll with one</li>
         </ul>
         <li>You can use a druidic focus as a spellcasting focus for your ranger spells</li>
		</ul>
		</div>
	)	
}
export const spellcastingRogue = () => {
	return (
		<div className="spellcasting">
		<p className="intro">When you take the Arcane Trickster Roguish Archetype you augment your martial prowess with the ability to cast spells.</p>
		<ul>
			<li>At 3rd level, you three cantrips: Mage Hand and two other cantrips of your choice from the wizard spell list. You learn another wizard cantrip of your choice at 10th level</li>
         <li>The The Arcane Trickster Spellcasting table shows how many spell slots you have to cast your Wizard spells of 1st level and higher, each of these spells must be an enchantment or illusion spell of your choice</li>
         <ul>
            <li>The spells you learn at 8th, 14th, and 20th level can come from any school of magic</li>
         </ul>
			<li>To cast one of your spells of 1st level or higher, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest</li>
			<li>The Spells Known column of the Arcane Trickster table shows when you learn more Wizard spells of your choice. Each of these spells must be of a level for which you have spell slots</li>
         <ul>
            <li>When you gain a level in this class, you can choose one of the Wizard spells you know and replace it with another spell from the Wizard spell list</li>
         </ul>
			<li>Intelligence is your spellcasting ability for your wizard spells, since you learn your spells through dedicated study and memorization. You use your Intelligence whenever a spell refers to your spellcasting ability.</li>
         <ul>
            <li>In addition, you use your Intelligence modifier when setting the saving throw DC for a spell you cast and when making an attack roll with one</li>
         </ul>
		</ul>
		</div>
	)	
}
export const spellcastingSorcerer = () => {
	return (
		<div className="spellcasting">
		<p className="intro">An event in your past, or in the life of a parent or ancestor, left an indelible mark on you, infusing you with arcane magic. This font of magic, whatever its origin, fuels your spells.</p>
		<ul>
			<li>At 1st level, you know 4 cantrips of your choice from the Sorcerer spell list. At higher levels, you learn additional Sorcerer cantrips of your choice</li>
         <li>The table shows how many spell slots you have to cast your Sorcerer spells of 1st level and higher</li>
			<li>To cast one of your Sorcerer spells of 1st level or higher, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest</li>
         <li>You select spells of your choice from the Sorcerer spell list as you gain levels</li>
         {/* spells KNOWN */}
			<li>The Spells Known column of the Sorcerer table shows when you learn more Sorcerer spells of your choice. Each of these spells must be of a level for which you have spell slots</li>
         <ul>
            <li>When you gain a level in this class, you can choose one of the Sorcerer spells you know and replace it with another spell from the Sorcerer spell list</li>
         </ul>
			<li>Charisma is your spellcasting ability for your sorcerer spells, since the power of your magic relies on your ability to project your will into the world. You use your Charisma whenever a spell refers to your spellcasting ability</li>
         <ul>
            <li>In addition, you use your Charisma modifier when setting the saving throw DC for a Sorcerer spell you cast and when making an attack roll with one</li>
         </ul>
         <li>You can use an arcane focus as a spellcasting focus for your sorcerer spells</li>
		</ul>
		</div>
	)	
}
export const spellcastingWarlock = () => {
	return (
		<div className="spellcasting">
		<p className="intro">Your arcane research and the magic bestowed on you by your patron have given you facility with spells.</p>
		<ul>
			<li>At 1st level, you know 2 cantrips of your choice from the Warlock spell list. At higher levels, you learn additional Warlock cantrips of your choice</li>
         <li>The table shows how many spell slots you have to cast your Warlock spells of 1st level and higher <b>all of your spell slots are the same level</b></li>
			<li>To cast one of your Warlock spells of 1st level or higher, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a <b>short or long</b> rest</li>
         <li>You select spells of your choice from the Warlock spell list as you gain levels</li>
         {/* spells KNOWN */}
			<li>The Spells Known column of the Warlock table shows when you learn more Warlock spells of your choice. Each of these spells must be of a level for which you have spell slots</li>
         <ul>
            <li>When you gain a level in this class, you can choose one of the Warlock spells you know and replace it with another spell from the Warlock spell list</li>
         </ul>
			<li>Charisma is your spellcasting ability for your warlock spells, so you use your Charisma whenever a spell refers to your spellcasting ability</li>
         <ul>
            <li>In addition, you use your Charisma modifier when setting the saving throw DC for a Warlock spell you cast and when making an attack roll with one</li>
         </ul>
         <li> You can use an arcane focus as a spellcasting focus for your warlock spells</li>
		</ul>
		</div>
	)	
}
export const spellcastingWizard = () => {
	return (
		<div className="spellcasting">
		<p className="intro">As a student of arcane magic, you have a spellbook containing spells that show the first glimmerings of your true power.</p>
		<ul>
         <li>Your spellbook is the repository of the wizard spells you know, except your cantrips, which are fixed in your mind</li>
         <li>the spells that you add to your spellbook as you gain levels reflect the arcane research you conduct on your own</li>
         <ul>
            <li>When you find a wizard spell of 1st level or higher, you can add it to your spellbook if it is of a spell level you can prepare and if you can spare the time to decipher and copy it</li>
            <li>For each level of the spell, the process takes 2 hours and costs 50 gp - Once you have spent this time and money, you can prepare the spell just like your other spells</li>
         </ul>
         <li>You can copy a spell from your own spellbook into another book, if you want to make a backup copy - You need spend only 1 hour and 10 gp for each level of the copied spell</li>
         <li>If you lose your spellbook, you can use the same procedure to transcribe the spells that you have prepared into a new spellbook.</li>
         <ul>
            <li>Filling out the remainder of your spellbook requires you to find new spells to do so</li>
         </ul>
         <li>Your spellbook is a unique compilation of spells, with its own decorative flourishes and margin notes</li>
			<li>At 1st level, you know 3 cantrips of your choice from the Wizard spell list. At higher levels, you learn additional Wizard cantrips of your choice</li>
         <li>The table shows how many spell slots you have to cast your Wizard spells of 1st level and higher</li>
			<li>To cast one of your Wizard spells of 1st level or higher, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest</li>

         <li>You prepare the list of spells that are available for you to cast, choosing from the Wizard spell list - the spells must be of a level for which you have spell slots</li>
			<li>You can change your list of prepared spells when you finish a long rest</li>
            <ul>
               <li>Preparing a new list of wizard spells requires time spent studying your spellbook and memorizing the incantations and gestures you must make to cast the spell: at least 1 minute per spell level for each spell on your list</li>
            </ul>   
			<li>Intelligence is your spellcasting ability for your wizard spells, since you learn your spells through dedicated study and memorization. You use your Intelligence whenever a spell refers to your spellcasting ability.</li>
				<ul>
               <li>In addition, you use your Intelligence modifier when setting the saving throw DC for a Wizard spell you cast and when making an attack roll with one</li>
               </ul>
		<li>You can cast any Wizard spell you know as a ritual if that spell has the ritual tag and you have the spell in your spellbook - <b>You don't need to have the spell prepared</b></li>
      <li>You can use an arcane focus as a spellcasting focus for your wizard spells</li>
		</ul>
		</div>
	)	
}
const fightingStyleObj = {
   fighter: ['archery', 'blind fighting', 'close quarters shooter', 'defense', 'dueling', 'great weapon fighting', 'interception', 'mariner', 'protection', 'superior technique', 'thrown weapon fighting', 'tunnel fighter', 'two-weapon fighting', 'unarmed fighting'],
   paladin: ['blessed warrior', 'blind fighting', 'close quarters shooter', 'defense', 'dueling', 'great weapon fighting', 'interception', 'mariner', 'protection', 'tunnel fighter'],
   ranger: ['archery', 'blind fighting', 'close quarters shooter', 'defense', 'druidic warrior', 'dueling', 'mariner', 'thrown weapon fighting', 'tunnel fighter', 'two-weapon fighting'],
}



// art: {none}
// barb: {select: [2['skills', 1, [arr]]]}