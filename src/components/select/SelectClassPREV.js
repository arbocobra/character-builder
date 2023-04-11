import React, { useState, useEffect, useRef, memo } from 'react';
import { addDropdownEvent, addOptionEvent } from '../utilities/selectFunctions'
import { clearSelection, resetSub } from '../utilities/selectFunctions'
import CharacterClassSubclass from '../../data/ClassSubclass';
import { Dropdown } from '../Dropdown';

export const SelectClassPREV = memo(function SelectClassPREV(props) {
	const { updateSelect } = props;

	const [levelSelect, setLevelSelect] = useState(0);
	const [classSelect, setClassSelect] = useState(null);
	const [subclassInput, setSubclassInput] = useState([])
	const [subclassSelect, setSubclassSelect] = useState(null);

	// const classObj = useRef(CharacterClassSubclass.class)
	const classObj = useRef(null)
	const initialOption = useRef('-- select --');

	const subInput = useRef([]);
	const subValid = useRef(false)

	const canSelectSub = useRef(false)
	
	const parentRef = useRef();
	const levelRef = useRef(0);
	const classRef = useRef();
	const subclassRef = useRef();

	const levelNum = [...Array(20).keys()].map(el => el + 1);
	const classTitles = Object.keys(CharacterClassSubclass.class)
	const dropdownCat = ['level', 'class', 'subclass'];

	useEffect(() => document.getElementById('select-level').children[0].classList.add('small'), [])



	// useEffect(() => {
	// 	const div = parentRef.current;
	// 	const divArr = div.querySelectorAll('.custom-dropdown')
	// 	for (let i = 0; i < divArr.length; i++) {
	// 		addDropdownEvent(divArr[i])
	// 	}
	// 	for (let i = 0; i < 2; i++) {
	// 		addOptionEvent(divArr[i], handleSelect, [dropdownCat[i]])
	// 	}
	// }, []);

	// const subclassAvailable = () => {
	// 	if (!classSelect || levelSelect < 1) return false;
	// 	else return levelSelect >= classObj.current.subLevel
	// }

	// const resetSubclass = () => {
	// 	subclassRef.current.children[0].childNodes[0].nodeValue = initialOption.current;
	// 	setSubclassSelect(null)
	// 	updateSelect('', 'subclass');
	// }

	// useEffect (() => {
	// 	if (classSelect) { 
	// 		let subResult = subclassAvailable()
	// 		if (subResult) {
	// 			setSubclassInput(classObj.current[classSelect].subArray);
	// 		} else {
	// 			if (subclassSelect) resetSubclass()
	// 		}	
	// 	}
	// }, [classSelect, levelSelect])

	const handleSelect = (val, cat) => {
		if (cat === 'level') {
			let num = Number(val)
			// if (classSelect) {
			// 	if (num >= classObj.current.subLevel) {
			// 		subValid.current = true;
			// 		subInput.current = classObj.current.subArray
			// 	} else {
			// 		subValid.current = false;
			// 		subInput.current = [];
			// 	}
			// }
			// levelRef.current = num
			setLevelSelect(num);
		} else if (cat === 'class') {
			classObj.current = CharacterClassSubclass.class[val];
			if (subclassInput.length) resetSub(classRef.current, setSubclassInput, initialOption.current, canSelectSub.current, 2)
			// if (levelRef.current > 0) {
			// 	if (levelRef.current >= classObj.current.subLevel) {
			// 		subValid.current = true;
			// 		subInput.current = classObj.current.subArray
			// 	} else {
			// 		subValid.current = false;
			// 		subInput.current = [];
			// 	}
			// }
			setClassSelect(val)
		} else if (cat === 'subclass') {
			setSubclassSelect(val)
		}
	}

	// useEffect(() => {
	// 	if (levelSelect > 0) {
	// 		updateSelect(levelSelect, 'level')};
	// }, [levelSelect]);

	// 	useEffect(() => {
	// 	if (classSelect) {
	// 		updateSelect(classSelect, 'class');
			
	// 	}
	// }, [classSelect]);

	useEffect(() => {
		if (levelSelect > 0) updateSelect(levelSelect, 'level');
		if (classSelect) updateSelect(classSelect, 'class');
		if (classSelect && subclassSelect) clearSelection(setSubclassSelect)
		if (classSelect && levelSelect) {
			let levelMin = classObj.current.subLevel;
			if (levelSelect >= levelMin) {
				canSelectSub.current = true;
				setSubclassInput(classObj.current.subArray);
			} else {
				setSubclassInput([]);
				canSelectSub.current = false;
			}
		}
	}, [levelSelect, classSelect]);



	// useEffect (() => {
	// 	if (subclassInput.length) {
	// 		subclassRef.current.classList.remove('hidden');
	// 		addOptionEvent(subclassRef.current, handleSelect, ['subclass'])
	// 	} else subclassRef.current.classList.add('hidden');
	// }, [subclassInput])

	useEffect(() => {
		if (subclassSelect) updateSelect(subclassSelect, 'subclass', classSelect);
	}, [subclassSelect]);

	

	return (
		<div className="stat-input-container class">
			<div id="SelectClass" ref={classRef} className="stat-input">
				<p className='section-title'>Select Class</p>
				<Dropdown cat='level' handleSelect={handleSelect} optionsArray={levelNum} initialOption='- level -' />
				<Dropdown cat='class' handleSelect={handleSelect} optionsArray={classTitles} initialOption={initialOption.current} />

				{ !classSelect ? null 
				  : canSelectSub.current ? <Dropdown cat='subclass' handleSelect={handleSelect} optionsArray={subclassInput} initialOption={initialOption.current} /> : (<span className="alert">Selection of {classObj.current.subName} is made at level {classObj.current.subLevel}</span>) }

				  {/* { !classSelect ? null
				  : subValid.current ?  'yes' : 'no' } */}


				{/* <div ref={levelRef} className="custom-dropdown">
					<div className="value-header small">
						- level -
						<div className="arrow-down"></div>
					</div>
					<ul className="value-list closed">
						{levelNum.map((n) => (
							<li key={`level-${n + 1}`}>{n + 1}</li>
						))}
					</ul>
				</div> */}

				{/* <div ref={classRef} className="custom-dropdown">
					<div className="value-header">
						{initialOption.current}
						<div className="arrow-down"></div>
					</div>
					<ul className="value-list closed">
						{classTitles.map((val) => (
							<li key={`class-${val}`}>{val}</li>
						))}
					</ul>
				</div>
				{ !classSelect ? null 
				  : levelSelect < classObj.current.subLevel ? (<p>Selection of {classObj.current.subName} is made at level {classObj.current.subLevel}</p>) : null }
				<div ref={subclassRef} className="custom-dropdown hidden">
					<div className="value-header">
						{initialOption.current}
						<div className="arrow-down"></div>
					</div>
					<ul className="value-list closed">
						{subclassInput.map((val) => (
							<li key={`subclass-${val}`}>{val}</li>
						))}
					</ul>
				</div> */}
				{/* { (levelSelect > 0 && classSelect) ? 
				<SelectHitPoints {...props} levelSelect={levelSelect} classSelect={classSelect} classObj={classObj.current} /> : null} */}
				

				
			</div>
		</div>
	);
});

const SelectHitPoints = (props) => {
	const { updateSelect, levelSelect, classSelect, classObj } = props;

	// const [pointsSelect, setPointsSelect] = useState('')

	useEffect(() => {
      const selectionOptions = document.hpSelect.hitPoints
      for (const opt of Array.from(selectionOptions)) {
        opt.addEventListener('change', selectHitPointOption);
      }
    }, []);

	 const selectHitPointOption = (event) => {
      updateSelect(event.target.value, 'hit-points')
		
    };
		
	const hitDice = classObj.hitDice
	const diceCount = levelSelect - 1;

	

	return (
			<div>
				<p className='section-title'>Select Hit Points</p>
				<form id="selection-form" name="hpSelect" className='selectionRadio'>
					<div>
						<input type="radio" id="average" name="hitPoints" value="average"/>
						<label htmlFor="average">Average Hit Dice: {classObj.hitDice.slice(1) / 2 + 1}</label>
					</div>
					<div>
						<input type="radio" id="roll" name="hitPoints" value="roll"/>
						<label htmlFor="roll">Roll Hit Dice: {classObj.hitDice}</label>
					</div>
				</form>
			</div>
	)
	
}


