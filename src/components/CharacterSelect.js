import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { updateRace, updateSubrace, updateBackground, updateClass, updateSubclass, updateSelectedTraits, updateBaseAbilities, updateHitPoints, updateLevel, updateClassFeatures, updateArmor } from './utilities/characterFunctions';
import { getReferenceObject, characterSelections, smartCase, unarmoredDefenseUpdate } from './utilities/helperFunctions';
import { getClassFeaturesFunctions } from './utilities/classFunctions';
import { SelectRace } from './select/SelectRace';
import { SelectAbilities } from './select/SelectAbilities';
import { SelectClass } from './select/SelectClass';
import { SelectBackground } from './select/SelectBackground';
import { SelectAdditional } from './select/SelectAdditional';
// import ClassSubclass from '../data/ClassSubclass';

const _ = require('lodash'); 

export const CharacterSelect = (props) => {
// export const CharacterSelect = memo(function CharacterSelect(props) {
	const { updateCharacter, character } = props;
	const selection_req = useRef(false)
	const characterRef = useRef()	
	const prevChar = useRef()
	const [selectSpecial, setSelectSpecial] = useState({race: {}, class: {}, background: {}});
	const selectRef = useRef()

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
				if (['proficiencies', 'equipment'].includes(cat)) {
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
		if (_.intersection(changed, ['class', 'abilities']).length) {
			if (current.armor_class.base !== null) {
				let result = updateArmor(current)
				if (result) Object.assign(update, result)
			}
		}
		if (_.intersection(changed, ['abilities', 'speed', 'saving_throws', 'armor_class']).length) {
			console.log('Values affected by class features')
			// if (current.class.length && current.level > 0) {
			// 	let ref = getReferenceObject(current.class, 'class')
			// 	const featObjs = getClassFeaturesFunctions(current, ref);
			// 	// console.log(featObjs)
			// 	getFeatSpecial(featObjs)
			// }
		}
		
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
	}

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
	
	const updateSelectArray = (val, cat) => {
		let currentCopy = JSON.parse(JSON.stringify(characterRef.current))
		if (cat[0][1] === cat[1][1]) {
			cat.forEach((el,i) => {
				let trait = el[1]
				let subtrait = el[2]
				let charCat = el[0]
				let result = updateSelectedTraits([val[i]], trait, currentCopy, charCat, subtrait);
				currentCopy[trait][charCat][subtrait] = result[trait][charCat][subtrait]
				currentCopy[trait].total = result[trait].total
			})
			let update = {[cat[0][1]]: currentCopy[cat[0][1]]}
			console.log(update)
			updateCharacter(update)
		} else {
			let update = {};
			cat.forEach(el => {
				let trait = el[1]
				let subtrait = el[2]
				let charCat = el[0]
				let result = updateSelectedTraits(val, trait, currentCopy, charCat, subtrait);
				Object.assign(update, result)
				console.log(update)
				updateCharacter(update)
			})
		}
	}

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
				// console.log(feats[1])
				// console.log(feats[2])
				// console.log(feats[3])
			}
		}
		else if (cat === 'class') {
			referenceData = getReferenceObject(val, cat);
			update = updateClass(referenceData, val, characterRef.current)
			const feats = classFeatureSelect(update, referenceData)
			if (feats) {
				update.class_feature_special = feats[1];
				if (!_.isEmpty(feats[2])) update.class_spellcasting = feats[2]
				// if (!_.isEmpty(feats[0])) {
				// 	const featResults = 
				// }
				// console.log(feats[0])
				
				// Object.keys(feats[0]).forEach(val => {
				// 	console.log(feats[0][val][0](...feats[0][val][1]))
				// })
				// console.log(feats[1])
				// console.log(feats[2])
				// console.log(feats[3])
			}		
		}
		else if (cat === 'subclass') {
			update = {subclass: val}
		}
		else if (['abilities','languages','skills'].includes(cat)) {
			update = updateSelectedTraits(val, cat, characterRef.current, extra[0]);
		}
		else if (['proficiencies','equipment'].includes(cat)) {
			update = updateSelectedTraits(val, cat, characterRef.current, extra[0], extra[1]);
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
			{ selection_req.current ? <SelectAdditional selectSpecial={selectSpecial} updateSelect={updateSelect} updateSelectArray={updateSelectArray} selectRef={selectRef.current} clearSelections={clearSelections} /> : null }
		</div>
	);
};