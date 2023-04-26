import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { updateRace, updateSubrace, updateBackground, updateClass, updateSubclass, updateSelectedTraits, updateBaseAbilities, updateHitPoints, updateLevel, updateClassFeatures } from './utilities/characterFunctions';
import { characterOptions, getReferenceObject } from './utilities/helperFunctions';
import { ClassSpells } from './utilities/classFunctions';
import { SelectRace } from './select/SelectRace';
import { SelectAbilities } from './select/SelectAbilities';
import { SelectClass } from './select/SelectClass';
import { SelectBackground } from './select/SelectBackground';
import { SelectOther } from './select/SelectOther';

const _ = require('lodash'); 

export const CharacterSelect = (props) => {
// export const CharacterSelect = memo(function CharacterSelect(props) {
	const { updateCharacter, character } = props;
	
	const [selectionDetails, setSelectionDetails] = useState({});
	const [selectSpecial, setSelectSpecial] = useState([]);
	const selection_req = useRef(false)
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
		updateIntersect(changed, current);
	}

	const updateIntersect = (changed, current) => {
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
			getSpecial(current);
			// let ref = abilityScoreImprovements(current);
		}
		if (!_.isEmpty(update)) updateCharacter(update)
	}
	const getSpecial = (current) => {
		const level = current.level > 0 ? current.level : null;
		const charClass = current.class.length ? current.class : null;
		// if (level && charClass) {
		// 	console.log(ClassSpells[charClass].slice(1, level + 1))
		// }
	}

	const filterSelections = (...args) => {
		const [selectName, cat] = args;
		setSelectionDetails((current => {
			if (current[cat].length > 1) {
				let index = current[cat].findIndex(arr => arr[0] === selectName);
				let update = [...current[cat].slice(0,index), ...current[cat].slice(index + 1, current[cat].length)]
				return {...current, [cat]: update }
			} else {
				const copy = {...current};
				delete copy[cat];
				if (_.isEmpty(copy)) selection_req.current = false;
				return copy;
			}
		}))
	}

	const requiresOtherSelection = (cat, ref) => {
		if (_.has(ref, 'select')) {
			selection_req.current = true;
			let selections = characterOptions(ref.select);
			if (cat === 'subrace') cat = 'race'
			setSelectionDetails((current) => ({...current, [cat]: selections}))
		} else {
			setSelectionDetails((current) => {
				if (Object.keys(current).includes(cat)) {
					const copy = {...current};
					delete copy[cat];
					if (_.isEmpty(copy)) selection_req.current = false;
					return copy;
				} else return current;
			})
		}
	}

	// useEffect(() => limitSelections(document.querySelectorAll('.custom-dropdown'), selection_req.current, selectionDetails[0]), [selectionDetails])
	
	const updateSelect = useCallback((val, cat, ...extra) => {
		let update;
		let referenceData;
		if (cat === 'race' || cat === 'subrace') {
			referenceData = getReferenceObject(val, cat, extra[0])
			if (cat === 'race') update = updateRace(referenceData, val, characterRef.current)
			if (cat === 'subrace') {
				const parentRef = getReferenceObject(extra[0], 'race')
				update = updateSubrace(referenceData, val, characterRef.current, parentRef)
			}
		}
		else if (cat === 'background') {
			referenceData = getReferenceObject(val, cat);
			update = updateBackground(referenceData, val, characterRef.current);
		}
		else if (cat === 'base') {
			update = updateBaseAbilities(val, characterRef.current)
		}
		else if (cat === 'level') {
			update = updateLevel(val, characterRef.current)
		}
		else if (cat === 'class') {
			referenceData = getReferenceObject(val, cat);
			update = updateClass(referenceData, val, characterRef.current)
		}
		else if (cat === 'subclass') {
			update = {subclass: val}
		}
		else if (cat === 'abilities') {
			filterSelections(cat, extra[0]);
			update = updateSelectedTraits(val, 'abilities', characterRef.current, extra[0]);
		}
		else if (cat === 'language') {
			filterSelections(cat, extra[0]);
			update = updateSelectedTraits(val, 'languages', characterRef.current, extra[0]);
		}
		else if (cat === 'skills') {
			filterSelections(cat, extra[0]);
			update = updateSelectedTraits(val, 'skills', characterRef.current, extra[0]);
		}
		else if (cat === 'proficiencies') {
			filterSelections(cat, extra[0]);
			update = updateSelectedTraits(val, 'proficiencies', characterRef.current, extra[0], extra[1]);
		}
		else if (cat === 'hit-points') {
			update = updateHitPoints(val, characterRef.current);
		} 
		else if (cat === 'asi') {
			update = updateSelectedTraits(val, 'asi', characterRef.current);
		}
		else {
			console.log(val)
			console.log(cat)
		}
		if (['race', 'subrace', 'background', 'class'].includes(cat)) requiresOtherSelection(cat, referenceData)
		updateCharacter(update)
	}, [])

	return (
		<div className='stat-box'>
			<SelectRace updateSelect={updateSelect} />
			<SelectAbilities updateSelect={updateSelect} />
			<SelectClass updateSelect={updateSelect} />
			<SelectBackground updateSelect={updateSelect} />
			{ selection_req.current ? <SelectOther updateSelect={updateSelect} selectionDetails={selectionDetails}/> : null }
		</div>
	);
};