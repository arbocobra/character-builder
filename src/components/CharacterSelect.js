import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import RaceSubrace from '../data/RaceSubrace';
import { Background } from '../data/Background';
import { updateRace, updateSubrace, updateBackground, updateSkills, updateLanguage, updateBonus } from '../characterFunctions';
import { characterOptions } from '../helperFunctions';

import { SelectRace } from './select/SelectRace';
import { SelectAbilities } from './select/SelectAbilities';
import { SelectClass } from './select/SelectClass';
import { SelectBackground } from './select/SelectBackground';
import { SelectOther } from './select/SelectOther';

const _ = require('lodash'); 

export const CharacterSelect = memo(function CharacterSelect(props) {
	const { updateCharacter, character } = props;
	const BackgroundObj = useRef(Background);
	const [selectionDetails, setSelectionDetails] = useState([]);

	// const updateRef = () => {CharacterRef.current = character};

	// const updateSelect = useCallback((val, cat, parent) => {
	// 	// const prevChar = {...character};
	// 	const charUpdate = {};
	// 	let selection_req = false;
	// 	let updateObject;
	// 	let update;
	// 	switch (cat) {
	// 		case 'race':
	// 			// updateObject = RaceObj.current.race[val]
	// 			// !!
	// 			console.log('1.')
	// 			console.log(RaceObj.race[val].modifiers)
	// 			updateObject = RaceObj.race[val]
	// 			update = updateRace(updateObject, val, CharacterRef.current);
	// 			Object.assign(charUpdate, update)
	// 			selection_req = Object.keys(updateObject).includes('select')
	// 			break;
	// 		case 'subrace':
	// 			updateObject = RaceObj.current.subrace[parent][val]
	// 			update = updateSubrace(updateObject, val, CharacterRef.current);
	// 			Object.assign(charUpdate, update)
	// 			selection_req = Object.keys(updateObject).includes('select')
	// 			break;
	// 		case 'background':
	// 			updateObject = BackgroundObj.current[val]
	// 			update = updateBackground(updateObject, val, CharacterRef.current)
	// 			Object.assign(charUpdate, update)
	// 			break;
	// 		case 'base':
	// 			update = {baseModifiers: val}
	// 			Object.assign(charUpdate, update)
	// 			break;
	// 		case 'level':
	// 			break;
	// 		case 'skills':
	// 			update = updateSkills(val, CharacterRef.current)
	// 			Object.assign(charUpdate, update)
	// 			break;	
	// 		case 'language':
	// 			update = updateLanguage(val, CharacterRef.current)
	// 			Object.assign(charUpdate, update)
	// 			break;
	// 		case 'bonusModifiers_race':
	// 			// update = updateBonus(val, CharacterRef.current, cat);
	// 			// !!
	// 			console.log('4.')
				
	// 			console.log(RaceObj.race.Changeling.modifiers)
	// 			console.log(CharacterRef.current.bonusModifiers_race)
	// 			CharacterRef.current.bonusModifiers_race[0] = 9
	// 			console.log(RaceObj.race.Changeling.modifiers)

	// 			update = updateBonus(val, CharacterRef.current, cat, RaceObj.race.Changeling);
	// 			Object.assign(charUpdate, update)
	// 			break;
	// 		default: {
	// 			console.log(cat)
	// 			console.log(val)
	// 		}
	// 	}
	// 	if (selection_req) {
	// 		// !!
	// 		console.log('2.')
	// 		console.log(RaceObj.race.Changeling.modifiers)
	// 		let selections = characterOptions(charUpdate, updateObject.select)
	// 		setSelectionDetails(selections)
	// 	}
	
	// 	updateCharacter(charUpdate);
	// 	// !!
	// 	console.log('3.')
	// 	console.log(RaceObj.race.Changeling.modifiers)
	// }, []);

	const selection_req = useRef(false)
	
	const updateSelect = useCallback((val, cat, parent) => {
		let update;
		const raceRef = {}
		if (cat === 'race') {
			Object.assign(raceRef, {...RaceSubrace.race[val]})
			update = updateRace(raceRef, val, {...character})
			if (_.has(raceRef, 'select')) selection_req.current = true;
			else selection_req.current = false;
			if (selection_req.current) {
				let selections = characterOptions(val, raceRef.select)
				setSelectionDetails(selections)
			} else setSelectionDetails([])
		}
		if (cat === 'bonusModifiers_race') {
			update = updateBonus(val, {...character}, cat);
		}
		// if (selection_req.current && cat === 'race') {
		// 	let selections = characterOptions(val, raceRef.select)
		// 	setSelectionDetails(selections)
		// } else setSelectionDetails([])
		updateCharacter(update)
	})


	return (
		<div className='stat-box select'>
			<SelectRace
				updateSelect={updateSelect}
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
});