import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
// import RaceSubrace from '../data/RaceSubrace';
import { Background } from '../data/Background';
import { updateRace, updateSubrace, updateBackground, updateSelectedTraits, updateBaseAbilities } from '../characterFunctions';
import { characterOptions, getReferenceObject } from '../helperFunctions';

import { SelectRace } from './select/SelectRace';
import { SelectAbilities } from './select/SelectAbilities';
import { SelectClass } from './select/SelectClass';
import { SelectBackground } from './select/SelectBackground';
import { SelectOther } from './select/SelectOther';

const _ = require('lodash'); 

export const CharacterSelect = memo(function CharacterSelect(props) {
	const { updateCharacter, character } = props;
	
	const [selectionDetails, setSelectionDetails] = useState(['',[]]);

	const selection_req = useRef(false)

	useEffect(() => {
		characterRef.current = {...character};
	}, [character])
	const characterRef = useRef({...character})
	
	
	const updateSelect = useCallback((val, cat, parent) => {
		let update;
		if (cat === 'race' || cat === 'subrace') {
			const raceRef = getReferenceObject(val, cat, parent)
			// console.log(character);
			// console.log(characterRef.current);
			if (_.has(raceRef, 'select')) selection_req.current = true;
			else selection_req.current = false;
			if (cat === 'race') update = updateRace(raceRef, val, characterRef.current)
			if (cat === 'subrace') update = updateSubrace(raceRef, val, characterRef.current)
			if (selection_req.current) {
				let selections = characterOptions(val, raceRef.select)
				setSelectionDetails(['race', selections])
			} else setSelectionDetails(['', []])
		}
		else if (cat === 'background') {
			const backgroundRef = getReferenceObject(val, cat);
			if (backgroundRef.language > 0) selection_req.current = true;
			else selection_req.current = false;
			update = updateBackground(backgroundRef, val, characterRef.current);
			if (selection_req.current) {
				let selections = characterOptions(val, [['language', backgroundRef.language, 'ALL'],])
				setSelectionDetails(['background', selections])
			} else setSelectionDetails(['', []])
		}
		else if (cat === 'base') {
			update = updateBaseAbilities(val, characterRef.current)
		}
		else if (cat === 'level') {
			const bonus = Math.ceil(val / 4) + 1
			update = {
				level: val,
				proficiency_bonus: bonus,
			}
		}
		else if (cat === 'bonusModifiers_race') {
			update = updateSelectedTraits(val, 'abilities', characterRef.current, parent);			
		}
		else if (cat === 'language') {
			update = updateSelectedTraits(val, 'languages', characterRef.current, parent);
			
		}
		else if (cat === 'skills') {
			update = updateSelectedTraits(val, 'skills', characterRef.current, parent);
		}
		else {
			console.log(val)
			console.log(cat)
		}

		updateCharacter(update)
	}, [])


	return (
		<div className='stat-box select'>
			<SelectRace
				updateSelect={updateSelect}
			/>
			<SelectAbilities updateSelect={updateSelect} />
			<SelectClass updateSelect={updateSelect} />
			<SelectBackground
				updateSelect={updateSelect}
			/>
			<SelectOther
				updateSelect={updateSelect}
				selectionDetails={selectionDetails}
			/>
		</div>
	);
});

