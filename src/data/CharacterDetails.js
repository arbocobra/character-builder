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

export const Proficiencies = {
	tools: {
		'artisan\'s tools': ['alchemist\'s supplies', 'brewer\'s supplies', 'calligrapher\'s supplies', 'carpenter\'s tools', 'cartographer\'s tools', 'cobbler\'s tools', 'cook\'s utensils', 'glassblower\'s tools', 'jeweler\'s tools', 'leatherworker\'s tools', 'mason\'s tools', 'painter\'s supplies', 'potter\'s tools', 'smith\'s tools', 'tinker\'s tools', 'weaver\'s tools', 'woodcarver\'s tools'],
		'gaming set': ['dice set', 'dragonchess set', 'playing card set', 'three-dragon ante set'],
		
		'musical instrument': ['bagpipes', 'drum', 'dulcimer', 'flute', 'lute', 'lyre', 'horn', 'pan flute', 'shawm', 'viol'],

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
			padded: {
				class: [11, 1],
				features: 'Disadvantage on stealth',
			},
			leather: {
				class: [11, 1],
			},
			'studded leather': {
				class: [12, 1],
			},
		},
		medium: {
			hide: {
				class: [12, 1, 2],
			},
			'chain shirt': {
				class: [13, 1, 2],
			},
			'scale mail': {
				class: [14, 1, 2],
				features: 'Disadvantage on stealth',
			},
			breastplate: {
				class: [14, 1, 2],
			},
			'half plate': {
				class: [15, 1, 2],
				features: 'Disadvantage on stealth',
			},
		},
		heavy: {
			'ring mail': {
				class: [14],
				features: 'Disadvantage on stealth',
			},
			'chain mail': {
				class: [16],
				features: 'Disadvantage on stealth',
				requirement: [0, 13],
			},
			splint: {
				class: [17],
				features: 'Disadvantage on stealth',
				requirement: [0, 15],
			},
			plate: {
				class: [18],
				features: 'Disadvantage on stealth',
				requirement: [0, 15],
			},
		},
		sheilds: {
			sheild: {
				class: [2],
			}
		}
	}
}
export const skills = [['acrobatics', 1], ['animal handling', 4], ['arcana', 3], ['athletics', 0], ['deception', 5], ['history', 3], ['insight', 4], ['intimidation', 5], ['investigation', 3], ['medicine', 4], ['nature', 3], ['perception', 4], ['performance', 5], ['persuasion', 5], ['religion', 3], ['sleight of hand', 1], ['stealth', 1], ['survival', 4]]

// export const Weapons = {
// 	simple: {
// 		melee: ['club', 'dagger', 'greatclub', 'handaxe', 'javelin', 'light hammer', 'mace', 'quarterstaff', 'sickle', 'spear'],
// 		ranged: ['crossbow, light', 'dart', 'shortbox', 'sling'],
// 	},
// 	martial: {
// 		melee: ['battleaxe', 'flail', 'glaive', 'greataxe', 'greatsword', 'halberd', 'lance', 'longsword', 'maul', 'morningstar', 'pike', 'rapier', 'scimitar', 'shortsword', 'trident', 'war pick', 'warhammer'],
// 		ranged: ['whip', 'blowgun', 'crossbow, hand', 'crossbow, heavy', 'longbow', 'net'],
// 	}
// }

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
// 	sheilds: {
// 		sheild: {
// 			class: [2],
// 		}
// 	}
// }