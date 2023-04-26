import React, { useState, useEffect, useRef } from 'react';
import { toggleList } from '../../utilities/helperFunctions';
import { addDropdownEvent, addOptionEventIndex } from '../../utilities/selectFunctions';
import { SubmitButton } from '../../SubmitButton';
const _ = require('lodash'); 

export const RandomRoll = (props) => {
	// const { updateSelect, abilities, setSelectionType } = props;
	const { abilities, submit, reset } = props;

	const [selectedArr, setSelectedArr] = useState([0, 0, 0, 0, 0, 0]);
	const [randomArray, setRandomArray] = useState([]);
	const [displayIndexAll, setDisplayIndexAll] = useState([null, null, null, null, null, null]);
	const [canSubmit, setCanSubmit] = useState(false);

	useEffect(() => {
		const result = [];
		for (let i = 0; i < 6; i++) {
			let roll = [];
			for (let j = 0; j < 4; j++) {
				let num = Math.ceil(Math.random() * 6);
				roll.push(num);
			}
			roll.sort().shift();

			let total = roll.reduce((a, b) => a + b);
			result.push(total);
		}
		result.sort((a, b) => a - b);
		setRandomArray(result);
	}, []);

	useEffect(() => {
		if (displayIndexAll.filter((el) => el !== null).length === 6) {
			const check = [...new Set(displayIndexAll)];
			if (check.length === 6) setCanSubmit(true);
			else setCanSubmit(false);
		}
	}, [displayIndexAll]);

	if (randomArray.length > 0) {
		return (
			<div className='ability-select-container'>
				{abilities.map((ability, i) => (
					<Stat
						key={ability}
						index={i}
						ability={ability}
						setSelectedArr={setSelectedArr}
						randomArray={randomArray}
						displayIndexAll={displayIndexAll}
						setDisplayIndexAll={setDisplayIndexAll}
					/>
				))}
				{/* <SubmitButton {...props} canSubmit={canSubmit} selectedArr={selectedArr} /> */}
				<SubmitButton canSubmit={canSubmit} submit={submit} args={[selectedArr]} reset={reset} />
			</div>
		);
	}
};

const Stat = (props) => {
	const { index, ability, setSelectedArr, randomArray, displayIndexAll, setDisplayIndexAll } = props;

	const [selected, setSelected] = useState(0);
	const [displayIndex, setDisplayIndex] = useState(null);

	const parentRef = useRef();
	const selectRef = useRef();
	const optionsRef = useRef();
	const firstRender = useRef(true);

	useEffect(() => {
		if (firstRender.current) addDropdownEvent(selectRef.current);
		addOptionEventIndex(selectRef.current, handleSelect);
	}, [randomArray]);

	const handleSelect = (val, optionIndex) => {
		setSelected(Number(val));
		setSelectedArr((current) => current.map((el, i) => (i === index ? Number(val) : el)));
		setDisplayIndex(optionIndex);
	};

	useEffect(() => {
		if (!firstRender.current) {
			setDisplayIndexAll((current) => current.map((el, i) => (i === index ? displayIndex : el)));
		}
	}, [displayIndex]);

	useEffect(() => {
		if (!firstRender.current) {
			const options = optionsRef.current.children;
			for (let i = 0; i < 6; i++) {
				if (displayIndexAll.includes(i)) options[i].classList.add('grey');
				else options[i].classList.remove('grey');
			}
			let dup = displayIndexAll.filter((el, i) => displayIndexAll.indexOf(el) !== i && el !== null);
			if (dup.includes(displayIndex)) {
				parentRef.current.firstElementChild.classList.add('red');
				// selectRef.current.firstElementChild.classList.add('red');
			} else {
				parentRef.current.firstElementChild.classList.remove('red');
			}
		} else firstRender.current = false;
	}, [displayIndexAll]);

	return (
		<div ref={parentRef} id={`${ability}-dropdown`} className='ability-dropdown'>
			<p>
				{/* {ability}: {selected === 0 ? '-' : selected} */}
				{_.capitalize(ability)}:
			</p>
			<div ref={selectRef} className='custom-dropdown'>
				<div className='value-header small'>
					--
					<div className='arrow-down'></div>
				</div>
				<ul ref={optionsRef} className='value-list closed'>
					{randomArray.map((n, i) => (
						<li key={`${ability}-${i}`}>{n}</li>
					))}
				</ul>
			</div>
		</div>
	);
};
