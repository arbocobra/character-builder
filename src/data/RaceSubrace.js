const CharacterRaceSubrace = {
	race: {
		aarakocra: {
			size: 'M',
			speed: 25,
			language: ['common', 'aarakocra', 'auran'],
			modifiers: [0, 2, 0, 0, 1, 0],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: ['flight', 'talons', 'wind caller'],
		},
		aasimar: {
			size: 'M',
			speed: 30,
			language: ['common', 'celestial'],
			modifiers: null,
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: ['darkvision', 'celestial resistance', 'healing hands', 'light bearer'],
		},
		bugbear: {
			size: 'M',
			speed: 30,
			language: ['common', 'goblin'],
			modifiers: [2, 1, 0, 0, 0, 0],
			skills: ['stealth'],
			has_subrace: false,
			subrace_req: null,
			extras: ['darkvision', 'fey ancestry', 'long-limbed', 'powerful build', 'sneaky', 'surprise attack'],
		},
		centaur: {
			size: 'M',
			speed: 40,
			language: ['common', 'sylvan'],
			modifiers: [2, 0, 0, 0, 1, 0],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: ['charge', 'equine build', 'hooves', 'natural affinity'],
			select: [['skills', 1, ['animal handling', 'medicine', 'nature', 'survival']]],
		},
		changeling: {
			size: 'M',
			speed: 30,
			language: ['common'],
			modifiers: [0, 0, 0, 0, 0, 2],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: ['changeling instincts', 'shapechanger'],
			select: [
				['skills', 2, ['deception', 'insight', 'intimidation', 'performance', 'persuasion']],
				['language', 2, 'ALL'],
				['abilities', 1, ['dexterity', 'intelligence']],
			],
		},
		dragonborn: {
			size: 'M',
			speed: 30,
			language: ['common', 'draconic'],
			modifiers: [2, 0, 0, 0, 0, 1],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: ['breath weapon', 'damage resistance', 'draconic ancestry'],
		},
		dwarf: {
			size: 'M',
			speed: 25,
			language: ['common', 'dwarf'],
			modifiers: null,
			skills: null,
			has_subrace: true,
			subrace: ['hill', 'mountain', 'gray (duergar)'],
			subrace_req: true,
			extras: ['darkvision', 'dwarven combat training', 'dwarven resilience', 'stonecunning', 'tool proficiency'],
		},
		elf: {
			size: 'M',
			speed: 30,
			language: ['common', 'elvish'],
			modifiers: null,
			skills: ['perception'],
			has_subrace: true,
			subrace: ['high', 'wood', 'drow', 'eladrin', 'sea elf', 'shadar kai'],
			subrace_req: true,
			extras: ['darkvision', 'fey ancestry', 'keen sense', 'trance'],
		},
		firbolg: {
			size: 'M',
			speed: 30,
			language: ['common', 'elvish', 'giant'],
			modifiers: [1, 0, 0, 0, 2, 0],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: ['firborg magic', 'hidden step', 'powerful build', 'speech of beast and leaf'],
		},
		genasi: {
			size: 'S/M',
			speed: 30,
			language: ['common', 'primordial'],
			modifiers: null,
			skills: null,
			has_subrace: true,
			subrace: ['air', 'earth', 'fire', 'water'],
			subrace_req: true,
			extras: ['darkvision'],
		},
		gith: {
			size: 'M',
			speed: 30,
			language: ['common', 'gith'],
			modifiers: null,
			skills: null,
			has_subrace: true,
			subrace: ['githyanki', 'githzerai'],
			subrace_req: true,
			extras: ['psychic resilience'],
		},
		gnome: {
			size: 'S',
			speed: 25,
			language: ['common', 'gnomish'],
			modifiers: null,
			skills: null,
			has_subrace: true,
			subrace: ['forest', 'rock', 'deep (svirfneblin)'],
			subrace_req: true,
			extras: ['darkvision', 'gnome cunning'],
		},
		goblin: {
			size: 'S',
			speed: 30,
			language: ['common', 'goblin'],
			modifiers: [0, 2, 1, 0, 0, 0],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: ['darkvision', 'fey ancestry', 'fury of the small', 'nimble escape'],
		},
		goliath: {
			size: 'M',
			speed: 30,
			language: ['common', 'giant'],
			modifiers: [2, 0, 1, 0, 0, 0],
			skills: ['athletics'],
			has_subrace: false,
			subrace_req: null,
			extras: ['little giant', 'mountain born', 'stone\'s endurance'],
		},
		grung: {
			size: 'S',
			speed: 25,
			language: ['common, grung'],
			modifiers: [0,2,1,0,0,0],
			skills: ['perception'],
			has_subrace: false,
			subrace_req: null,
			extras: ['amphibious', 'arboreal alertness', 'poison immunity', 'poisonous skin', 'standing leap', 'water dependency'],
		},
		halfling: {
			size: 'S',
			speed: 25,
			language: ['common', 'halfling'],
			modifiers: null,
			skills: null,
			has_subrace: true,
			subrace: ['lightfoot', 'stout'],
			subrace_req: true,
			extras: ['brave', 'lucky', 'nimble'],
		},
		'half-elf': {
			size: 'M',
			speed: 30,
			language: ['common', 'elvish'],
			modifiers: [0, 0, 0, 0, 0, 2],
			skills: null,
			has_subrace: true,
			subrace: ['half-high', 'half-wood', 'half-drow', 'half-sea'],		
			subrace_req: false,
			extras: ['darkvision', 'fey ancestry', 'half-elf versatility'],
			select: [
				['skills', 2, 'ALL'],
				['abilities', 2, ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom']],
			],
		},
		'half-orc': {
			size: 'M',
			speed: 30,
			language: ['common', 'orc'],
			modifiers: [2, 0, 1, 0, 0, 0],
			skills: ['intimidation'],
			has_subrace: false,
			subrace_req: null,
			extras: ['darkvision', 'menacing', 'relentless endurance', 'savage attacks'],
		},
		hobgoblin: {
			size: 'M',
			speed: 30,
			language: ['common', 'goblin'],
			modifiers: [0, 0, 2, 1, 0, 0],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: ['darkvision', 'fey ancestry', 'fey gift', 'fortune from the many'],
		},
		human: {
			size: 'M',
			speed: 30,
			language: ['common'],
			modifiers: [1, 1, 1, 1, 1, 1],
			skills: null,
			has_subrace: true,
			subrace: ['variant'],
			subrace_req: false,
			extras: null,
			select: [['language', 1, 'ALL']],
		},
		kalashtar: {
			size: 'M',
			speed: 30,
			language: ['common', 'quori'],
			modifiers: [0, 0, 0, 0, 2, 1],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: ['dual mind', 'mentail discipline', 'mind link', 'severed from dreams'],
			select: [['language', 1, 'ALL']],
		},
		kenku: {
			size: 'M',
			speed: 30,
			language: ['common', 'auran (all speech via mimicry)'],
			modifiers: [0, 2, 0, 0, 1, 0],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: ['expert duplication', 'kenku recall', 'mimicry'],
			select: [['skills', 2, ['acrobatics', 'deception', 'stealth', 'sleight of hand']]],
		},
		kobold: {
			size: 'S',
			speed: 30,
			language: ['common', 'draconic'],
			modifiers: [0, 2, 0, 0, 0, 0],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: ['darkvision', 'draconic cry', 'kobold legacy'],
		},
		lizardfolk: {
			size: 'M',
			speed: 30,
			language: ['common', 'draconic'],
			modifiers: [0, 0, 2, 0, 1, 0],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: ["30' swim", 'Hold breath 15min', 'Bite', 'Hungry Jaws', 'Natural Armor', 'Cunning Artisan'],
			select: [['skills', 2, ['animal handling', 'nature', 'perception', 'stealth', 'survival']]],
		},
		loxodon: {
			size: 'M',
			speed: 30,
			language: ['common', 'loxodon'],
			modifiers: [0, 0, 2, 0, 1, 0],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: [
				'Powerful Build',
				'Natural Armor (12+CON)',
				'Trunk',
				'Adv. against Charmed/Frightened',
				'Adv. on Perception, Survival, Investigation checks involving smell',
			],
		},
		minotaur: {
			size: 'M',
			speed: 30,
			language: ['common', 'minotaur'],
			modifiers: [2, 0, 1, 0, 0, 0],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: ['Horns', 'Hammering Horns', 'Goring Rush', 'Labyrinthine Recall'],
			select: [['skills', 1, ['intimidation', 'persuasion']]],
		},
		orc: {
			size: 'M',
			speed: 30,
			language: ['common', 'orc'],
			modifiers: [2, 0, 1, 0, 0, 0],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: [
				"60' Darkvision",
				'Adrenaline Rush (bonus action Dash toward enemy)',
				'Powerful Build',
				'Relentless Endurance',
			],
		},
		shifter: {
			size: 'M',
			speed: 30,
			language: ['common'],
			modifiers: null,
			skills: null,
			has_subrace: true,
			subrace: ['beasthide', 'longtooth', 'swiftstride', 'wildhunt'],
			subrace_req: true,
			extras: ["60' Darkvision", 'Shifting: temp hp (2xPB)'],
			select: [['skills', 1, ['acrobatics', 'athletics', 'intimidation', 'survival']]],
		},
		'simic hybrid': {
			size: 'M',
			speed: 30,
			language: ['common', 'elvish/vedalken'],
			modifiers: [0, 0, 2, 0, 0, 0],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: ["60' Darkvision", '+1 AC (w/o heavy armor)', 'Acid Spit', 'Animal Enhancements (at L1 and L5)'],
			select: [['abilities', 1, ['strength', 'dexterity', 'intelligence', 'wisdom', 'charisma']]],
		},
		tabaxi: {
			size: 'S/M',
			speed: 30,
			language: ['common'],
			modifiers: [0, 2, 0, 0, 0, 1],
			skills: ['perception', 'stealth'],
			has_subrace: false,
			subrace_req: null,
			extras: ["30' climb", "60' Darkvision", 'Feline Agility (temp. speed*2)', "Cat's Claws"],
			select: [['language', 1, 'ALL']],
		},
		tiefling: {
			size: 'M',
			speed: 30,
			language: ['common', 'infernal'],
			modifiers: [0, 0, 0, 1, 0, 2],
			skills: null,
			has_subrace: true,
			subrace: ['variant', 'feral'],
			subrace_req: false,
			extras: ["60' Darkvision", 'Infernal Legacy (spells)', 'Fire res.'],
		},
		tortle: {
			size: 'M',
			speed: 30,
			language: ['common', 'aquan'],
			modifiers: [2, 0, 0, 0, 1, 0],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: ['Natural Armor (base AC = 17)', 'Shell Defense', 'Claws', 'Hold Breath', "Nature's Intuition"],
			select: [['skills', 1, ['animal handling', 'medicine', 'nature', 'perception', 'stealth', 'survival']]],
		},
		triton: {
			size: 'M',
			speed: 30,
			language: ['common', 'primordial'],
			modifiers: [1, 0, 1, 0, 0, 1],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: [
				"30' swim",
				'Amphibious',
				'Control Air/Water (spells)',
				'Emissary of the Sea,\nGuardians of the Depths (prim. Cold res.)',
			],
		},
		vedalken: {
			size: 'M',
			speed: 30,
			language: ['common', 'vedalken'],
			modifiers: [0, 0, 0, 2, 1, 0],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: ['Partially Amphibious', 'Tireless Precision', 'Adv. on INT, WIS & CHA saves'],
			select: [['language', 1, 'ALL']],
		},
		warforged: {
			size: 'M',
			speed: 30,
			language: ['common'],
			modifiers: null,
			skills: null,
			has_subrace: true,
			subrace: ['envoy', 'juggernaut', 'skirmisher'],
			subrace_req: true,
			extras: ['Warforged Resilience', "Sentry's Rest", 'Integrated Protection'],
		},
		'yuan-ti': {
			size: 'M',
			speed: 30,
			language: ['common', 'abyssal', 'draconic'],
			modifiers: [0, 0, 0, 1, 0, 2],
			skills: null,
			has_subrace: false,
			subrace_req: null,
			extras: [
				"60' Darkvision",
				'Innate Spellcasting (spells)',
				'Adv. on saves against magic',
				'Immune to Poison/Poisoned',
			],
		},
	},
	subrace: {
		dwarf: {
			hill: {
				modifiers: [0, 0, 2, 0, 1, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ['dwarven toughness'],
			},
			mountain: {
				modifiers: [2, 0, 2, 0, 0, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ['dwarven armor training'],
			},
			'gray (duergar)': {
				modifiers: [1, 0, 2, 0, 0, 0],
				skills: null,
				language: ['undercommon'],
				speed: null,
				extras: ['duergar magic', 'psionic fortitude'],
			},
		},
		elf: {
			high: {
				modifiers: [0, 2, 0, 1, 0, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ['extra language', 'elf weapon training'],
				select: [['language', 1, 'all']],
			},
			wood: {
				modifiers: [0, 2, 0, 0, 1, 0],
				skills: null,
				language: null,
				speed: 35,
				extras: ['elf weapon training', 'fleet of foot', 'mask of the wild'],
			},
			drow: {
				modifiers: [0, 2, 0, 0, 0, 1],
				skills: null,
				language: null,
				speed: null,
				extras: ['drow magic', 'drow weapon training', 'sunlight sensitivity'],
			},
			eladrin: {
				modifiers: [0, 2, 0, 0, 0, 1],
				skills: null,
				language: null,
				speed: null,
				extras: ['fey step'],
			},
			'sea elf': {
				modifiers: [0, 2, 1, 0, 0, 0],
				skills: null,
				language: ['aquan'],
				speed: null,
				extras: ['child of the sea', 'friend of the sea'],
			},
			'shadar kai': {
				modifiers: [0, 2, 1, 0, 0, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ['blessing of the raven queen', 'necrotic resistance'],
			},
		},
		genasi: {
			air: {
				modifiers: [0, 1, 2, 0, 0, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ['lightning resistance', 'mingle with the wind', 'unending breath'],
			},
			earth: {
				modifiers: [1, 0, 2, 0, 0, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ['earth walk', 'merge with stone'],
			},
			fire: {
				modifiers: [0, 0, 2, 1, 0, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ['fire resistance', 'reach to the blaze'],
			},
			water: {
				modifiers: [0, 0, 2, 0, 1, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ['acid resistance', 'call to the wave'],
			},
		},
		gith: {
			githyanki: {
				modifiers: [2, 0, 0, 1, 0, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ['astral knowledge', 'githyanki psionics'],
			},
			githzerai: {
				modifiers: [0, 0, 0, 1, 2, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ['githzerai psionics', 'mentail discipline'],
			},
		},
		gnome: {
			forest: {
				modifiers: [0, 1, 0, 2, 0, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ['natural illusionist', 'speak with small beasts'],
			},
			rock: {
				modifiers: [0, 0, 1, 2, 0, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ['artificer\'s lore', 'tinker'],
			},
			'deep (svirfneblin)': {
				modifiers: [0, 1, 0, 2, 0, 0],
				skills: null,
				language: ['undercommon'],
				speed: null,
				extras: ['gift of the svirfneblin', 'svirfneblin camouflage'],
			},
		},
		halfling: {
			lightfoot: {
				modifiers: [0, 2, 0, 0, 0, 1],
				skills: null,
				language: null,
				speed: null,
				extras: ['naturally stealthy'],
			},
			stout: {
				modifiers: [0, 2, 1, 0, 0, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ['stout resilience'],
			},
			// ghostwise: {
			// 	modifiers: [0, 2, 0, 0, 1, 0],
			// 	skills: null,
			// 	language: null,
			// 	speed: null,
			// 	extras: ['silent speech'],
			// },
		},
		'half-elf': {
			'half-wood': {
				modifiers: [0, 0, 0, 0, 0, 2],
				skills: null,
				language: null,
				speed: null,
				extras: null,
				select: [['abilities', 2, ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom']], ['language', 1, 'all']],
			},
			'half-high': {
				modifiers: [0, 0, 0, 0, 0, 2],
				skills: null,
				language: null,
				speed: null,
				extras: null,
				select: [['abilities', 2, ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom']], ['language', 1, 'all']],
			},
			'half-drow': {
				modifiers: [0, 0, 0, 0, 0, 2],
				skills: null,
				language: null,
				speed: null,
				extras: null,
				select: [['abilities', 2, ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom']], ['language', 1, 'all']],
			},
			'half-aquatic': {
				modifiers: [0, 0, 0, 0, 0, 2],
				skills: null,
				language: null,
				speed: null,
				extras: null,
				select: [['abilities', 2, ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom']], ['language', 1, 'all']],
			},
		},
		human: {
			variant: {
				modifiers: [0, 0, 0, 0, 0, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ['**+1 feat'],
				select: [
					['skills', 1, 'all'],
					['language', 1, 'all'],
					['abilities', 2, 'all'],
				],
			},
		},
		shifter: {
			beasthide: {
				modifiers: [0, 1, 2, 0, 0, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ["60' darkvision", 'shifting', 'while shifted: 1d6 temp hp and +1 ac'],
			},
			longtooth: {
				modifiers: [2, 1, 0, 0, 0, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ["60' darkvision", 'shifting', 'while shifted: unarmed strike w fangs (1d6 + str -> piercing)'],
			},
			swiftstride: {
				modifiers: [0, 2, 0, 0, 0, 1],
				skills: null,
				language: null,
				speed: 35,
				extras: ["60' darkvision", 'shifting', "while shifted: +10 speed, +10 reaction in 5' proximity (no oa)"],
			},
			wildhunt: {
				modifiers: [0, 1, 0, 0, 2, 0],
				skills: null,
				language: null,
				speed: null,
				extras: [
					"60' darkvision",
					'shifting',
					'while shifted: adv on wis, no attacks on you with adv (unless incapacitated)',
				],
			},
		},
		tiefling: {
			variant: {
				modifiers: [0, 0, 0, 1, 0, 2],
				skills: null,
				language: null,
				speed: null,
				extras: ["60' darkvision", 'fire res.', "devil's tongue or hellfire or winged"],
			},
			feral: {
				modifiers: [0, 2, 0, 1, 0, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ["60' darkvision", 'fire res.', "devil's tongue or hellfire or winged"],
			},
		},
		warforged: {
			envoy: {
				modifiers: [0, 0, 1, 0, 0, 0],
				skills: null,
				language: null,
				speed: null,
				extras: ['warforged resilience', "sentry's rest", 'integrated protection', '+1 tool', 'integrated tool'],
				select: [
					['skills', 1, 'all'],
					['language', 1, 'all'],
					['abilities', 2, ['strength', 'dexterity', 'intelligence', 'wisdom', 'charisma']],
				],
			},
			juggernaut: {
				modifiers: [2, 0, 1, 0, 0, 0],
				skills: null,
				language: null,
				speed: null,
				extras: [
					'warforged resilience',
					"sentry's rest",
					'integrated protection',
					'powerful build',
					'unarmed strike w/ extra damage (bludgeoning)',
				],
			},
			skirmisher: {
				modifiers: [0, 2, 1, 0, 0, 0],
				skills: null,
				language: null,
				speed: 35,
				extras: ['warforged resilience', "sentry's rest", 'integrated protection', 'light step'],
			},
		},
	},
};

export default CharacterRaceSubrace;
