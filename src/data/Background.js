const CharacterBackground = {
    background: {
        Acolyte: {
            skills: ['Insight', 'Religion'],
            proficiency: [],
            language: 2,
            equipment: ['Holy symbol', 'prayer book or prayer wheel', 'incense', 'clothes', 'belt pouch', '15 gp'],
            feature: 'Shelter of the Faithful',
            var: false,
        },
        Charlatan: {
            skills: ['Deception', 'Sleight of Hand'],
            proficiency: ['disguise & forgery kits'],
            language: 0,
            equipment: ['Clothes', 'disguise kit', 'con props', 'belt pouch', '15 gp'	],
            feature: 'False Identity',
            var: false
        },
        Criminal: {
            skills: ['Deception', 'Stealth'],
            proficiency: ['1 gaming set', 'thieves tools'],
            language: 0,
            equipment: ['Crowbar', 'clothes', 'hood', 'belt pouch', '15 gp'],
            feature: 'Criminal Contact',
            var: 'Spy',
        },
        Entertainer: {
            skills: ['Acrobatics', 'Performance'],
            proficiency: ['disguise kit', '1 musical instrument'],
            language: 0,
            equipment: ['Musical instrument', 'admirer\'s favor', 'costume', 'belt pouch', '15 gp'],
            feature: 'Popular Demand',
            var: 'Gladiator'
        },
        'Folk Hero': {
            skills: ['Animal Handling', 'Survival'],
            proficiency: ['1 artisan\'s tools', 'land vehicle'],
            language: 0,
            equipment: ['Artisan\'s tool set', 'shovel', 'iron pot', 'clothes', 'belt pouch'],
            feature: 'Rustic Hospitality',
            var: false
        },
        'Guild Artisan': {
            skills: ['Insight', 'Persuasion'],
            proficiency: ['1 artisan\'s tools'],
            language: 1,
            equipment: ['Artisan\'s tool set', 'letter of introduction', 'clothes', 'belt pouch', '15 gp'],
            feature: 'Guild Membership',
            var: 'Guid Merchant',
        },
        Hermit: {
            skills: ['Medicine', 'Religion'],
            proficiency: ['herbalism kit'],
            language: 1,
            equipment: ['Scroll case full of notes', 'winter blanket', 'clothes', 'herbalism kit', '5 gp'],
            feature: 'Discovery',
            var: false
        },
        Noble: {
            skills: ['History', 'Persuasion'],
            proficiency: ['1 gaming set'],
            language: 1,
            equipment: ['Clothes', 'signet ring', 'scroll of pedigree', 'purse', '25 gp'],
            feature: 'Position of Privilege (or Retainers)',
            var: 'Knight',
        },
        Outlander: {
            skills: ['Athletics', 'Survival'],
            proficiency: ['1 musical instrument'],
            language: 1,
            equipment: ['Staff', 'hunting trap', 'trophy from an animal', 'clothes', 'belt pouch', '10 gp'],
            feature: 'Wanderer',
            var: false
        },
        Sage: {
            skills: ['Arcana', 'History'],
            proficiency: [],
            language: 2,
            equipment: ['Bottle of ink', 'quill', 'small knife', 'letter from colleague', 'clothes', 'belt pouch'],
            feature: 'Researcher',
            var: false
        },
        Sailor: {
            skills: ['Athletics', 'Perception'],
            proficiency: ['navigator\'s kit', 'water vehicle'],
            language: 0,
            equipment: ['Club', '50\' of silk rope', 'lucky charm', 'clothes', 'belt pouch', '10 gp'],
            feature: 'Ship\'s Passage',
            var: 'Pirate'
        },

        Soldier: {
            skills: ['Athletics', 'Intimidation'],
            proficiency: ['1 gaming set', 'land vehicle'],
            language: 0,
            equipment: ['Rank insignia', 'trophy taken from enemy', 'set of dice or playing cards', 'clothes', 'belt pouch', '10 gp'],
            feature: '',
            var: false
        },
        Urchin: {
            skills: ['Sleight of Hand', 'Stealth'],
            proficiency: ['disguise kit', 'thieves\' tools'],
            language: 0,
            equipment: ['Small knife', 'map of city', 'pet', 'token of remembrance', 'clothes', 'belt pouch', '10 gp'],
            feature: 'City Secrets',
            var: false
        }
    },
    variant: {
        Spy: {
            skills: ['Deception', 'Stealth'],
            proficiency: ['1 gaming set', 'thieves tools'],
            language: 0,
            equipment: ['Crowbar', 'clothes', 'hood', 'belt pouch', '15 gp'],
            feature: 'Criminal Contact',
            var: 'Criminal'
        },
        Gladiator: {
            skills: ['Acrobatics', 'Performance'],
            proficiency: ['disguise kit'],
            language: 0,
            equipment: ['Inexpensive but unusual weapon (ex trident or net)', 'admirer\'s favor', 'costume', 'belt pouch', '15 gp'],
            feature: 'Popular Demand',
            var: 'Entertainer'
        },
        'Guild Merchant': {
            skills: ['Insight', 'Persuasion'],
            proficiency: ['navigator\'s tools'],
            language: 1,
            equipment: ['Mule and cart', 'letter of introduction', 'clothes', 'belt pouch', '15 gp'],
            feature: 'Guild Membership',
            var: 'Guild Artisan'
        },
        Knight: {
            skills: ['History', 'Persuasion'],
            proficiency: ['1 gaming set'],
            language: 1,
            equipment: ['Clothes', 'signet ring', 'scroll of pedigree', 'purse', '25 gp'],
            feature: 'Retainers',
            var: 'Noble'
        },
        Pirate: {
            skills: ['Athletics', 'Perception'],
            proficiency: ['navigator\'s kit', 'water vehicle'],
            language: 0,
            equipment: ['Club', '50\' of silk rope', 'lucky charm', 'clothes', 'belt pouch', '10 gp'],
            feature: 'Bad Reputation',
            var: 'Sailor'
        },
    }
}

export const Background = {
	Acolyte: {
		skills: ['insight', 'religion'],
		proficiency: [],
		language: 2,
		equipment: ['holy symbol', 'prayer book or prayer wheel', 'incense', 'clothes', 'belt pouch', '15 gp'],
		feature: 'shelter of the faithful',
		var: false,
	},
	Charlatan: {
		skills: ['deception', 'Sleight of Hand'],
		proficiency: ['disguise & forgery kits'],
		language: 0,
		equipment: ['Clothes', 'disguise kit', 'con props', 'belt pouch', '15 gp'],
		feature: 'false identity',
		var: false,
	},
	Criminal: {
		skills: ['deception', 'stealth'],
		proficiency: ['1 gaming set', 'thieves tools'],
		language: 0,
		equipment: ['crowbar', 'clothes', 'hood', 'belt pouch', '15 gp'],
		feature: 'criminal contact',
		var: true,
	},
	Spy: {
		skills: ['deception', 'stealth'],
		proficiency: ['1 gaming set', 'thieves tools'],
		language: 0,
		equipment: ['crowbar', 'clothes', 'hood', 'belt pouch', '15 gp'],
		feature: 'criminal contact',
		var: 'criminal',
	},
	Entertainer: {
		skills: ['acrobatics', 'performance'],
		proficiency: ['disguise kit', '1 musical instrument'],
		language: 0,
		equipment: ['musical instrument', "admirer's favor", 'costume', 'belt pouch', '15 gp'],
		feature: 'popular demand',
		var: true,
	},
	Gladiator: {
		skills: ['acrobatics', 'performance'],
		proficiency: ['disguise kit'],
		language: 0,
		equipment: ['inexpensive but unusual weapon (ex trident or net)', "admirer's favor", 'costume', 'belt pouch', '15 gp'],
		feature: 'popular demand',
		var: 'entertainer',
	},
	'Folk Hero': {
		skills: ['animal handling', 'survival'],
		proficiency: ["1 artisan's tools", 'land vehicle'],
		language: 0,
		equipment: ["artisan's tool set", 'shovel', 'iron pot', 'clothes', 'belt pouch'],
		feature: 'rustic hospitality',
		var: false,
	},
	'Guild Artisan': {
		skills: ['insight', 'persuasion'],
		proficiency: ["1 artisan's tools"],
		language: 1,
		equipment: ["artisan's tool set", 'letter of introduction', 'clothes', 'belt pouch', '15 gp'],
		feature: 'guild membership',
		var: true,
	},
	'Guild Merchant': {
		skills: ['insight', 'persuasion'],
		proficiency: ["navigator's tools"],
		language: 1,
		equipment: ['mule and cart', 'letter of introduction', 'clothes', 'belt pouch', '15 gp'],
		feature: 'guild membership',
		var: 'guild artisan',
	},
	Hermit: {
		skills: ['medicine', 'religion'],
		proficiency: ['herbalism kit'],
		language: 1,
		equipment: ['scroll case full of notes', 'winter blanket', 'clothes', 'herbalism kit', '5 gp'],
		feature: 'discovery',
		var: false,
	},
	Noble: {
		skills: ['history', 'persuasion'],
		proficiency: ['1 gaming set'],
		language: 1,
		equipment: ['clothes', 'signet ring', 'scroll of pedigree', 'purse', '25 gp'],
		feature: 'position of privilege (or retainers)',
		var: true,
	},
	Knight: {
		skills: ['history', 'persuasion'],
		proficiency: ['1 gaming set'],
		language: 1,
		equipment: ['clothes', 'signet ring', 'scroll of pedigree', 'purse', '25 gp'],
		feature: 'retainers',
		var: 'noble',
	},
	Outlander: {
		skills: ['athletics', 'survival'],
		proficiency: ['1 musical instrument'],
		language: 1,
		equipment: ['staff', 'hunting trap', 'trophy from an animal', 'clothes', 'belt pouch', '10 gp'],
		feature: 'wanderer',
		var: false,
	},
	Sage: {
		skills: ['arcana', 'history'],
		proficiency: [],
		language: 2,
		equipment: ['bottle of ink', 'quill', 'small knife', 'letter from colleague', 'clothes', 'belt pouch'],
		feature: 'researcher',
		var: false,
	},
	Sailor: {
		skills: ['athletics', 'perception'],
		proficiency: ["navigator's kit", 'water vehicle'],
		language: 0,
		equipment: ['club', "50' of silk rope", 'lucky charm', 'clothes', 'belt pouch', '10 gp'],
		feature: "ship's passage",
		var: true,
	},
	Pirate: {
		skills: ['athletics', 'perception'],
		proficiency: ["navigator's kit", 'water vehicle'],
		language: 0,
		equipment: ['club', "50' of silk rope", 'lucky charm', 'clothes', 'belt pouch', '10 gp'],
		feature: 'bad reputation',
		var: 'sailor',
	},
	Soldier: {
		skills: ['athletics', 'intimidation'],
		proficiency: ['1 gaming set', 'land vehicle'],
		language: 0,
		equipment: ['rank insignia', 'trophy taken from enemy', 'set of dice or playing cards', 'clothes', 'belt pouch', '10 gp'],
		feature: '',
		var: false,
	},
	Urchin: {
		skills: ['sleight of hand', 'stealth'],
		proficiency: ['disguise kit', "thieves' tools"],
		language: 0,
		equipment: ['small knife', 'map of city', 'pet', 'token of remembrance', 'clothes', 'belt pouch', '10 gp'],
		feature: 'city secrets',
		var: false,
	},
};

export default CharacterBackground;
