import React, { useState, useEffect, useRef, memo } from 'react';
import { addDropdownEvent, addOptionEvent } from '../utilities/selectFunctions'
import CharacterClassSubclass from '../../data/ClassSubclass';

export const SelectClass = memo(function SelectClass(props) {
	const { updateSelect } = props;

	const [levelSelect, setLevelSelect] = useState(0);
	const [classSelect, setClassSelect] = useState(null);
	const [subclassInput, setSubclassInput] = useState([])
	const [subclassSelect, setSubclassSelect] = useState(null);
	const parentRef = useRef();
	const levelRef = useRef();
	const classRef = useRef();
	const subclassRef = useRef();
	const classObj = useRef(CharacterClassSubclass.class)
	const selectedClassObj = useRef(null)
	const initialOption = useRef('-- select --');

	const levelNum = [...Array(20).keys()];
	const classTitles = Object.keys(classObj.current)
	const dropdownCat = ['level', 'class', 'subclass'];

	useEffect(() => {
		const div = parentRef.current;
		const divArr = div.querySelectorAll('.custom-dropdown')
		for (let i = 0; i < divArr.length; i++) {
			addDropdownEvent(divArr[i])
		}
		for (let i = 0; i < 2; i++) {
			addOptionEvent(divArr[i], handleSelect, [dropdownCat[i]])
		}
	}, []);

	const subclassAvailable = () => {
		if (!classSelect || levelSelect < 1) return false;
		else return levelSelect >= selectedClassObj.current.subLevel
	}

	const resetSubclass = () => {
		subclassRef.current.children[0].childNodes[0].nodeValue = initialOption.current;
		setSubclassSelect(null)
		updateSelect('', 'subclass');
	}

	useEffect (() => {
		if (classSelect) { 
			let subResult = subclassAvailable()
			if (subResult) {
				setSubclassInput(classObj.current[classSelect].subArray);
			} else {
				if (subclassSelect) resetSubclass()
			}	
		}
	}, [classSelect, levelSelect])

	useEffect(() => {
		if (levelSelect > 0) updateSelect(levelSelect, 'level');
	}, [levelSelect]);

	useEffect(() => {
		if (classSelect) updateSelect(classSelect, 'class');
	}, [classSelect]);

	useEffect (() => {
		if (subclassInput.length) {
			subclassRef.current.classList.remove('hidden');
			addOptionEvent(subclassRef.current, handleSelect, ['subclass'])
		} else subclassRef.current.classList.add('hidden');
	}, [subclassInput])

	useEffect(() => {
		if (subclassSelect) updateSelect(subclassSelect, 'subclass', classSelect);
	}, [subclassSelect]);

	const handleSelect = (val, cat) => {
		if (cat === 'level') {
			setLevelSelect(val);
		} else if (cat === 'class') {
			setClassSelect(val)
			selectedClassObj.current = classObj.current[val];
		} else if (cat === 'subclass') {
			setSubclassSelect(val)
		}
	};

	return (
		<div className="stat-input-container class">
			<div id="SelectClass" ref={parentRef} className="stat-input">
				<p className='section-title'>Select Class</p>
				<div ref={levelRef} className="custom-dropdown">
					<div className="value-header small">
						- level -
						<div className="arrow-down"></div>
					</div>
					<ul className="value-list closed">
						{levelNum.map((n) => (
							<li key={`level-${n + 1}`}>{n + 1}</li>
						))}
					</ul>
				</div>
				<div ref={classRef} className="custom-dropdown">
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
				  : levelSelect < selectedClassObj.current.subLevel ? (<p>Selection of {selectedClassObj.current.subName} is made at level {selectedClassObj.current.subLevel}</p>) : null }
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
				</div>
				{ (levelSelect > 0 && classSelect) ? 
				<SelectHitPoints {...props} levelSelect={levelSelect} classSelect={classSelect} selectedClassObj={selectedClassObj.current} /> : null}
				

				
			</div>
		</div>
	);
});

const SelectHitPoints = (props) => {
	const { updateSelect, levelSelect, classSelect, selectedClassObj } = props;

	// const [pointsSelect, setPointsSelect] = useState('')

	useEffect(() => {
      const selectionOptions = document.hpSelect.hitPoints
      for (const opt of Array.from(selectionOptions)) {
			// console.log(opt.value)
        opt.addEventListener('change', selectHitPointOption);
		// opt.addEventListener('change', updateSelect(opt.value, 'hit points'))

      }
    }, []);

	 const selectHitPointOption = (event) => {
      updateSelect(event.target.value, 'hit-points')
		
    };
		
	const hitDice = selectedClassObj.hitDice
	const diceCount = levelSelect - 1;

	

	return (
			<div>
				<p className='section-title'>Select Hit Points</p>
				<form id="selection-form" name="hpSelect" className='selectionRadio'>
					<div>
						<input type="radio" id="average" name="hitPoints" value="average"/>
						<label htmlFor="average">Average Hit Dice: {selectedClassObj.hitDice.slice(1) / 2 + 1}</label>
					</div>
					<div>
						<input type="radio" id="roll" name="hitPoints" value="roll"/>
						<label htmlFor="roll">Roll Hit Dice: {selectedClassObj.hitDice}</label>
					</div>
				</form>
			</div>
	)
	
}
