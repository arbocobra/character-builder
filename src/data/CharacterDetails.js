export const language = {
	celestial: { script: 'celestial' },
	common: { script: 'common' },
	'deep speech': { script: null },
	draconic: { script: 'draconic' },
	druidic: { script: 'druidic' },
	dwarvish: { script: 'dwarvish' },
	elvish: { script: 'elvish' },
	giant: { script: 'dwarvish' },
	gnomish: { script: 'dwarvish' },
	goblin: { script: 'dwarvish' },
	gnoll: { script: null },
	halfling: { script: 'common' },
	ignan: { script: 'dwarvish' },
	infernal: { script: 'infernal' },
	orc: { script: 'dwarvish' },
	primordial: { script: 'dwarvish' },
	sylvan: { script: 'elvish' },
	terran: { script: 'dwarvish' },
	undercommon: { script: 'elvish' },
};

export const Feats = ['Aberrant Dragonmark','Actor','Adept of the Black Robes','Adept of the Red Robes','Adept of the White Robes','Alert','Artificer Initiate','Athlete','Bountiful Luck','Charger','Chef','Crossbow Expert','Crusher','Defensive Duelist','Divinely Favored','Dragon Fear','Dragon Hide','Drow High Magic','Dual Wielder','Dungeon Delver','Durable','Dwarven Fortitude','Eldritch Adept','Elemental Adept','Elven Accuracy','Fade Away','Fey Teleportation','Fey Touched','Fighting Initiate','Firearm Specialist','Flames of Phlegethos','Gift of the Chromatic Dragon','Gift of the Gem Dragon','Gift of the Metallic Dragon','Grappler','Great Weapon Master','Gunner','Healer','Heavily Armored','Heavy Armor Master','Infernal Constitution','Initiate of High Sorcery','Inspiring Leader','Keen Mind','Knight of the Crown','Knight of the Rose','Knight of the Sword','Lightly Armored','Linguist','Lucky','Mage Slayer','Magic Initiate','Martial Adept','Medium Armor Master','Metamagic Adept','Mobile','Moderately Armored','Mounted Combatant','Observant','Orcish Fury','Piercer','Poisoner','Polearm Master','Prodigy','Resilient','Revenant Blade','Ritual Caster','Savage Attacker','Second Chance','Sentinel','Shadow Touched','Sharpshooter','Shield Master','Skill Expert','Skilled','Skulker','Slasher','Spell Sniper','Squat Nimbleness','Squire of Solamnia','Strixhaven Initiate','Strixhaven Mascot','Svirfneblin Magic','Tavern Brawler','Telekinetic','Telepathic','Tough','War Caster','Weapon Master','Wood Elf Magic']

export const Proficiencies = {
	tools: {
		'artisan\'s tools': ['alchemist\'s supplies', 'brewer\'s supplies', 'calligrapher\'s supplies', 'carpenter\'s tools', 'cartographer\'s tools', 'cobbler\'s tools', 'cook\'s utensils', 'glassblower\'s tools', 'jeweler\'s tools', 'leatherworker\'s tools', 'mason\'s tools', 'painter\'s supplies', 'potter\'s tools', 'smith\'s tools', 'tinker\'s tools', 'weaver\'s tools', 'woodcarver\'s tools'],
		
		'gaming set': ['dice set', 'dragonchess set', 'playing card set', 'three-dragon ante set'],
		
		'musical instrument': ['bagpipes', 'drum', 'dulcimer', 'flute', 'lute', 'lyre', 'horn', 'pan flute', 'shawm', 'viol'],

		'gear': ['burglar\'s pack', 'diplomat\'s pack', 'dungeoneer\'s pack', 'entertainer\'s pack', 'explorer\'s pack', 'priest\'s pack', 'scholar\'s pack'],

		miscellaneous: ['disguise kit', 'forgery kit', 'herbalism kit', 'land vehicle', 'navigator\'s tools', 'poisoner\'s kit', 'thieves\' tools', 'water vehicle'],
	},
	weapons : {
		simple: {
			melee: ['club', 'dagger', 'greatclub', 'handaxe', 'javelin', 'light hammer', 'mace', 'quarterstaff', 'sickle', 'spear'],
			ranged: ['crossbow, light', 'dart', 'shortbox', 'sling'],
		},
		martial: {
			melee: ['battleaxe', 'flail', 'glaive', 'greataxe', 'greatsword', 'halberd', 'lance', 'longsword', 'maul', 'morningstar', 'pike', 'rapier', 'scimitar', 'shortsword', 'trident', 'war pick', 'warhammer'],
			ranged: ['whip', 'blowgun', 'crossbow, hand', 'crossbow, heavy', 'longbow', 'net'],
		}
	},
	armor: {
		light: {
			'padded armor': {
				class: 1,
				features: 'Disadvantage on stealth',
			},
			'leather armor': {
				class: 1
			},
			'studded leather': {
				class: 2
			},
		},
		medium: {
			hide: {
				class: 2
			},
			'chain shirt': {
				class: 3
			},
			'scale mail': {
				class: 4,
				features: 'Disadvantage on stealth',
			},
			breastplate: {
				class: 4
			},
			'half plate': {
				class: 5,
				features: 'Disadvantage on stealth',
			},
		},
		heavy: {
			'ring mail': {
				class: 14,
				features: 'Disadvantage on stealth',
			},
			'chain mail': {
				class: 16,
				features: 'Disadvantage on stealth',
				requirement: [0, 13],
			},
			splint: {
				class: 17,
				features: 'Disadvantage on stealth',
				requirement: [0, 15],
			},
			plate: {
				class: 18,
				features: 'Disadvantage on stealth',
				requirement: [0, 15],
			},
		},
		shields: {
			shield: {
				class: 2,
			}
		}
	},
	skills: ['acrobatics','animal handling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleight of hand', 'stealth', 'survival'],
	languages: ['celestial', 'common', 'deep speech', 'draconic', 'druidic', 'dwarvish', 'elvish', 'giant', 'gnomish', 'goblin', 'gnoll', 'halfling', 'ignan', 'infernal', 'orc', 'primordial', 'sylvan', 'terran', 'undercommon']
}
export const skills = [['acrobatics', 1], ['animal handling', 4], ['arcana', 3], ['athletics', 0], ['deception', 5], ['history', 3], ['insight', 4], ['intimidation', 5], ['investigation', 3], ['medicine', 4], ['nature', 3], ['perception', 4], ['performance', 5], ['persuasion', 5], ['religion', 3], ['sleight of hand', 1], ['stealth', 1], ['survival', 4]]

export const Select = {
	skills: ['acrobatics','animal handling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleight of hand', 'stealth', 'survival'],
	languages: ['celestial', 'common', 'deep speech', 'draconic', 'druidic', 'dwarvish', 'elvish', 'giant', 'gnomish', 'goblin', 'gnoll', 'halfling', 'ignan', 'infernal', 'orc', 'primordial', 'sylvan', 'terran', 'undercommon']
}
// export const Armor = {
// 	light: {
// 		padded: {
// 			class: [11, 1],
// 			features: 'Disadvantage on stealth',
// 		},
// 		leather: {
// 			class: [11, 1],
// 		},
// 		'studded leather': {
// 			class: [12, 1],
// 		},
// 	},
// 	medium: {
// 		hide: {
// 			class: [12, 1, 2],
// 		},
// 		'chain shirt': {
// 			class: [13, 1, 2],
// 		},
// 		'scale mail': {
// 			class: [14, 1, 2],
// 			features: 'Disadvantage on stealth',
// 		},
// 		breastplate: {
// 			class: [14, 1, 2],
// 		},
// 		'half plate': {
// 			class: [15, 1, 2],
// 			features: 'Disadvantage on stealth',
// 		},
// 	},
// 	heavy: {
// 		'ring mail': {
// 			class: [14],
// 			features: 'Disadvantage on stealth',
// 		},
// 		'chain mail': {
// 			class: [16],
// 			features: 'Disadvantage on stealth',
// 			requirement: [0, 13],
// 		},
// 		splint: {
// 			class: [17],
// 			features: 'Disadvantage on stealth',
// 			requirement: [0, 15],
// 		},
// 		plate: {
// 			class: [18],
// 			features: 'Disadvantage on stealth',
// 			requirement: [0, 15],
// 		},
// 	},
// 	shields: {
// 		shield: {
// 			class: [2],
// 		}
// 	}
// }