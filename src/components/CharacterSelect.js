import React, { useState, useEffect, useRef, useCallback } from 'react';
import RaceSubrace from '../data/RaceSubrace';
import { Background } from '../data/Background';
// import { language, skills } from '../CharacterDetails';
import { updateRace, updateSubrace, updateBackground, updateSkills, updateLanguage, updateBonus } from '../characterFunctions';
import { characterOptions } from '../helperFunctions';

import { SelectRace } from './select/SelectRace';
import { SelectAbilities } from './select/SelectAbilities';
import { SelectClass } from './select/SelectClass';
import { SelectBackground } from './select/SelectBackground';
import { SelectOther } from './select/SelectOther';

export const CharacterSelect = (props) => {
	const { updateCharacter, character } = props;

	const RaceObj = useRef(RaceSubrace);
	const BackgroundObj = useRef(Background);
	// const LanguageObj = useRef(language);

	const CharacterRef = useRef();

	const [selectionDetails, setSelectionDetails] = useState([]);

	useEffect(() => {CharacterRef.current = character}, [character])

	// const updateRef = () => {CharacterRef.current = character};

	const updateSelect = useCallback((val, cat, parent) => {
		// const prevChar = {...character};
		const charUpdate = {};
		let selection_req = false;
		let updateObject;
		let update;
		switch (cat) {
			case 'race':
				updateObject = RaceObj.current.race[val]
				update = updateRace(updateObject, val, character);
				Object.assign(charUpdate, update)
				selection_req = Object.keys(updateObject).includes('select')
				break;
			case 'subrace':
				updateObject = RaceObj.current.subrace[parent][val]
				update = updateSubrace(updateObject, val, CharacterRef.current);
				Object.assign(charUpdate, update)
				selection_req = Object.keys(updateObject).includes('select')
				break;
			case 'background':
				updateObject = BackgroundObj.current[val]
				update = updateBackground(updateObject, val, CharacterRef.current)
				Object.assign(charUpdate, update)
				break;
			case 'base':
				update = {baseModifiers: val}
				Object.assign(charUpdate, update)
				break;
			case 'level':
				break;
			case 'skills':
				update = updateSkills(val, CharacterRef.current)
				Object.assign(charUpdate, update)
				break;	
			case 'language':
				update = updateLanguage(val, CharacterRef.current)
				Object.assign(charUpdate, update)
				break;
			case 'bonusModifiers_race':
				update = updateBonus(val, CharacterRef.current, cat);
				Object.assign(charUpdate, update)
				break;
			default: {
				console.log(cat)
				console.log(val)
			}
		}
		if (selection_req) {
			let selections = characterOptions(charUpdate, updateObject.select)
			setSelectionDetails(selections)
		}
	
		updateCharacter(charUpdate);
	}, []);


	return (
		<div className='stat-box select'>
			<SelectRace
				updateSelect={updateSelect}
				RaceObj={RaceObj.current}
			/>
			<SelectAbilities updateSelect={updateSelect} />
			<SelectClass updateSelect={updateSelect} />
			<SelectBackground
				updateSelect={updateSelect}
				BackgroundObj={BackgroundObj.current}
			/>
			<SelectOther
				updateSelect={updateSelect}
				selectionDetails={selectionDetails}
			/>
		</div>
	);
};
