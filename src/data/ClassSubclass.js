import { spellcastingArtificer, spellcastingBard, spellcastingCleric, spellcastingDruid, spellcastingPaladin, spellcastingRanger, spellcastingRogue, spellcastingSorcerer, spellcastingWarlock, spellcastingWizard } from "../components/utilities/classFunctions";
import { Proficiencies } from "./CharacterDetails";


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
			equipment: {
				armor: [],
				tools: ['thieves\' tools', 'dungeoneer\'s pack'],
				weapons: ['light crossbow + 20 bolts'],
				other: [],
			},
			spellcaster: true,
			class_scf_count: [3,5,9,15],
         hitDice: 'd8',
			multiclass: [3, 13],
         saves: ['constitution', 'intelligence'],
			spell_save: 3,
			select: true,
			// select: [
			// 	['skills', 2, ['arcana', 'history', 'investigation', 'medicine', 'nature', 'perception', 'sleight of hand']], 
			
			// 	['proficiencies-ref', 1, 'artisan\'s tools', 'tools'], 
			// 	['equipment-ref', 1, 'simple.all', 'weapons'], 
			// 	['equipment-list', 1, ['studded leather', 'scale mail'], 'armor']
			// ],
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
			equipment: {
				armor: [],
				tools: ['explorer\'s pack'],
				weapons: ['javelin x4'],
				other: [],
			},
			spellcaster: false,
			class_scf_count: [3,6,10,14],
         hitDice: 'd12',
			multiclass: [0, 13],
         saves: ['strength', 'constitution'],
			spell_save: null,
			select: true,
			// [
			// 	['skills', 2, ['animal handling', 'athletics', 'intimidation', 'nature', 'perception', 'survival']],
			// 	[{
			// 		init: ['TWO Handaxes', 'ANY Simple Weapon'],
			// 		result: ['return', 'select'],
			// 		return: [['equipment',['handaxe x2'], 'weapons'], ['equipment-ref', 1, 'simple.all', 'weapons']]
			// 	}],[{
			// 		init: ['Greataxe', 'ANY Martial Melee Weapon'],
			// 		result: ['return', 'select'],
			// 		return: [['equipment',['greataxe'], 'weapons'], ['equipment-ref', 1, 'martial.melee', 'weapons']],
			// 	}]
			// ]
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
			equipment: {
				armor: ['leather'],
				tools: [],
				weapons: ['dagger'],
				other: [],
			},
			spellcaster: true,
			class_scf_count: [3,6,14],
         hitDice: 'd8',
			multiclass: [5, 13],
         saves: ['dexterity', 'charisma'],
			spell_save: 5,
			select: true,
		// 	select: [
		// 		['skills', 3, 'ALL'], 
		// 		['proficiencies-ref', 3, 'musical instrument', 'tools'], 
		// 		['equipment-list', 1, ['diplomat\'s pack', 'entertainer\'s pack'], 'tools.gear'],

		// 		// ['OR' ,'equipment', 1, ['rapier', 'longsword', 'simple'], 'weapons'], 
		// 		// ['OR' ,'equipment', 1, ['lute', 'musical instrument'], 'tools'], 
		// 		[{
		// 		init: ['Rapier', 'Longsword', 'ANY Simple Weapon'],
		// 		result: ['return','return','select'],
		// 		return: [['equipment',['rapier'], 'weapons'], ['equipment',['longsword'], 'weapons'], ['equipment-ref','simple.all', 'weapons']],
		// 		}],[{
		// 		init: ['Lute', 'ANY Other Musical Instrument'],
		// 		result: ['return', 'select'],
		// 		return: [
		// 			['equipment',['lute'], 'tools[\'musical instrument\']'], ['equipment-ref', 1, 'musical instrument', 'tools']]
		// 	}],
		// ], 		
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
			spellcaster: true,
			proficiencies: {
				armor: ['light', 'medium', 'shields'],
				tools: [],
				weapons: ['simple'],
			},
			equipment: {
				armor: ['sheild'],
				tools: [],
				weapons: [],
				other: ['holy symbol'],
			},
			class_scf_count: [1,6,8,17],
         hitDice: 'd8',
			multiclass: [4, 13],
         saves: ['wisdom', 'charisma'],
			spell_save: 4,
			select: true,
			// select: [
			// 	['skills', 2, ['history', 'insight', 'medicine', 'persuasion', 'religion']], 
			// 	['IF', 'equipment-list', 1, ['mace', 'warhammer'], 'weapons'], 
			// 	['IF', 'equipment-list', 1, ['scale mail', 'leather', 'chain mail'], 'armor'], 
			// 	['equipment-list', 1, ['priest\'s pack', 'explorer\'s pack'], 'tools.gear'],
			// 	[{
			// 		init: ['Light Crossbow and 20 Bolts', 'ANY Simple Weapon'],
			// 		result: ['return', 'select'],
			// 		return: [
			// 			['equipment',['light crossbow + 20 bolts'], 'weapons'], ['equipment-ref', 1, 'simple.all', 'weapons']]
			// 	}],
			// 	],
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
			spellcaster: true,
			proficiencies: {
				armor: ['light', 'medium', 'shields'],
				tools: ['herbalism kit'],
				weapons: [['club', 'dagger', 'dart', 'javelin', 'mace', 'quarterstaff', 'scimitar', 'sickle', 'sling', 'spear']],
			},
			equipment: {
				armor: ['leather'],
				tools: ['explorer\'s pack'],
				weapons: [],
				other: ['druidic focus'],
			},
			class_scf_count: [2,6,10,14],
         hitDice: 'd8',
			multiclass: [4, 13],
         saves: ['intelligence', 'wisdom'],
			spell_save: 4,
			extras: ['will not wear armour/shiels made of metal']	,
			select: false,
			// select: [
			// 	['skills', 2, ['arcana', 'animal handling', 'insight', 'medicine', 'nature', 'perception', 'religion', 'survival']], 
			// 	// ['OR' ,'equipment', 1, ['shield', 'simple'],['armor','weapons']], 
			// 	// ['OR' ,'equipment', 1, ['scimitar', 'simple.melee'], 'weapons'],
			// 	[{
			// 		init: ['Wooden Shield', 'ANY Simple Weapon'],
			// 		result: ['return', 'select'],
			// 		return: [
			// 			['equipment',['shield'], 'armor'], ['equipment-ref', 1, 'simple.all', 'weapons']]
			// 	}],[{
			// 		init: ['Scimitar', 'ANY Simple Melee Weapon'],
			// 		result: ['return', 'select'],
			// 		return: [
			// 			['equipment',['scimitar'], 'weapons'], ['equipment-ref', 1, 'simple.melee', 'weapons']]
			// 	}],
			// ],	
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
			equipment: {
				armor: [],
				tools: [],
				weapons: [],
				other: [],
			},
			spellcaster: false,
			class_scf_count: [3,7,10,15,18],
         hitDice: 'd10',
			multiclass: [0, 13, 'OR', 1, 13],
         saves: ['strength', 'constitution'],
			spell_save: null,
			select: true,
			// [
				// ['skills', 2, ['acrobatics', 'animal handling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival']], 
				// ['equipment-list', 1, ['chain mail', 'leather armour AND longbow + 20 arrows'], ['armor', ['armor', 'weapons']]],
				// ['equipment-list', 1, ['light crossbox + 20 bolts', 'handaxe x2'], 'weapons'],
				// ['equipment-list', 1, ['dungeoneer\'s pack', 'explorer\'s pack'], 'tools.gear'],
				// [{
				// 	init: ['ANY Martial Weapon AND a Shield', 'TWO Martial Weapons (any)'],
				// 	result: [['select', 'return'], 'select'],
				// 	return: [
				// 		[['equipment-ref', 1, 'martial.all', 'weapons'], ['equipment',['shield'], 'armor']], 
				// 		['equipment-ref', 2, 'martial.all', 'weapons']]
				// }]
			// ],
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
			equipment: {
				armor: [],
				tools: [],
				weapons: ['darts x10'],
				other: [],
			},
			spellcaster: false,
			class_scf_count: [3,6,11,17],
         hitDice: 'd8',
			multiclass: [1, 13, 'AND', 4, 13],
         saves: ['strength', 'dexterity'],
			spell_save: null,
			select: false,
			// select: [
			// 	['skills', 2, ['acrobatics', 'athletics', 'history', 'insight', 'religion', 'stealth']],
			// 	['equipment', 1, ['dungeoneer\'s pack', 'explorer\'s pack'], 'tools.gear'],
			// 	[{
			// 		init: ['ANY Artisan\'s Tools', 'ANY Musical Instrument'],
			// 		result: ['select', 'select'],
			// 		return: [
			// 			['proficiencies-ref', 1, 'artisan\'s tools', 'tools'], 
			// 			['proficiencies-ref', 1, 'musical instruments', 'tools'], ]
			// 	}], [{
			// 		init: ['Shortsword', 'ANY Simple Weapons'],
			// 		result: ['return', 'select'],
			// 		return: [
			// 			['equipment',['shortsword'], 'weapons'], 
			// 			['equipment-ref', 1, 'simple.all', 'weapons']]
			// 	}],
			// ],
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
			equipment: {
				armor: ['chain mail'],
				tools: [],
				weapons: [],
				other: ['holy symbol'],
			},
			spellcaster: true,
			class_scf_count: [3,7,15,20],
         hitDice: 'd10',
			multiclass: [0, 13, 'AND', 5, 13],
         saves: ['wisdom', 'charisma'],	
			spell_save: 5,
			select: false,
			// select: [
			// 	['skills', 2, ['athletics', 'insight', 'intimidation', 'medicine', 'persuasion', 'religion']],
			// 	['equipment-list', 1, ['dungeoneer\'s pack', 'explorer\'s pack'], 'tools.gear'],
			// 	[{
			// 		init: ['ANY Martial Weapon AND a Shield', 'TWO Martial Weapons (any)'],
			// 		result: [['select', 'return'], 'select'],
			// 		return: [
			// 			[['equipment-ref', 1, 'martial.all', 'weapons'], ['equipment',['shield'], 'armor']], 
			// 			['equipment-ref', 2, 'martial.all', 'weapons']]
			// 	}], [{
			// 		init: ['FIVE Javelins', 'ANY Simple Melee Weapon'],
			// 		result: ['select', 'select'],
			// 		return: [
			// 			['equipment', 1, 'javelin x5', 'weapons'], 
			// 			['equipment-ref', 1, 'simple.melee', 'weapons']]
			// 	}]
			// ],
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
			equipment: {
				armor: [],
				tools: [],
				weapons: ['longbow w quiver + 20 arrows'],
				other: [],
			},
			spellcaster: true,
			class_scf_count: [3,7,11,15],
         hitDice: 'd10',
			multiclass: [1, 13, 'AND', 4, 13],
         saves: ['strength', 'dexterity'],
			spell_save: 4,
			select: false,
			// select: [
			// 	['skills', 3, ['animal handling', 'athletics', 'insight', 'investigation', 'nature', 'perception', 'stealth', 'survival']],
			// 	['equipment-list', 1, ['scale mail', 'leather'], 'armor'],
			// 	['equipment-list', 1, ['dungeoneer\'s pack', 'explorer\'s pack'], 'tools.gear'],
			// 	[{
			// 		init: ['TWO Shortswords', 'TWO Simple Melee Weapon (any)'],
			// 		result: ['return', 'select'],
			// 		return: [
			// 			['equipment', ['shortsword x2'], 'weapons'], 
			// 			['equipment-ref', 2, 'simple.melee', 'weapons']]
			// 	}]
			// ],
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
			equipment: {
				armor: ['leather'],
				tools: ['thieves\s tools'],
				weapons: ['dagger x2'],
				other: [],
			},
			spellcaster: false,
			class_scf_count: [3,9,13,17],
         hitDice: 'd8',
			multiclass: [1, 13],
         saves: ['dexterity', 'intelligence'],
			spell_save: 3,
			select: false,
			// select: [
			// 	['skills', 4, ['acrobatics', 'athletics', 'deception', 'insight', 'intimidation', 'investigation', 'perception', 'performance', 'persuasion', 'sleight of hand', 'stealth']],
			// 	['equipment-list', 1, ['rapier', 'shortsword'], 'weapon'],
			// 	['equipment-list', 1, ['burglar\'s pack', 'dungeoneer\'s pack', 'explorer\'s pack'], 'tools.gear'],
			// ],
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
			equipment: {
				armor: [],
				tools: [],
				weapons: ['dagger x2'],
				other: [],
			},
			spellcaster: true,
			class_scf_count: [1,6,14,18],
         hitDice: 'd6',
			multiclass: [5, 13],
         saves: ['constitution', 'charisma'],
			spell_save: 5,
			select: false,
			// select: [
			// 	['skills', 2, ['arcana', 'deception', 'insight', 'intimidation', 'persuasion', 'religion']],
			// 	['equipment-list', 1, ['dungeoneer\'s pack', 'explorer\'s pack'], 'tools.gear'],
			// 	['equipment-list', 1, ['component pouch', 'arcane focus'], 'other'],
			// 	[{
			// 		init: ['Light Crossbow and 20 Bolts', 'ANY Simple Weapon'],
			// 		result: ['return', 'select'],
			// 		return: [
			// 			['equipment',['light crossbow + 20 bolts'], 'weapons'], ['equipment-ref', 1, 'simple.all', 'weapons']]
			// 	}],
			// ],
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
			equipment: {
				armor: ['leather'],
				tools: [],
				weapons: ['dagger x2'],
				other: [],
			},
			spellcaster: true,
			class_scf_count: [1,6,10,14],
         hitDice: 'd8',
			multiclass: [5, 13],
         saves: ['wisdom', 'charisma'],
			spell_save: 5,
			select: false,
			// select: [
			// 	['skills', 2, ['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature', 'religion']],
			// 	['equipment-list', 1, ['component pouch', 'arcane focus'], 'other'],
			// 	['equipment-list', 1, [ 'scholar\'s pack', 'dungeoneer\'s pack'], 'tools.gear'],
			// 	['equipment-ref', 1, 'simple.all', 'weapons']
			// 	[{
			// 		init: ['Light Crossbow and 20 Bolts', 'ANY Simple Weapon'],
			// 		result: ['return', 'select'],
			// 		return: [
			// 			['equipment',['light crossbow + 20 bolts'], 'weapons'], ['equipment-ref', 1, 'simple.all', 'weapons']]
			// 	}],
			// ],
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
			equipment: {
				armor: [],
				tools: [],
				weapons: [],
				other: ['spellbook'],
			},
			spellcaster: true,
			class_scf_count: [2,6,10,14],
         hitDice: 'd6',
			multiclass: [3, 13],
         saves: ['intelligence', 'wisdom'],
			spell_save: 3,
			select: true,
			// select: [
			// 	['skills', 2, ['arcana', 'history', 'insight', 'investigation', 'medicine', 'religion']],
			// 	['equipment-ref', 1, 'simple.all', 'weapons']
			// 	['equipment-list', 1, ['quarterstaff', 'dagger'], 'weapons'],
			// 	['equipment-list', 1, [ 'scholar\'s pack', 'dungeoneer\'s pack'], 'tools.gear'],
			// 	['equipment-ref', 1, 'simple.all', 'weapons']
			// ],
		},
	},
	features: {
		artificer: [
			[[],['magical tinkering', 'spellcasting'], ['infuse item'], ['artificer specialist', 'the right tool for the job'], [], [], ['tool expertise'], ['flash of genius'], [], [], ['magic item adept'], ['spell-storing item'], [], [], ['magic item savant'], [], [], [], ['magic item master'], [], ['soul of artifice']],
		],
		barbarian: [
			[[],['rage', 'unarmored defense (barbarian)'], ['reckless attack', 'danger sense'], ['primal path', 'primal knowledge'], [], ['extra attack', 'fast movement'], [], ['feral instinct', 'instinctive pounce'], [], ['brutal critical'], [], ['relentless rage'], [], [], [], ['persistent rage'], [], [], ['indomitable might'], [], ['primal champion']],
		],
		bard: [
			[[],['spellcasting', 'bardic inspiration'], ['jack of all trades', 'song of rest', 'magical inspiration'], ['bard college', 'expertise'], ['bardic versatility'], ['font of inspiration'], ['countercharm'], [], [], [], ['magical secrets'], [], [], [], [], [], [], [], [], [], ['superior inspiration']],
		],
		cleric: [
			[[],['spellcasting', 'divine domain'], ['channel divinity', 'harness divine power'], [], ['cantrip versatility'], ['destroy undead'], [], [], [], [], ['divine intervention'], [], [], [], [], [], [], [], [], [], []],
		],
		druid: [
			[[],['spellcasting', 'druidic'], ['druid circle', 'wild shape', 'wild companion'], [], ['cantrip versatility'], [], [], [], [], [], [], [], [], [], [], [], [], [], ['beast spells', 'timeless body'], [], ['archdruid']],
		],
		fighter: [
			[[],['fighting style', 'second wind'], ['action surge'], ['martial archetype'], ['martial versatility'], ['extra attack - fighter'], [], [], [], ['indomitable'], [], [], [], [], [], [], [], [], [], [], []],
			// []
		],
		monk: [
			[[],['unarmored defense (monk)', 'martial arts'], ['ki', 'dedicated weapon', 'unarmored movement'], ['monastic tradition', 'deflect missiles', 'ki-fueled attack'], ['slow fall', 'quickened healing'], ['extra attack', 'stunning strike', 'focused aim'], ['ki-empowered strikes'], ['evasion', 'stillness of mind'], [], [], ['purity of body'], [], [], ['tongue of the sun and moon'], ['diamond soul'], ['timeless body'], [], [], ['empty body'], [], ['perfect self']],
			// []
		],
		paladin: [
			[[],['divine sense', 'lay on hands'], ['fighting style', 'spellcasting', 'divine smite'], ['divine health', 'sacred oath', 'harness divine power'], ['martial versatility'], ['extra attack'], ['aura of protection'], [], [], [], ['aura of courage'], ['improved divine smite'], [], [], ['cleansing touch'], [], [], [], [], [], []],
			// []
		],
		ranger: [
			[[],['favored enemy', 'natural explorer', 'deft explore', 'favored foe'], ['fighting style', 'spellcasting', 'spellcasting focus'], ['primeval awareness', 'ranger conclave', 'primal awareness'], ['martial versatility'], ['extra attack'], [], [], ['land\'s stride'], [], ['hide in plain sight', 'nature\'s veil (optional)'], [], [], [], ['vanish'], [], [], [], ['feral senses'], [], ['foe slayer']],
			// []
		],
		rogue: [
			[[],['expertise', 'sneak attack', 'thieves\' cant'], ['cunning action'], ['roguish archetype', 'steady aim'], [], ['uncanny dodge'], [], ['evasion'], [], [], ['ability score improvement'], ['reliable talent'], [], [], ['blindsense'], ['slippery mind'], [], [], ['elusive'], [], ['stroke of luck']],
			// []
		],
		sorcerer: [
			[[],['spellcasting', 'sorcerous origin'], ['font of magic'], ['metamagic'], ['sorcerous versatility'], ['magical guidance'], [], [], [], [], [], [], [], [], [], [], [], [], [], [], ['sorcerous restoration']], 
			// ['sorcery points', calcSorceryPoints]
		],
		warlock: [
			[[],['otherworldly patron', 'pact magic'], ['eldritch invocations'], ['pact boon'], ['eldritch versatility'], [], [], [], [], [], [], ['mystic arcanum'], [], [], [], [], [], [], [], [], ['eldritch master']],
			// []
		],
		wizard: [
			[[],['spellcasting', 'arcane recovery'], ['arcane tradition'], ['cantrip formulas (optional)'], [], [], [], [], [], [], [], [], [], [], [], [], [], [], ['spell mastery'], [], ['signature spells']],
			[]
		],
	},
	spellcasting: {
		artificer: spellcastingArtificer,
		bard: spellcastingBard,
		cleric: spellcastingCleric,
		druid: spellcastingDruid,
		paladin: spellcastingPaladin,
		ranger: spellcastingRanger,
		rogue: spellcastingRogue,
		sorcerer: spellcastingSorcerer,
		warlock: spellcastingWarlock,
		wizard: spellcastingWizard,
	},
	select: {
		artificerSelect: [
			{
				type: 'list',
				cat: ['class', 'skills'],
				count: 2,
				ref: 'arr',
				list: ['arcana', 'history', 'investigation', 'medicine', 'nature', 'perception', 'sleight of hand'],
				result: [],
				name: ['proficiency', 'skills'],
			},
			{
				type: 'list',
				cat: ['class', 'proficiencies', 'tools'],
				count: 1,
				ref: 'obj',
				list: ['tools', 'artisan\'s tools'],
				result: [],
				name: ['proficiency', 'artisan\'s tools'],
			},
			{
				type: 'list',
				cat: [ 'class', 'equipment','weapons'],
				count: 1,
				ref: 'obj',
				list: [['weapons', 'simple', 'melee'],['weapons', 'simple', 'ranged']],
				result: [],
				name: ['equipment','weapon'],
			},
			{
				type: 'list',
				cat: ['class', 'equipment', 'armor'],
				count: 1,
				ref: 'arr',
				list: ['studded leather', 'scale mail'],
				result: [],
				name: ['equipment', 'armor'],
			},
		],
		barbarianSelect: [
			{
				type: 'list',
				cat: ['class', 'skills'],
				count: 2,
				ref: 'arr',
				list: ['animal handling', 'athletics', 'intimidation', 'nature', 'perception', 'survival'],
				result: [],
				name: ['proficiency', 'skills']
			},
			{
				type: 'multi',
				init: ['TWO Handaxes', 'ANY Simple Weapon'],
				name: ['equipment', 'weapon'],
				options: {
					opt1: {
						type: 'single',
						cat: ['class', 'equipment', 'weapons'],
						count: 0,
						ref: 'string',
						result: ['handaxe x2'],
					},
					opt2: {
						type: 'list',
						cat: ['class', 'equipment', 'weapons'],
						count: 1,
						ref: 'obj',
						list: [['weapons', 'simple', 'melee'],['weapons', 'simple', 'ranged']],
						result: [],
					}
				}
			},
			{
				type: 'multi',
				init: ['Greataxe', 'ANY Martial Melee Weapon'],
				name: ['equipment', 'weapon'],
				options: {
					opt1: {
						type: 'single',
						cat: ['class', 'equipment', 'weapons'],
						count: 0,
						ref: 'string',
						result: ['greataxe'],
					},
					opt2: {
						type: 'list',
						cat: ['class', 'equipment', 'weapons'],
						count: 1,
						ref: 'obj',
						list: ['weapons', 'martial', 'melee'],
						result: []
					}
				}
			},
		],
		bardSelect: [
			{
				type: 'list',
				cat: ['class', 'skills'],
				count: 4,
				ref: 'obj',
				list: ['skills'],
				result: [],
				name: ['proficiency', 'skills'],
			},
			{
				type: 'list',
				cat: ['class', 'proficiencies', 'tools'],
				count: 3,
				ref: 'obj',
				list: ['tools', 'musical instrument'],
				result: [],
				name: ['proficiency', 'musical instrument'],
			},
			{
				type: 'list',
				cat: ['class', 'equipment', 'tools'],
				count: 1,
				ref: 'arr',
				list: ['diplomat\'s pack', 'entertainer\'s pack'],
				result: [],
				name: ['equipment', 'gear'],
			},
			{
				type: 'multi',
				init: ['Rapier', 'Longsword', 'ANY Simple Weapon'],
				name: ['equipment', 'weapon'],
				options: {
					opt1: {
						type: 'single',
						cat: ['class', 'equipment', 'weapons'],
						count: 0,
						ref: 'string',
						list: [],
						result: ['rapier']
					},
					opt2: {
						type: 'single',
						cat: ['class', 'equipment', 'weapons'],
						count: 0,
						ref: 'string',
						list: [],
						result: ['longsword'],
					},
					opt3: {
						type: 'obj',
						cat: ['class', 'equipment', 'weapons'],
						count: 1,
						ref: 'obj',
						list: [['weapons', 'simple', 'melee'],['weapons', 'simple', 'ranged']],
						result: [],
					}
				}
			},
			{
				type: 'multi',
				init: ['Lute', 'ANY Musical Instrument'],
				name: ['proficiency', 'musical instrument'],
				options: {
					opt1: {
						type: 'single',
						cat: ['class', 'equipment', 'tools'],
						count: 0,
						ref: 'string',
						list: [],
						result: ['lute']
					},
					opt2: {
						type: 'obj',
						cat: ['class', 'equipment', 'tools'],
						count: 1,
						ref: 'obj',
						list: ['tools', 'musical instrument'],
						result: [],
					}
				}
			},
		],
		clericSelect: [
			{
				type: 'list',
				cat: ['class', 'skills'],
				count: 2,
				ref: 'arr',
				list: ['history', 'insight', 'medicine', 'persuasion', 'religion'],
				name: ['skills'],
				result: [],
			},
			{
				type: 'list',
				cat: ['class', 'equipment', 'weapons'],
				count: 1,
				ref: 'arr',
				list: ['mace', 'warhammer'],
				result: [],
				name: ['equipment', 'weapon'],
			},
			{
				type: 'list',
				cat: ['class', 'equipment', 'armor'],
				count: 1,
				ref: 'arr',
				list: ['scale mail', 'leather', 'chain mail'],
				result: [],
				name: ['equipment', 'armor'],
			},
			{
				type: 'list',
				cat: ['class', 'equipment', 'tools'],
				count: 1,
				ref: 'arr',
				list: ['priest\'s pack', 'explorer\'s pack'],
				result: [],
				name: ['equipment', 'gear'],
			},
			{
				type: 'multi',
				init: ['Light Crossbow and 20 Bolts', 'ANY Simple Weapon'],
				name: ['equipment', 'weapon'],
				options: {
					opt1: {
						type: 'single',
						cat: ['class', 'equipment', 'weapons'],
						count: 0,
						ref: 'string',
						list: [],
						result: ['light crossbow + 20 bolts']
					},
					opt2: {
						type: 'obj',
						cat: ['class', 'equipment', 'weapons'],
						count: 1,
						ref: 'obj',
						list: [['weapons', 'simple', 'melee'],['weapons', 'simple', 'ranged']],
						result: [],
					}
				}
			},
		],
		fighterSelect: [
			{
				type: 'list',
				cat: ['class', 'skills'],
				count: 2,
				ref: 'arr',
				list: ['acrobatics', 'animal handling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival'],
				result: [],
				name: ['proficiency', 'skills'],
			},
			{
				type: 'list',
				cat: [['class', 'equipment', 'armor'], [['class', 'equipment', 'armor'], ['class', 'equipment', 'weapons'],]],
				count: 1,
				ref: 'arr',
				list: ['chain mail', ['leather armour', 'longbow + 20 arrows']],
				result: [],
				name: ['equipment', 'gear'],
			},
			{
				type: 'list',
				cat: ['class', 'equipment', 'tools'],
				count: 1,
				ref: 'arr',
				list: ['dungeoneer\'s pack', 'explorer\'s pack'],
				result: [],
				name: ['equipment', 'gear'],
			},
			{
				type: 'multi',
				init: ['ANY Martial Weapon AND a Shield', 'TWO Martial Weapons (any)'],
				name: ['equipment', 'gear'],
				options: {
					opt1: {
						type: ['list', 'single'],
						cat: [['class', 'equipment', 'armor'], ['class', 'equipment', 'weapons']],
						count: 1,
						ref: ['obj','string'],
						list: [[['weapons', 'martial', 'melee'],['weapons', 'martial', 'ranged']],],
						result: ['shield']
					},
					opt2: {
						type: 'list',
						cat: ['class', 'equipment', 'weapons'],
						count: 2,
						ref: 'obj',
						list: [['weapons', 'martial', 'melee'],['weapons', 'martial', 'ranged']],
						result: [],
					}
				}
			}
		],
		wizardSelect: [
			{
				type: 'list',
				cat: ['class', 'skills'],
				count: 2,
				ref: 'arr',
				list: ['arcana', 'history', 'insight', 'investigation', 'medicine', 'religion'],
				name: ['proficiency', 'skills'],
				result: [],
			},
			{
				type: 'list',
				cat: ['class', 'equipment', 'weapons'],
				count: 1,
				ref: 'obj',
				list: [['weapons', 'simple', 'melee'],['weapons', 'simple', 'ranged']],
				result: [],
				name: ['equipment', 'weapon'],
			},
			{
				type: 'list',
				cat: ['class', 'equipment', 'weapons'],
				count: 1,
				ref: 'arr',
				list: ['quarterstaff', 'dagger'],
				result: [],
				name: ['equipment', 'weapon'],
			},
			{
				type: 'list',
				cat: ['class', 'equipment', 'tools'],
				count: 1,
				ref: 'arr',
				list: [ 'scholar\'s pack', 'dungeoneer\'s pack'],
				result: [],
				name: ['equipment', 'gear'],
			},
		]
	}
	
	// utilities: [calcSpellsKnown, calcSpellSlots]
};

// console.log(CharacterClassSubclass.utilities[1]('Sorcerer', 10))

// features [[features by [level]], [special ability - name, count func], [spells known func, calc slots func], ]
// features - ASI = ability score improvement, SCF = subclass feature update

export default CharacterClassSubclass;