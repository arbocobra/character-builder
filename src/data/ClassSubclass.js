

import { calcSorceryPoints, calcSpellSlots, calcSpellsKnown } from "../components/utilities/classFunctions";
const CharacterClassSubclass = {
	class: {
		artificer: {
			subName: 'Artificer Specialist',
			subLevel: 3,
			subArray: ['Alchemist', 'Armorer', 'Artillerist', 'Battle Smith'],
			proficiencies: {
				armor: ['light', 'medium', 'shields'],
				tools: ['thieves\' tools', 'tinker\'s tools'],
				weapons: ['simple'],
			},
			class_scf_count: [3,5,9,15],
         hitDice: 'd8',
			multiclass: [3, 13],
         saves: ['constitution', 'intelligence'],
			select: [['skills', 2, ['arcana', 'history', 'investigation', 'medicine', 'nature', 'perception', 'sleight of hand']], ['proficiencies', 1, 'artisan\'s tools', 'tools']],
		},
		barbarian: {
			subName: 'Primal Path',
			subLevel: 3,
			subArray: [
				'Path of the Ancestral Guardian',
				'Path of the Battlerager',
				'Path of the Beast',
				'Path of the Berserker',
				'Path of the Storm Herald',
				'Path of the Totem Warrior',
				'Path of the Zealot',
				'Path of Wild Magic',
			],
			proficiencies: {
				armor: ['light', 'medium', 'shields'],
				tools: [],
				weapons: ['simple', 'martial'],
			},
			class_scf_count: [3,6,10,14],
         hitDice: 'd12',
			multiclass: [0, 13],
         saves: ['strength', 'constitution'],
			select: [['skills', 2, ['animal handling', 'athletics', 'intimidation', 'nature', 'perception', 'survival']]],
		},
		bard: {
			subName: 'Bard College',
			subLevel: 3,
			subArray: [
				'College of Creation',
				'College of Eloquence',
				'College of Glamour',
				'College of Lore',
				'College of Spirits',
				'College of Swords',
				'College of Valor',
				'College of Whispers',
			],
			proficiencies: {
				armor: ['light'],
				tools: [],
				weapons: ['simple', ['crossbow, hand', 'longsword', 'rapier', 'shortsword']],
			},
			class_scf_count: [3,6,14],
         hitDice: 'd8',
			multiclass: [5, 13],
         saves: ['dexterity', 'charisma'],
			select: [['skills', 3, 'ALL'], ['proficiencies', 3, 'musical instrument', 'tools']],	
		},
		cleric: {
			subName: 'Divine Domain',
			subLevel: 1,
			subArray: [
				'Arcana Domain',
				'Death Domain',
				'Forge Domain',
				'Grave Domain',
				'Knowledge Domain',
				'Life Domain',
				'Light Domain',
				'Nature Domain',
				'Order Domain',
				'Peace Domain',
				'Tempest Domain',
				'Trickery Domain',
				'Twilight Domain',
				'War Domain',
			],
			proficiencies: {
				armor: ['light', 'medium', 'shields'],
				tools: [],
				weapons: ['simple'],
			},
			class_scf_count: [1,6,8,17],
         hitDice: 'd8',
			multiclass: [4, 13],
         saves: ['wisdom', 'charisma'],
			select: [['skills', 2, ['history', 'insight', 'medicine', 'persuasion', 'religion']]],
		},
		druid: {
			subName: 'Druid Circle',
			subLevel: 2,
			subArray: [
				'Circle of Dreams',
				'Circle of the Land',
				'Circle of the Moon',
				'Circle of the Shepherd',
				'Circle of Spores',
				'Circle of Stars',
				'Circle of Wildfire',
			],
			proficiencies: {
				armor: ['light', 'medium', 'shields'],
				tools: ['herbalism kit'],
				weapons: [['club', 'dagger', 'dart', 'javelin', 'mace', 'quarterstaff', 'scimitar', 'sickle', 'sling', 'spear']],
			},
			class_scf_count: [2,6,10,14],
         hitDice: 'd8',
			multiclass: [4, 13],
         saves: ['intelligence', 'wisdom'],
			extras: ['will not wear armour/shiels made of metal']	,
			select: [['skills', 2, ['arcana', 'animal handling', 'insight', 'medicine', 'nature', 'perception', 'religion', 'survival']]],
		},
		fighter: {
			subName: 'Martial Archetype',
			subLevel: 3,
			subArray: [
				'Arcane Archer',
				'Banneret',
				'Battle Master',
				'Cavalier',
				'Champion',
				'Echo Knight',
				'Eldritch Knight',
				'Psi Warrior',
				'Rune Knight',
				'Samurai',
			],
			proficiencies: {
				armor: ['light', 'medium', 'heavy', 'shields'],
				tools: [],
				weapons: ['simple', 'martial'],
			},
			class_scf_count: [3,7,10,15,18],
         hitDice: 'd10',
			multiclass: [0, 13, 'OR', 1, 13],
         saves: ['strength', 'constitution'],
			select: [['skills', 2, ['acrobatics', 'animal handling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival']]],
		},
		monk: {
			subName: 'Monastic Tradition',
			subLevel: 3,
			subArray: [
				'Way of Mercy',
				'Way of the Ascendant Dragon',
				'Way of the Astral Self',
				'Way of the Drunken Master',
				'Way of the Four Elements',
				'Way of the Kensei',
				'Way of the Long Death',
				'Way of the Open Hand',
				'Way of Shadow',
				'Way of the Sun Soul',
			],
			proficiencies: {
				armor: [],
				tools: [],
				weapons: ['simple', ['shortsword']],
			},
			class_scf_count: [3,6,11,17],
         hitDice: 'd8',
			multiclass: [1, 13, 'AND', 4, 13],
         saves: ['strength', 'dexterity'],
			select: [['skills', 2, ['acrobatics', 'athletics', 'history', 'insight', 'religion', 'stealth']],['proficiencies', 1, ['OR', 'artisan\'s tools', 'musical instrument'], 'tools']],
		},
		paladin: {
			subName: 'Sacred Oath',
			subLevel: 3,
			subArray: [
				'Oath of the Ancients',
				'Oath of Conquest',
				'Oath of the Crown',
				'Oath of Devotion',
				'Oath of Glory',
				'Oath of Redemption',
				'Oath of Vengeance',
				'Oath of the Watchers',
				'Oathbreaker',
			],
			proficiencies: {
				armor: ['light', 'medium', 'heavy', 'shields'],
				tools: [],
				weapons: ['simple', 'martial'],
			},
			class_scf_count: [3,7,15,20],
         hitDice: 'd10',
			multiclass: [0, 13, 'AND', 5, 13],
         saves: ['wisdom', 'charisma'],	
			select: [['skills', 2, ['athletics', 'insight', 'intimidation', 'medicine', 'persuasion', 'religion']]],
		},
		ranger: {
			subName: 'Ranger Conclave',
			subLevel: 3,
			subArray: [
				'Beast Master',
				'Drakewarden',
				'Fey Wanderer',
				'Gloom Stalker',
				'Horizon Walker',
				'Hunter',
				'Monster Slayer',
				'Swarmkeeper',
			],
			proficiencies: {
				armor: ['light', 'medium', 'shields'],
				tools: [],
				weapons: ['simple', 'martial'],
			},
			class_scf_count: [3,7,11,15],
         hitDice: 'd10',
			multiclass: [1, 13, 'AND', 4, 13],
         saves: ['strength', 'dexterity'],
			select: [['skills', 3, ['animal handling', 'athletics', 'insight', 'investigation', 'nature', 'perception', 'stealth', 'survival']]],
		},
		rogue: {
			subName: 'Roguish Archetype',
			subLevel: 3,
			subArray: [
				'Arcane Trickster',
				'Assassin',
				'Inquisitive',
				'Mastermind',
				'Phantom',
				'Scout',
				'Soulknife',
				'Swashbuckler',
				'Thief',
			],
			proficiencies: {
				armor: ['light'],
				tools: ['thieves\' tools'],
				weapons: ['simple', ['crossbow, hand', 'longsword', 'rapier', 'shortsword']],
			},
			class_scf_count: [3,9,13,17],
         hitDice: 'd8',
			multiclass: [1, 13],
         saves: ['dexterity', 'intelligence'],
			select: [['skills', 4, ['acrobatics', 'athletics', 'deception', 'insight', 'intimidation', 'investigation', 'perception', 'performance', 'persuasion', 'sleight of hand', 'stealth']]],
		},
		sorcerer: {
			subName: 'Sorcerous Origin',
			subLevel: 1,
			subArray: [
				'Aberrant Mind',
				'Clockwork Soul',
				'Divine Soul',
				'Draconic Bloodline',
				'Lunar Sorcery',
				'Shadow Magic',
				'Storm Sorcery',
				'Wild Magic',
			],
			proficiencies: {
				armor: [],
				tools: [],
				weapons: [['crossbow, light', 'dagger', 'dart', 'sling', 'quarterstaff']],
			},
			class_scf_count: [1,6,14,18],
         hitDice: 'd6',
			multiclass: [5, 13],
         saves: ['constitution', 'charisma'],
			
			select: [['skills', 2, ['arcana', 'deception', 'insight', 'intimidation', 'persuasion', 'religion']]],
		},
		warlock: {
			subName: 'Otherworldly Patron',
			subLevel: 1,
			subArray: [
				'The Archfey',
				'The Celestial',
				'The Fathomless',
				'The Fiend',
				'The Genie',
				'The Great Old One',
				'The Hexblade',
				'The Undead',
				'The Undying',
			],
			proficiencies: {
				armor: ['light'],
				tools: [],
				weapons: ['simple'],
			},
			class_scf_count: [1,6,10,14],
         hitDice: 'd8',
			multiclass: [5, 13],
         saves: ['wisdom', 'charisma'],
			select: [['skills', 2, ['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature', 'religion']]],
		},
		wizard: {
			subName: 'Arcane Tradition',
			subLevel: 2,
			subArray: [
				'School of Bladesinging',
				'School of Chronurgy',
				'School of Graviturgy',
				'Order of Scribes',
				'School of Abjuration',
				'School of Conjuration',
				'School of Divination',
				'School of Enchantment',
				'School of Evocation',
				'School of Illusion',
				'School of Necromancy',
				'School of Transmutation',
				'School of War Magic',
			],
			proficiencies: {
				armor: [],
				tools: [],
				weapons: [['crossbow, light', 'dagger', 'dart', 'sling', 'quarterstaff']],
			},
			class_scf_count: [2,6,10,14],
         hitDice: 'd6',
			multiclass: [3, 13],
         saves: ['intelligence', 'wisdom'],
			select: [['skills', 2, ['arcana', 'history', 'insight', 'investigation', 'medicine', 'religion']]],
		},
	},
	features: {
		artificer: [
			[[],['magical tinkering', 'spellcasting'], ['infuse item'], ['artificer specialist', 'the right tool for the job'], [], [], ['tool expertise'], ['flash of genius'], [], [], ['magic item adept'], ['spell-storing item'], [], [], ['magic item savant'], [], [], [], ['magic item master'], [], ['soul of artifice']],
			[['infusions known', [0, 0, 4, 4, 4, 4, 6, 6, 6, 6, 8, 8, 8, 8, 10, 10, 10, 10, 12, 12, 12]], 
			['infused items', [0, 0, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6]]]
		],
		barbarian: [
			[[],['rage','unarmored defense'],['danger sense','reckless attack'],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
			[['brutal critical', ['','', '', '', '', '', '', '', '', '1 dice', '1 dice', '1 dice', '1 dice', '2 dice', '2 dice', '2 dice', '2 dice', '3 dice', '3 dice', '3 dice', '3 dice']],
			['rages',[0, 2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 'unlimited']],
			['rage damage',['','+2', '+2', '+2', '+2', '+2', '+2', '+2', '+2', '+3', '+3', '+3', '+3', '+3', '+3', '+3', '+4', '+4', '+4', '+4', '+4']]]
		],
		bard: [
			[[],['spellcasting'],['jack of all trades'],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
			[]],
		cleric: [
			[[],['spellcasting','divine domain'],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
			[]],
		druid: [
			[[],['druidic','spellcasting'],['wild shape'],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
			[]],
		fighter: [
			[[],['fighting style', 'second wind'],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
			[]
		],
		monk: [
			[[],['martial arts','unarmored defense'], ['ki', 'unarmored movement'],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
			[]],
		paladin: [
			[[],['divine sense', 'lay on hands'],['fighting style', 'spellcasting', 'divine smite'],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
			[]],
		ranger: [
			[[],['favored enemy', 'natural explorer'],[	'fighting style', 'spellcasting'],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
			[]],
		rogue: [
			[[],['expertise', 'sneak attack', 'thieves\' cant'],['cunning action'],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
			[]],
		sorcerer: [
			[[],['spellcasting', 'sorcerous origins', 'scf'], ['font of magic'], ['metamagic'], ['asi'], [], ['scf'], [], ['asi'], [], ['metamagic'], [], ['asi'], [], ['scf'], [], ['asi'], ['metamagic'], ['scf'], ['asi'], ['sorcerous restoration']], 
			['sorcery points', calcSorceryPoints]
		],
		warlock: [
			[[],['otherworldly patron', 'pact magic'],['	eldritch invocations'],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
			[]],
		wizard: [
			[[],[	'spellcasting', 'arcane recovery'],['arcane tradition'],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
			[]],
	},
	utilities: [calcSpellsKnown, calcSpellSlots]
};

// console.log(CharacterClassSubclass.utilities[1]('Sorcerer', 10))

// features [[features by [level]], [special ability - name, count func], [spells known func, calc slots func], ]
// features - ASI = ability score improvement, SCF = subclass feature update

export default CharacterClassSubclass;

// Artificer
// class_scf_a_name: 'infusions known',
// class_scf_b_name: '',
// Barbarian
// class_scf_a_name: 'rage',
// class_scf_b_name: 'brutal critical',
// Bard
// class_scf_a_name: '',
// class_scf_b_name: '',
// Cleric
// class_scf_a_name: '',
// class_scf_b_name: '',
// Druid
// class_scf_a_name: '',
// class_scf_b_name: '',
// Fighter
// class_scf_a_name: '',
// class_scf_b_name: '',
// Monk
// class_scf_a_name: '',
// class_scf_b_name: '',
// Paladin
// class_scf_a_name: '',
// class_scf_b_name: '',
// Ranger
// class_scf_a_name: '',
// class_scf_b_name: '',
// Rogue
// class_scf_a_name: '',
// class_scf_b_name: '',
// Sorcerer
// class_scf_a_name: 'sorcery points',
// class_scf_b_name: 'metamagic',
// Warlock
// class_scf_a_name: '',
// class_scf_b_name: '',
// Wizard
// class_scf_a_name: '',
// class_scf_b_name: '',
