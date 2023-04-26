import React, { useState, useEffect, useRef, memo } from 'react';
import { clearSelection, resetSub } from '../utilities/selectFunctions'
import CharacterClassSubclass from '../../data/ClassSubclass';
import { setModifiersByName } from '../utilities/helperFunctions';
import { Dropdown } from '../Dropdown';
import { SubmitButton } from '../SubmitButton';

const _ = require('lodash'); 

export const SelectClass = memo(function SelectClass(props) {
	const { updateSelect } = props;

	const [levelSelect, setLevelSelect] = useState(0);
	const [classSelect, setClassSelect] = useState(null);
	const [subclassSelect, setSubclassSelect] = useState(null);
	const [asiSelect, setASISelect] = useState([])
   const [subValid, setSubValid] = useState(false)

	const subInput = useRef([]);

	const classObj = useRef(null)
	const initialOption = useRef('-- select --');
	const classRef = useRef();
	const asiRef = useRef([])

	const levelNum = [...Array(20).keys()].map(el => el + 1);
	const classTitles = Object.keys(CharacterClassSubclass.class)

	// useEffect(() => document.getElementById('select-level').children[0].classList.add('small'), [])
	
	const handleSelect = (val, cat) => {
		if (cat === 'level') {
			let num = Number(val);
			asiRef.current = [4,8,12,16,19].filter(el => el <= num);
			// displayASI.current = true;
			setLevelSelect(num);
		} else if (cat === 'class') {
			classObj.current = CharacterClassSubclass.class[_.lowerCase(val)];
         if (subInput.current.length) resetSub(classRef.current, subInput.current, initialOption.current, setSubValid, 2)
			setClassSelect(_.lowerCase(val));
		} else if (cat === 'subclass') {
			setSubclassSelect(val)
		} else if (cat === 'asi') {
			setASISelect(val)
			asiRef.current = []
		}
	}

	useEffect(() => {
      if (classSelect) updateSelect(classSelect, 'class');
      if (classSelect && subclassSelect) clearSelection(setSubclassSelect)
   }, [classSelect])

	useEffect(() => {
      if (levelSelect > 0) updateSelect(levelSelect, 'level');
   }, [levelSelect])

	useEffect(() => {
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

	useEffect(() => {
		if (asiSelect.length) updateSelect(asiSelect, 'asi')
	}, [asiSelect])

	return (
		<div className="stat-input-container">
			<div className='section-heading'>
				<p className='section-title'>Select Class</p>
			</div>
			<div id="SelectClass" ref={classRef} className="stat-input hidden">
				<Dropdown cat='level' handleSelect={handleSelect} optionsArray={levelNum} initialOption='- level -' />
				<Dropdown cat='class' handleSelect={handleSelect} optionsArray={classTitles} initialOption={initialOption.current} />

				{ !classSelect ? null 
				  : subValid ? <Dropdown cat='subclass' handleSelect={handleSelect} optionsArray={subInput.current} initialOption={initialOption.current} /> : (<span className="alert">Selection of {classObj.current.subName} is made at level {classObj.current.subLevel}</span>) }	
				{ (levelSelect > 0 && classSelect) ? 
				<SelectHitPoints {...props} levelSelect={levelSelect} classSelect={classSelect} classObj={classObj.current} /> : null}	
				{ asiRef.current.length > 0 ? <SelectASI handleSelect={handleSelect} count={asiRef.current} /> : null}
				{/* <SelectASI {...props} count={asiRef.current} />  */}
			</div>
		</div>
	);
})

const SelectHitPoints = (props) => {
	const { updateSelect, classObj } = props;

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
		<>
		<div className='border-line'></div>
			<div className='hit-points'>
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
			</>
	)
	
}

const SelectASI = (props) => {
	const { handleSelect, count } = props;
	const [canSubmit, setCanSubmit] = useState(false)
	// const initStatus = useRef(Array(count.length).fill(false))
	const [submitStatus, setSubmitStatus] = useState(Array(count.length).fill(false))

	// useEffect(() => setSubmitStatus(Array(count.length).fill(false)), [])

	const parentRef = useRef();
	const submit = useRef([[],[],[],[],[]])

	const updateSubmit = (val, index) => {
		const init = Array(6).fill(0);
		val.forEach(el => init[el] += 1)
		submit.current[index] = init;
		setSubmitStatus(submitStatus.map((el,i) => i === index ? true : el))
	}

	useEffect(() => {
		if (submitStatus.length && _.every(submitStatus, (el => el))) setCanSubmit(true)
	}, [submitStatus])

	const handleSubmit = () => {
		const combine = []
		submit.current.forEach(arr => {
			if (arr.length) arr.forEach((el,i) => combine.length > i ? combine[i].push(el) : combine.push([el]))
		})
		const result = combine.map(arr => _.sum(arr))
		handleSelect(result, 'asi')
	}
	
	
	return (
		<>
		<div className='border-line'></div>
		<div ref={parentRef} className='asi-container'>
			<p className='section-title'>Ability Score Improvements by Level</p>
			<div className='asi-inner'>
				{ count.map((el,i) => <ASIOption key={`asi-${i}`} index={i} level={el} updateSubmit={updateSubmit}/>) }
			</div>
			{/* {canSubmit ? <SubmitButton canSubmit={canSubmit} submit={handleSelect} args={[]} /> : null} */}
			<SubmitButton canSubmit={canSubmit} submit={handleSubmit} args={[]} />
		</div>
		</>
	)
}
const ASIOption = (props) => {
	const {index, level, updateSubmit} = props;

	const [canSubmit, setCanSubmit] = useState(false)
	const [selection, setSelection] = useState([null,null])

	const abilities = useRef(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma',]);
	const initialOption = useRef('--');

	const dropSelect = (val, cat, i) => {
		let valId = abilities.current.indexOf(_.lowerCase(val))
		setSelection(current => {
			let copy = [...current];
			copy[i] = valId;
			return copy;
		})
	}

	useEffect(() => {
		if (_.isNumber(selection[0]) && _.isNumber(selection[1])) {
			setCanSubmit(true)
			updateSubmit(selection, index)
		}
	}, [selection])


	return (
		<div className='asi-select'>
			<p>Level: {level} { canSubmit ? (<span className='check'>&#10003;</span>) : null}</p>
			<Dropdown cat='asi' handleSelect={dropSelect} optionsArray={abilities.current} initialOption={initialOption.current} index={0} />
			<Dropdown cat='asi' handleSelect={dropSelect} optionsArray={abilities.current} initialOption={initialOption.current} index={1} />
			{/* <SubmitButton canSubmit={canSubmit} submit={handleSelect} args={[selection, index]} /> */}
		</div>
	)
}