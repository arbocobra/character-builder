import React, { useState, useEffect, useRef, useCallback, memo, createElement } from 'react';
import { updateRace, updateSubrace, updateBackground, updateClass, updateSubclass, updateSelectedTraits, updateBaseAbilities, updateHitPoints } from './utilities/characterFunctions';
import { characterOptions, getReferenceObject } from './utilities/helperFunctions';
import { limitSelections } from './utilities/selectFunctions';
import { SelectRace } from './select/SelectRace';
import { SelectAbilities } from './select/SelectAbilities';
import { SelectClass } from './select/SelectClass';
import { SelectBackground } from './select/SelectBackground';
import { SelectOther } from './select/SelectOther';

const _ = require('lodash'); 

function usePrevious(value, name) {
	const ref = useRef();
	useEffect(() => {
	  ref.current = value;
	},[value]);
	return ref.current;
 }

export const CharacterSelect = memo(function CharacterSelect(props) {
	const { updateCharacter, character } = props;
	
	const [selectionDetails, setSelectionDetails] = useState(['',[]]);
	const selection_req = useRef(false)
	const selection_arr = useRef([])
	const characterRef = useRef()	
	const [char, setChar] = useState(character);

	useEffect(() => setChar(character), [character])

	// 👇 look here
	const prevChar = usePrevious(char, 'main')	

	useEffect(() => {
		characterRef.current = {...character}
	}, [character])

	const updateConnectedTraits = (update) => {
		const current = characterRef.current
		let updateArr = Object.keys(update)
		const results = {};
		if (!_.isEmpty(_.intersection(updateArr, ['abilities', 'level', 'hit_dice']))) {
			if (!_.isEmpty(current.hp_selection)) {
				let hpUpdate = updateHitPoints(current.hp_selection, current);
				Object.assign(results, hpUpdate)
			}
		}
		return results;
	}

	const filterSelections = (cat) => {
		_.remove(selection_arr.current, (el => el === cat))
		if (_.isEmpty(selection_arr.current)) {
			selection_req.current = false;
			confirmSelections();
		}
	}
	
	const checkSelection = (ref) => {
		if (_.has(ref, 'select')) selection_req.current = true;
		else selection_req.current = false;
	}

	const confirmSelections = (val, cat, ref) => {
		if (selection_req.current) {
			let selections = characterOptions(val, ref)
			setSelectionDetails([cat, selections])
			selection_arr.current = ref.map(arr => arr[0])
		} else setSelectionDetails(['', []])
	}

	useEffect(() => {
		let menus = document.querySelectorAll('.custom-dropdown');
		let bool = selection_req.current;
		limitSelections(menus, bool, selectionDetails[0])
	}, [selectionDetails])
	
	const updateSelect = useCallback((val, cat, parent) => {
		let update;
		if (cat === 'race' || cat === 'subrace') {
			const raceRef = getReferenceObject(val, cat, parent)
			checkSelection(raceRef)
			confirmSelections(val, 'race', raceRef.select)
			if (cat === 'race') update = updateRace(raceRef, val, characterRef.current)
			if (cat === 'subrace') {
				const parentRef = getReferenceObject(parent, 'race')
				update = updateSubrace(raceRef, val, characterRef.current, parentRef)
			}
		}
		else if (cat === 'background') {
			const backgroundRef = getReferenceObject(val, cat);
			if (backgroundRef.language > 0) selection_req.current = true;
			else selection_req.current = false;
			confirmSelections(val, 'background', [['language', backgroundRef.language, 'ALL']])
			update = updateBackground(backgroundRef, val, characterRef.current);
		}
		else if (cat === 'base') {
			update = updateBaseAbilities(val, characterRef.current)
		}
		else if (cat === 'level') {
			const bonus = Math.ceil(val / 4) + 1
			update = {
				level: Number(val),
				proficiency_bonus: bonus,
			}
		}
		else if (cat === 'class') {
			const classRef = getReferenceObject(val, cat);
			checkSelection(classRef)
			confirmSelections(val, 'class', classRef.select)
			update = updateClass(classRef, val, characterRef.current)
		}
		else if (cat === 'subclass') {
			update = {subclass: val}
		}
		else if (cat === 'abilities') {
			filterSelections(cat);
			update = updateSelectedTraits(val, 'abilities', characterRef.current, parent);			
		}
		else if (cat === 'language') {
			filterSelections(cat);
			update = updateSelectedTraits(val, 'languages', characterRef.current, parent);
		}
		else if (cat === 'skills') {
			filterSelections(cat);
			update = updateSelectedTraits(val, 'skills', characterRef.current, parent);
		}
		else if (cat === 'hit-points') {
			if (characterRef.current.abilities.base.length) {
				update = updateHitPoints(val, characterRef.current);
			} else update = { hp_selection: val }
		}
		else {
			console.log(val)
			console.log(cat)
		}
		let addition = updateConnectedTraits(update)
		if (!_.isEmpty(addition)) Object.assign(update, addition)
		updateCharacter(update)
	}, [])

	


	return (
		<div className='stat-box select'>
			<SelectRace updateSelect={updateSelect} />
			<SelectAbilities updateSelect={updateSelect} />
			<SelectClass updateSelect={updateSelect} />
			<SelectBackground updateSelect={updateSelect} />
			<SelectOther updateSelect={updateSelect} selectionDetails={selectionDetails} />
			{/* <Counter val={0} arr={character.abilities.total} /> */}
		</div>
	);
});

// function usePrevious(value) {
// 	const ref = useRef();
// 	useEffect(() => {
// 	  ref.current = value;
// 	},[value]);
// 	return ref.current;
//  }
 
 // the App where the hook is used 
 function Counter(props) {
	const {val, arr} = props;
	
	const [char, setChar] = useState(arr);
	const prevRef = useRef()
	

	useEffect(() => setChar(arr), [arr])

	// 👇 look here
	
	const prevChar = usePrevious(char, 'count')
	prevRef.current = prevChar;
 
	return (<div>
		{/* <h1>Now: {count}, before: {prevCount}</h1> */}
		<h1>Now: {char}, before: {prevChar}</h1>
		{/* <button onClick={() => setCount((curr) => curr + 1)}>Click</button> */}
	</div>);
 }