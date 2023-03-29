import React, { useState, useEffect, useRef } from 'react';
import { addDropdownEvent, addOptionEvent } from '../../selectFunctions';
import { SubmitButton } from '../SubmitButton';

export const StandardArray = (props) => {
	const { abilities } = props;

	const [selectedArr, setSelectedArr] = useState([0, 0, 0, 0, 0, 0]);
	const [canSubmit, setCanSubmit] = useState(false);

	const standardArray = useRef([8, 10, 12, 13, 14, 15]);

	useEffect(() => {
		if (selectedArr.filter((el) => el !== 0).length === 6) {
			const orderedSelect = [...selectedArr];
			orderedSelect.sort((a, b) => a - b);
			if (standardArray.current.every((el, i) => el === orderedSelect[i])) setCanSubmit(true);
			else setCanSubmit(false);
		}
	}, [selectedArr]);

	return (
		<div className='ability-select-container'>
			{abilities.map((ability, i) => (
				<Stat key={ability} index={i} ability={ability} selectedArr={selectedArr} setSelectedArr={setSelectedArr} standardArray={standardArray.current} />
			))}
			<SubmitButton {...props} canSubmit={canSubmit} selectedArr={selectedArr} />
		</div>
	);
};

const Stat = (props) => {
	const { index, ability, selectedArr, setSelectedArr, standardArray } = props;

	const [selected, setSelected] = useState(0);

	const parentRef = useRef();
	const selectRef = useRef();
	const optionsRef = useRef();

	useEffect(() => {
		addDropdownEvent(selectRef.current);
		addOptionEvent(selectRef.current, handleSelect, 'base');
	}, []);

	const notZero = (el) => el !== 0;

	useEffect(() => {
		if (selectedArr.some(notZero)) {
			const options = optionsRef.current.children;
			for (let i = 0; i < options.length; i++) {
				let val = Number(options[i].innerHTML);
				if (selectedArr.includes(val)) {
					options[i].classList.add('grey');
				} else {
					options[i].classList.remove('grey');
				}
			}
			if (selected > 0) {
				let firstI = selectedArr.findIndex((el) => el === selected);
				let lastI = selectedArr.findLastIndex((el) => el === selected);
				if (firstI !== lastI) parentRef.current.firstElementChild.classList.add('red');
				else parentRef.current.firstElementChild.classList.remove('red');
			}
		}
	}, [selectedArr]);

	const handleSelect = (val) => {
		setSelected(Number(val));
		setSelectedArr((current) => current.map((el, i) => (i === index ? Number(val) : el)));
	};

	return (
		<div ref={parentRef} id={`${ability}-dropdown`} className='ability-dropdown'>
			<p>
				{ability}: {selected === 0 ? '-' : selected}
			</p>
			<div ref={selectRef} className='custom-dropdown'>
				<div className='value-header small'>
					--
					<div className='arrow-down'></div>
				</div>
				<ul ref={optionsRef} className='value-list closed'>
					{standardArray.map((n) => (
						<li key={`level-${n}`}>{n}</li>
					))}
				</ul>
			</div>
		</div>
	);
};
