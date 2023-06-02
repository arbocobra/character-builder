import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { updateRace, updateSubrace, updateBackground, updateClass, updateSubclass, updateSelectedTraits, updateBaseAbilities, updateHitPoints, updateLevel, updateClassFeatures } from './utilities/characterFunctions';
import { characterOptions, getReferenceObject, characterSelections, smartCase } from './utilities/helperFunctions';
import { getClassFeaturesFunctions } from './utilities/classFunctions';
import { SelectRace } from './select/SelectRace';
import { SelectAbilities } from './select/SelectAbilities';
import { SelectClass } from './select/SelectClass';
import { SelectBackground } from './select/SelectBackground';
import { SelectOther } from './select/SelectOther';
import { SelectSpecial } from './select/SelectSpecial';
import { TestSpecial } from './select/testSpecial';
// import ClassSubclass from '../data/ClassSubclass';

const _ = require('lodash'); 

export const CharacterSelect = (props) => {
// export const CharacterSelect = memo(function CharacterSelect(props) {
	const { updateCharacter, character } = props;
	
	const [selectionDetails, setSelectionDetails] = useState({});
	// const [selectSpecial, setSelectSpecial] = useState([]);
	const selection_req = useRef(false)
	const characterRef = useRef()	
	const prevChar = useRef()

	// const [singleSelect, setSingleSelect] = useState([])
	// const [listSelect, setListSelect] = useState([])
	const [selectSpecial, setSelectSpecial] = useState({race: {}, class: {}, background: {}});
	const selectRef = useRef()

	const selectRefAlt = useRef({race: false, class: false, background: false})

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
				if (cat === 'proficiencies') {
					if (_.some(current[cat].total, (el,key) => !_.isEqual(el, prev[cat].total[key]))) {
						changed.push(cat);
					}
				} else if (['class_feature_special', 'class_spellcasting'].includes(cat)) {
					if (!_.isEqual(_.values(current[cat]), _.values(prev[cat]))) changed.push(cat);
				} else {
					if (!_.isEqual(current[cat].total, prev[cat].total)) changed.push(cat);
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
		if (_.intersection(changed, ['abilities', 'speed']).length) {
			if (current.class.length && current.level > 0) {
				let ref = getReferenceObject(current.class, 'class')
				const featObjs = getClassFeaturesFunctions(current, ref);
				// console.log(featObjs)
				getFeatSpecial(featObjs)
			}
		}
		// if (_.intersection(changed, ['level', 'class']).length) {
		// 	let result = updateClassFeatures(current)
		// 	if (result) Object.assign(update, result)
		// 	getSpecial(current);
		// 	if (current.class.length && current.level > 0) {
		// 		let ref = getReferenceObject(current.class, 'class')
		// 		const featObjs = getClassFeaturesFunctions(current, ref)
		// 		getFeatSpecial(featObjs)
		// 	}
		// }
		// if (current.class.length && current.level > 0) {
			// let ref = getReferenceObject(current.class, 'class')
			// changedList [class,level,speed,armor,languages,abilities,skills]
			// getClassFeaturesFunctions(current, ref)
		// }
		
		if (!_.isEmpty(update)) updateCharacter(update)
	}

	const getFeatSpecial = (arr) => {
		let update = {}
		if (!_.isEmpty(arr[0])) update.class_feature_special = arr[0]
		if (!_.isEmpty(arr[1])) console.log(arr[1])
		if (!_.isEmpty(arr[2])) update.class_spellcasting = arr[2]
		console.log(update)
		// let update = {}
		updateCharacter(update)
	}
	const getSpecial = (current) => {
		const level = current.level > 0 ? current.level : null;
		const charClass = current.class.length ? current.class : null;
		// if (level && charClass) {
		// 	console.log(ClassSpells[charClass].slice(1, level + 1))
		// }
	}

	// const filterSelections = (...args) => {
	// 	const [selectName, cat] = args;
	// 	setSelectionDetails((current => {
	// 		if (current[cat].length > 1) {
	// 			let index = current[cat].findIndex(arr => arr[0] === selectName);
	// 			let update = [...current[cat].slice(0,index), ...current[cat].slice(index + 1, current[cat].length)]
	// 			return {...current, [cat]: update }
	// 		} else {
	// 			const copy = {...current};
	// 			delete copy[cat];
	// 			if (_.isEmpty(copy)) selection_req.current = false;
	// 			return copy;
	// 		}
	// 	}))
	// }

	const clearSelections = (cat) => {
		setSelectSpecial(current => {
			let currentCopy = {...current}
			currentCopy[cat] = {};
			selectRef.current = null;
			if (_.every(currentCopy, (el => _.isEmpty(el)))) {
				selection_req.current = false
			}
			return currentCopy
		})
	}

	// useEffect(() => {
	// 	if (Object.keys(selectSpecial).every(cat => _.isEmpty(selectSpecial[cat]))) {
	// 		selection_req.current = false
	// 	}
	// }, [selectSpecial])

	// const clearOtherSelection = (cat) => {
	// 	// if (!_.isEmpty(selectSpecial[cat])) setSelectSpecial((current) => ({...current, [cat]: {}}))
	// 	setSelectSpecial((current) => ({...current, [cat]: {}}))
	// 	selection_req.current = false;
	// }

	const requiresOtherSelection = (val, cat, ref) => {
		if (ref.select) {
			if (cat === 'subrace') cat = 'race'
			const selection = characterSelections(val, cat)
			// setSingleSelect(selection.multi)
			// setListSelect(selection.direct)
			setSelectSpecial((current) => ({...current, [cat]: selection}))
			selection_req.current = true;
			selectRef.current = cat;
		} else selection_req.current = false;
		// if (_.has(ref, 'select')) {
		// 	selection_req.current = true;
		// 	let selections = characterOptions(ref.select, [ref?.proficiencies, characterRef.current.proficiencies]);
		// 	if (cat === 'subrace') cat = 'race'
		// 	setSelectionDetails((current) => ({...current, [cat]: selections}))
		// } else {
		// 	setSelectionDetails((current) => {
		// 		if (Object.keys(current).includes(cat)) {
		// 			const copy = {...current};
		// 			delete copy[cat];
		// 			if (_.isEmpty(copy)) selection_req.current = false;
		// 			return copy;
		// 		} else return current;
		// 	})
		// }
	}
	// const requiresOtherSelectionAlt = (val, cat, ref) => {
	// 	if (ref.select) {
	// 		if (cat === 'subrace') cat = 'race'
	// 		const selection = characterSelections(val, cat)
	// 		// if (selectRefAlt.current[cat])
	// 		setSelectSpecial((current) => ({...current, [cat]: selection}))
	// 		// selectRefAlt.current[cat] = 
	// 		selection_req.current = true;
	// 		selectRef.current = cat;
	// 	} else selection_req.current = false;
	// }

	// useEffect(() => console.log(selectSpecial), [selectSpecial])

	const classFeatureSelect = (update, ref) => {
		if (characterRef.current.level > 0) {
			const current = JSON.parse(JSON.stringify(characterRef.current))
			Object.assign(current, update)
			// console.log(current)
			return getClassFeaturesFunctions(current, ref)
		} else return null
	}
	const levelFeatureSelect = (update) => {
		if (characterRef.current.class.length) {
			const current = JSON.parse(JSON.stringify(characterRef.current))
			Object.assign(current, update)
			const ref = getReferenceObject(current.class, 'class');
			// console.log(ref)
			return getClassFeaturesFunctions(current, ref)
		} else return null
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
			const feats = levelFeatureSelect(update)
			if (feats) {
				update.class_feature_special = feats[1];
				if (!_.isEmpty(feats[2])) update.class_spellcasting = feats[2]
				console.log(feats[0])
			}
		}
		else if (cat === 'class') {
			referenceData = getReferenceObject(val, cat);
			update = updateClass(referenceData, val, characterRef.current)
			const feats = classFeatureSelect(update, referenceData)
			if (feats) {
				update.class_feature_special = feats[1];
				if (!_.isEmpty(feats[2])) update.class_spellcasting = feats[2]
				console.log(feats[0])
			}		
		}
		else if (cat === 'subclass') {
			update = {subclass: val}
		}
		// else if (cat === 'abilities') {
		// 	filterSelections(cat, extra[0]);
		// 	update = updateSelectedTraits(val, 'abilities', characterRef.current, extra[0]);
		// }
		// else if (cat === 'language') {
		// 	filterSelections(cat, extra[0]);
		// 	update = updateSelectedTraits(val, 'languages', characterRef.current, extra[0]);
		// }
		else if (cat === 'skills') {
			update = updateSelectedTraits(val, 'skills', characterRef.current, extra[0]);
		}
		// else if (cat === 'proficiencies') {
		// 	// filterSelections(cat, extra[0]);
		// 	update = updateSelectedTraits(val, 'proficiencies', characterRef.current, extra[0], extra[1]);
		// }
		else if (cat === 'equipment') {
			update = updateSelectedTraits(val, 'equipment', characterRef.current, extra[0], extra[1]);
		}
		else if (['abilities','language','proficiencies','equipment'].includes(cat)) {
			console.log(val)
			console.log(cat)
			console.log(extra)
			// extra.forEach(el => console.log(el))
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
		// if (['race', 'subrace', 'background', 'class'].includes(cat)) requiresOtherSelection(cat, referenceData)
		if (['race', 'subrace', 'background', 'class'].includes(cat)) requiresOtherSelection(val, cat, referenceData)
		// if (cat === 'level' && characterRef.current.class.length) requiresOtherSelection(cat, referenceData)
		updateCharacter(update)
	}, [])

	

	return (
		<div className='stat-box'>
			<SelectRace updateSelect={updateSelect} />
			<SelectAbilities updateSelect={updateSelect} />
			<SelectClass updateSelect={updateSelect} />
			<SelectBackground updateSelect={updateSelect} />
			{ selection_req.current ? <TestSpecial selectSpecial={selectSpecial} updateSelect={updateSelect} selectRef={selectRef.current} clearSelections={clearSelections} /> : null }
			{/* { selection_req.current ? <SelectOther updateSelect={updateSelect} selectionDetails={selectionDetails}/> : null } */}
			{/* { selection_req.current ? <SelectSpecial selectSpecial={selectSpecial} updateSelect={updateSelect} selectRef={selectRef.current} /> : null } */}
		</div>
	);
};