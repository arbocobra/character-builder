export const Background = {
	acolyte: {
		skills: ['insight', 'religion'],
		proficiencies: {
			armor: [],
			tools: [],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: [],
			weapons: [],
			other: ['holy symbol', 'prayer book or prayer wheel', 'incense', 'clothes', 'belt pouch', '15 gp'],
		},
		money: 1500,
		feature: 'shelter of the faithful',
		var: false,
		select: true,
		// select: [['language', 2, 'ALL']],
	},
	charlatan: {
		skills: ['deception', 'sleight of hand'],
		proficiencies: {
			armor: [],
			tools: ['disguise kit', 'forgery kit'],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: ['disguise kit'],
			weapons: [],
			other: ['clothes', 'con props', 'belt pouch', '15 gp'],
		},
		money: 1500,
		language: 0,
		feature: 'false identity',
		var: false,
		select: false,
	},
	criminal: {
		skills: ['deception', 'stealth'],
		proficiencies: {
			armor: [],
			tools: ["thieves' tools"],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: [],
			weapons: [],
			other: ['crowbar', 'clothes', 'hood', 'belt pouch', '15 gp'],
		},
		money: 1500,
		language: 0,
		feature: 'criminal contact',
		var: true,
		select: true,
		// select: [['proficiencies', 1, 'gaming set', 'tools']],
	},
	spy: {
		skills: ['deception', 'stealth'],
		proficiencies: {
			armor: [],
			tools: ["thieves' tools"],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: [],
			weapons: [],
			other: ['crowbar', 'clothes', 'hood', 'belt pouch', '15 gp'],
		},
		money: 1500,
		language: 0,
		feature: 'criminal contact',
		var: 'criminal',
		select: true,
		// select: [['proficiencies', 1, 'gaming set', 'tools']],
	},
	entertainer: {
		skills: ['acrobatics', 'performance'],
		proficiencies: {
			armor: [],
			tools: ['disguise kit'],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: [],
			weapons: [],
			other: ['musical instrument', 'admirer\'s favor', 'costume', 'belt pouch', '15 gp'],
		},
		money: 1500,
		language: 0,
		feature: 'popular demand',
		var: true,
		select: true,
		// select: [['proficiencies', 1, 'musical instrument', 'tools']],
	},
	gladiator: {
		skills: ['acrobatics', 'performance'],
		proficiencies: {
			armor: [],
			tools: ['disguise kit'],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: [],
			weapons: [],
			other: [
				'inexpensive but unusual weapon (ex trident or net)',
				'admirer\'s favor',
				'costume',
				'belt pouch',
				'15 gp',
			],
		},
		money: 1500,
		language: 0,
		feature: 'popular demand',
		var: 'entertainer',
	},
	'folk hero': {
		skills: ['animal handling', 'survival'],
		proficiencies: {
			armor: [],
			tools: ['land vehicle'],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: ['artisan\'s tool set'],
			weapons: [],
			other: ['shovel', 'iron pot', 'clothes', 'belt pouch'],
		},
		money: 0,
		language: 0,
		feature: 'rustic hospitality',
		var: false,
		select: [['proficiencies', 1, "artisan's tools", 'tools']],
	},
	'guild artisan': {
		skills: ['insight', 'persuasion'],
		proficiencies: {
			armor: [],
			tools: [],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: ['artisan\'s tool set'],
			weapons: [],
			other: ['letter of introduction', 'clothes', 'belt pouch', '15 gp'],
		},
		money: 1500,
		feature: 'guild membership',
		var: true,
		select: [
			['language', 1, 'ALL'],
			['proficiencies', 1, "artisan's tools", 'tools'],
		],
	},
	'guild merchant': {
		skills: ['insight', 'persuasion'],
		proficiencies: {
			armor: [],
			tools: ["navigator's tools"],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: [],
			weapons: [],
			other: ['mule and cart', 'letter of introduction', 'clothes', 'belt pouch', '15 gp'],
		},
		money: 1500,
		feature: 'guild membership',
		var: 'guild artisan',
		select: [['language', 1, 'ALL']],
	},
	hermit: {
		skills: ['medicine', 'religion'],
		proficiencies: {
			armor: [],
			tools: ['herbalism kit'],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: ['herbalism kit'],
			weapons: [],
			other: ['scroll case full of notes', 'winter blanket', 'clothes', '5 gp'],
		},
		money: 500,
		feature: 'discovery',
		var: false,
		select: [['language', 1, 'ALL']],
	},
	noble: {
		skills: ['history', 'persuasion'],
		proficiencies: {
			armor: [],
			tools: [],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: [],
			weapons: [],
			other: ['clothes', 'signet ring', 'scroll of pedigree', 'purse', '25 gp'],
		},
		money: 2500,
		feature: 'position of privilege (or retainers)',
		var: true,
		select: [
			['language', 1, 'ALL'],
			['proficiencies', 1, 'gaming set', 'tools'],
		],
	},
	knight: {
		skills: ['history', 'persuasion'],
		proficiencies: {
			armor: [],
			tools: [],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: [],
			weapons: [],
			other: ['clothes', 'signet ring', 'scroll of pedigree', 'purse', '25 gp'],
		},
		money: 2500,
		feature: 'retainers',
		var: 'noble',
		select: [
			['language', 1, 'ALL'],
			['proficiencies', 1, 'gaming set', 'tools'],
		],
	},
	outlander: {
		skills: ['athletics', 'survival'],
		proficiencies: {
			armor: [],
			tools: [],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: [],
			weapons: ['staff'],
			other: ['hunting trap', 'trophy from an animal', 'clothes', 'belt pouch', '10 gp'],
		},
		money: 1000,
		feature: 'wanderer',
		var: false,
		select: [
			['language', 1, 'ALL'],
			['proficiencies', 1, 'musical instrument', 'tools'],
		],
	},
	sage: {
		skills: ['arcana', 'history'],
		proficiencies: {
			armor: [],
			tools: [],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: [],
			weapons: [],
			other: ['bottle of ink', 'quill', 'small knife', 'letter from colleague', 'clothes', 'belt pouch'],
		},
		money: 0,
		feature: 'researcher',
		var: false,
		select: [['language', 2, 'ALL']],
	},
	sailor: {
		skills: ['athletics', 'perception'],
		proficiencies: {
			armor: [],
			tools: ["navigator's kit", 'water vehicle'],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: [],
			weapons: ['club'],
			other: ["50' of silk rope", 'lucky charm', 'clothes', 'belt pouch', '10 gp'],
		},
		money: 1000,
		language: 0,
		feature: "ship's passage",
		var: true,
	},
	pirate: {
		skills: ['athletics', 'perception'],
		proficiencies: {
			armor: [],
			tools: ["navigator's kit", 'water vehicle'],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: [],
			weapons: ['club'],
			other: ["50' of silk rope", 'lucky charm', 'clothes', 'belt pouch', '10 gp'],
		},
		money: 1000,
		language: 0,
		feature: 'bad reputation',
		var: 'sailor',
	},
	soldier: {
		skills: ['athletics', 'intimidation'],
		proficiencies: {
			armor: [],
			tools: ['land vehicle'],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: ['set of dice or playing cards'],
			weapons: [],
			other: ['rank insignia', 'trophy taken from enemy', 'clothes', 'belt pouch', '10 gp'],
		},
		money: 1000,
		language: 0,
		feature: 'military rank',
		var: false,
		select: [['proficiencies', 1, 'gaming set', 'tools']],
	},
	urchin: {
		skills: ['sleight of hand', 'stealth'],
		proficiencies: {
			armor: [],
			tools: ['disguise kit', "thieves' tools"],
			weapons: [],
		},
		equipment: {
			armor: [],
			tools: [],
			weapons: [],
			other: ['small knife', 'map of city', 'pet', 'token of remembrance', 'clothes', 'belt pouch', '10 gp'],
		},
		money: 1000,
		language: 0,
		feature: 'city secrets',
		var: false,
	},
	select: {
		acolyteSelect: [
			{
				type: 'list',
				cat: ['background', 'language'],
				count: 2,
				ref: 'obj',
				list: ['language'],
				result: [],
				name: ['language'],
			},
		],
		criminalSelect: [
			{
				type: 'list',
				cat: ['background', 'proficiencies', 'tools'],
				count: 1,
				ref: 'obj',
				list: ['tools', 'artisan\'s tools'],
				result: [],
				name: ['proficiency', 'artisan\'s tools'],
			},
		],
		spySelect: [
			{
				type: 'list',
				cat: ['background', 'proficiencies', 'tools'],
				count: 1,
				ref: 'obj',
				list: ['tools', 'gaming set'],
				result: [],
				name: ['proficiency', 'gaming set'],
			},
		],
		entertainerSelect: [
			{
				type: 'list',
				cat: ['background', 'proficiencies', 'tools'],
				count: 1,
				ref: 'obj',
				list: ['tools', 'musical instrument'],
				result: [],
				name: ['proficiency', 'musical instrument'],
			},
		]
	}
};

// const CharacterBackground = {
//     background: {
//         Acolyte: {
//             skills: ['Insight', 'Religion'],
//             proficiency: [],
//             language: 2,
//             equipment: ['Holy symbol', 'prayer book or prayer wheel', 'incense', 'clothes', 'belt pouch', '15 gp'],
//             feature: 'Shelter of the Faithful',
//             var: false,
//         },
//         Charlatan: {
//             skills: ['Deception', 'Sleight of Hand'],
//             proficiency: ['disguise & forgery kits'],
//             language: 0,
//             equipment: ['Clothes', 'disguise kit', 'con props', 'belt pouch', '15 gp'	],
//             feature: 'False Identity',
//             var: false
//         },
//         Criminal: {
//             skills: ['Deception', 'Stealth'],
//             proficiency: ['1 gaming set', 'thieves tools'],
//             language: 0,
//             equipment: ['Crowbar', 'clothes', 'hood', 'belt pouch', '15 gp'],
//             feature: 'Criminal Contact',
//             var: 'Spy',
//         },
//         Entertainer: {
//             skills: ['Acrobatics', 'Performance'],
//             proficiency: ['disguise kit', '1 musical instrument'],
//             language: 0,
//             equipment: ['musical instrument', 'admirer\'s favor', 'costume', 'belt pouch', '15 gp'],
//             feature: 'Popular Demand',
//             var: 'Gladiator'
//         },
//         'Folk Hero': {
//             skills: ['Animal Handling', 'Survival'],
//             proficiency: ['1 artisan\'s tools', 'land vehicle'],
//             language: 0,
//             equipment: ['Artisan\'s tool set', 'shovel', 'iron pot', 'clothes', 'belt pouch'],
//             feature: 'Rustic Hospitality',
//             var: false
//         },
//         'Guild Artisan': {
//             skills: ['Insight', 'Persuasion'],
//             proficiency: ['1 artisan\'s tools'],
//             language: 1,
//             equipment: ['Artisan\'s tool set', 'letter of introduction', 'clothes', 'belt pouch', '15 gp'],
//             feature: 'Guild Membership',
//             var: 'Guid Merchant',
//         },
//         Hermit: {
//             skills: ['Medicine', 'Religion'],
//             proficiency: ['herbalism kit'],
//             language: 1,
//             equipment: ['Scroll case full of notes', 'winter blanket', 'clothes', 'herbalism kit', '5 gp'],
//             feature: 'Discovery',
//             var: false
//         },
//         Noble: {
//             skills: ['History', 'Persuasion'],
//             proficiency: ['1 gaming set'],
//             language: 1,
//             equipment: ['Clothes', 'signet ring', 'scroll of pedigree', 'purse', '25 gp'],
//             feature: 'Position of Privilege (or Retainers)',
//             var: 'Knight',
//         },
//         Outlander: {
//             skills: ['Athletics', 'Survival'],
//             proficiency: ['1 musical instrument'],
//             language: 1,
//             equipment: ['Staff', 'hunting trap', 'trophy from an animal', 'clothes', 'belt pouch', '10 gp'],
//             feature: 'Wanderer',
//             var: false
//         },
//         Sage: {
//             skills: ['Arcana', 'History'],
//             proficiency: [],
//             language: 2,
//             equipment: ['Bottle of ink', 'quill', 'small knife', 'letter from colleague', 'clothes', 'belt pouch'],
//             feature: 'Researcher',
//             var: false
//         },
//         Sailor: {
//             skills: ['Athletics', 'Perception'],
//             proficiency: ['navigator\'s kit', 'water vehicle'],
//             language: 0,
//             equipment: ['Club', '50\' of silk rope', 'lucky charm', 'clothes', 'belt pouch', '10 gp'],
//             feature: 'Ship\'s Passage',
//             var: 'Pirate'
//         },

//         Soldier: {
//             skills: ['Athletics', 'Intimidation'],
//             proficiency: ['1 gaming set', 'land vehicle'],
//             language: 0,
//             equipment: ['Rank insignia', 'trophy taken from enemy', 'set of dice or playing cards', 'clothes', 'belt pouch', '10 gp'],
//             feature: '',
//             var: false
//         },
//         Urchin: {
//             skills: ['Sleight of Hand', 'Stealth'],
//             proficiency: ['disguise kit', 'thieves\' tools'],
//             language: 0,
//             equipment: ['Small knife', 'map of city', 'pet', 'token of remembrance', 'clothes', 'belt pouch', '10 gp'],
//             feature: 'City Secrets',
//             var: false
//         }
//     },
//     variant: {
//         Spy: {
//             skills: ['Deception', 'Stealth'],
//             proficiency: ['1 gaming set', 'thieves tools'],
//             language: 0,
//             equipment: ['Crowbar', 'clothes', 'hood', 'belt pouch', '15 gp'],
//             feature: 'Criminal Contact',
//             var: 'Criminal'
//         },
//         Gladiator: {
//             skills: ['Acrobatics', 'Performance'],
//             proficiency: ['disguise kit'],
//             language: 0,
//             equipment: ['Inexpensive but unusual weapon (ex trident or net)', 'admirer\'s favor', 'costume', 'belt pouch', '15 gp'],
//             feature: 'Popular Demand',
//             var: 'Entertainer'
//         },
//         'Guild Merchant': {
//             skills: ['Insight', 'Persuasion'],
//             proficiency: ['navigator\'s tools'],
//             language: 1,
//             equipment: ['Mule and cart', 'letter of introduction', 'clothes', 'belt pouch', '15 gp'],
//             feature: 'Guild Membership',
//             var: 'Guild Artisan'
//         },
//         Knight: {
//             skills: ['History', 'Persuasion'],
//             proficiency: ['1 gaming set'],
//             language: 1,
//             equipment: ['Clothes', 'signet ring', 'scroll of pedigree', 'purse', '25 gp'],
//             feature: 'Retainers',
//             var: 'Noble'
//         },
//         Pirate: {
//             skills: ['Athletics', 'Perception'],
//             proficiency: ['navigator\'s kit', 'water vehicle'],
//             language: 0,
//             equipment: ['Club', '50\' of silk rope', 'lucky charm', 'clothes', 'belt pouch', '10 gp'],
//             feature: 'Bad Reputation',
//             var: 'Sailor'
//         },
//     }
// }


// export default CharacterBackground;
