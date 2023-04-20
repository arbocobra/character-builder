import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { updateRace, updateSubrace, updateBackground, updateClass, updateSubclass, updateSelectedTraits, updateBaseAbilities, updateHitPoints, updateLevel, updateClassFeatures } from './utilities/characterFunctions';
import { characterOptions, getReferenceObject, updateConnectedTraits } from './utilities/helperFunctions';
import { abilityScoreImprovements } from './utilities/classFunctions';
import { limitSelections } from './utilities/selectFunctions';
import { SelectRace } from './select/SelectRace';
import { SelectAbilities } from './select/SelectAbilities';
import { SelectClass } from './select/SelectClass';
import { SelectBackground } from './select/SelectBackground';
import { SelectOther } from './select/SelectOther';

const _ = require('lodash'); 

export const CharacterSelect = (props) => {
// export const CharacterSelect = memo(function CharacterSelect(props) {
	const { updateCharacter, character } = props;
	
	const [selectionDetails, setSelectionDetails] = useState(['',[]]);
	const selection_req = useRef(false)
	const selection_arr = useRef([])
	const characterRef = useRef()	
	const prevChar = useRef()


	useEffect(() => {
		prevChar.current = characterRef.current;
		characterRef.current = {...character}
		if (_.isObject(prevChar.current)) {
			versionCompare()
		}
	}, [character])

	const versionCompare = () => {
		const changed = []
		const current = characterRef.current;
		const prev = prevChar.current;
		Object.keys(current).forEach(cat => {
			if (_.isArray(current[cat])) {
				if (!_.isEqual(current[cat], prev[cat])) changed.push(cat);
			} else if (_.isObject(current[cat])) {
				if (_.has(current[cat], 'total')) {
					if (!_.isEqual(current[cat].total, prev[cat].total)) changed.push(cat);
				} else {
					if (_.some(current[cat], (el, key) => el.total !== prev[cat][key].total)) changed.push(cat);
				}
			} else if (current[cat] !== prev[cat]) changed.push(cat);
		})
		// console.log(changed)
		const update = {}
		if (_.intersection(changed, ['class', 'abilities', 'level']).length) {
			let result = updateHitPoints(null, current)
			if (result) Object.assign(update, result)
			// console.log(update)
		}
		if (_.intersection(changed, ['level', 'class']).length) {
			let result = updateClassFeatures(current)
			if (result) Object.assign(update, result)
			let ref = abilityScoreImprovements(current);
			// if (ref.select.length) confirmSelections('class', ref)
			// console.log(update)
		}
		if (!_.isEmpty(update)) updateCharacter(update)
	}



	const filterSelections = (cat) => {
		_.remove(selection_arr.current, (el => el === cat))
		if (_.isEmpty(selection_arr.current)) {
			selection_req.current = false;
			confirmSelections();
		}
	}

	const confirmSelections = (cat, ref) => {
		if (_.has(ref, 'select')) {
			
			selection_req.current = true;
			let selections = characterOptions(ref.select)
			setSelectionDetails([cat, selections])
			selection_arr.current = ref.select.map(arr => arr[0])
		} else {
			selection_req.current = false;
			setSelectionDetails(['', []])
		}
	}

	// useEffect(() => limitSelections(document.querySelectorAll('.custom-dropdown'), selection_req.current, selectionDetails[0]), [selectionDetails])
	
	const updateSelect = useCallback((val, cat, ...extra) => {
		let update;
		if (cat === 'race' || cat === 'subrace') {
			const raceRef = getReferenceObject(val, cat, extra[0])
			confirmSelections('race', raceRef)
			if (cat === 'race') update = updateRace(raceRef, val, characterRef.current)
			if (cat === 'subrace') {
				const parentRef = getReferenceObject(extra[0], 'race')
				update = updateSubrace(raceRef, val, characterRef.current, parentRef)
			}
		}
		else if (cat === 'background') {
			const backgroundRef = getReferenceObject(val, cat);
			confirmSelections('background', backgroundRef)
			update = updateBackground(backgroundRef, val, characterRef.current);
		}
		else if (cat === 'base') {
			update = updateBaseAbilities(val, characterRef.current)
		}
		else if (cat === 'level') {
			update = updateLevel(val, characterRef.current)
		}
		else if (cat === 'class') {
			const classRef = getReferenceObject(val, cat);
			confirmSelections('class', classRef)
			update = updateClass(classRef, val, characterRef.current)
		}
		else if (cat === 'subclass') {
			update = {subclass: val}
		}
		else if (cat === 'abilities') {
			filterSelections(cat);
			update = updateSelectedTraits(val, 'abilities', characterRef.current, extra[0]);
		}
		else if (cat === 'language') {
			filterSelections(cat);
			update = updateSelectedTraits(val, 'languages', characterRef.current, extra[0]);
		}
		else if (cat === 'skills') {
			filterSelections(cat);
			update = updateSelectedTraits(val, 'skills', characterRef.current, extra[0]);
		}
		else if (cat === 'proficiencies') {
			filterSelections(cat);
			update = updateSelectedTraits(val, 'proficiencies', characterRef.current, extra[0], extra[1]);
		}
		else if (cat === 'hit-points') {
			update = updateHitPoints(val, characterRef.current);
			// if (characterRef.current.abilities.base.length) {
			// 	update = updateHitPoints(val, characterRef.current);
			// } else update = {hp_selection: val}
		}
		else {
			console.log(val)
			console.log(cat)
		}
		// let addition = updateConnectedTraits(update, characterRef.current)
		// if (!_.isEmpty(addition)) Object.assign(update, addition)
		updateCharacter(update)
	}, [])

	return (
		<div className='stat-box select'>
			<SelectRace updateSelect={updateSelect} />
			<SelectAbilities updateSelect={updateSelect} />
			<SelectClass updateSelect={updateSelect} />
			<SelectBackground updateSelect={updateSelect} />
			<SelectOther updateSelect={updateSelect} selectionDetails={selectionDetails} />
		</div>
	);
};