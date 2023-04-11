import React, { useState, useEffect, useRef, memo } from 'react';
import { clearSelection, resetSub } from '../utilities/selectFunctions'
import CharacterClassSubclass from '../../data/ClassSubclass';
import { Dropdown } from '../Dropdown';

export const SelectClass = memo(function SelectClass(props) {
	const { updateSelect } = props;

	const [levelSelect, setLevelSelect] = useState(0);
	const [classSelect, setClassSelect] = useState(null);
	const [subclassSelect, setSubclassSelect] = useState(null);
   const [subValid, setSubValid] = useState(false)

	const subInput = useRef([]);

	const classObj = useRef(null)
	const initialOption = useRef('-- select --');
	const classRef = useRef();

	const levelNum = [...Array(20).keys()].map(el => el + 1);
	const classTitles = Object.keys(CharacterClassSubclass.class)

	useEffect(() => document.getElementById('select-level').children[0].classList.add('small'), [])

	const handleSelect = (val, cat) => {
		if (cat === 'level') {
			let num = Number(val);
			setLevelSelect(num);
		} else if (cat === 'class') {
			classObj.current = CharacterClassSubclass.class[val];
         if (subInput.current.length) resetSub(classRef.current, subInput.current, initialOption.current, setSubValid, 2)
			setClassSelect(val)	
		} else if (cat === 'subclass') {
			setSubclassSelect(val)
		}
	}

   useEffect(() => {
      if (levelSelect > 0) updateSelect(levelSelect, 'level');
      if (classSelect) updateSelect(classSelect, 'class');
      if (classSelect && subclassSelect) clearSelection(setSubclassSelect)
      if ( classSelect && levelSelect > 0) {
         if (levelSelect >= classObj.current.subLevel) {
            subInput.current = classObj.current.subArray;
            setSubValid(true)
         } else {
            subInput.current = [];
            setSubValid(false)
         }
      }
   }, [levelSelect, classSelect])

	useEffect(() => {
		if (subclassSelect) updateSelect(subclassSelect, 'subclass', classSelect);
	}, [subclassSelect]);

	return (
		<div className="stat-input-container">
			<div id="SelectClass" ref={classRef} className="stat-input">
				<p className='section-title'>Select Class</p>
				<Dropdown cat='level' handleSelect={handleSelect} optionsArray={levelNum} initialOption='- level -' />
				<Dropdown cat='class' handleSelect={handleSelect} optionsArray={classTitles} initialOption={initialOption.current} />

				{ !classSelect ? null 
				  : subValid ? <Dropdown cat='subclass' handleSelect={handleSelect} optionsArray={subInput.current} initialOption={initialOption.current} /> : (<span className="alert">Selection of {classObj.current.subName} is made at level {classObj.current.subLevel}</span>) }	
				{ (levelSelect > 0 && classSelect) ? 
				<SelectHitPoints {...props} levelSelect={levelSelect} classSelect={classSelect} classObj={classObj.current} /> : null}		
			</div>
		</div>
	);
})

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