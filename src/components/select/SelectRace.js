import React, { useState, useEffect, useRef, memo } from 'react';
import { addDropdownEvent, addOptionEvent } from '../selectFunctions'
import RaceSubrace from '../../data/RaceSubrace';

export const SelectRace = memo(function SelectRace(props) {
	// const { updateSelect, RaceObj } = props;
	const { updateSelect } = props;

	const [raceSelect, setRaceSelect] = useState(null);
	const [subraceInput, setSubraceInput] = useState([]);
	const [subraceSelect, setSubraceSelect] = useState(null);
	const [required, setRequired] = useState(true);

	const firstRender = useRef(true);
	const parentRef = useRef();
	const raceRef = useRef();
	const subraceRef = useRef();
	const initialOption = useRef('-- select --');

	const optionsArray = Object.keys(RaceSubrace.race);

	useEffect(() => {
		const div = parentRef.current;
		const divArr = div.querySelectorAll('.custom-dropdown')
		for (let i = 0; i < divArr.length; i++) {
			addDropdownEvent(divArr[i])
		}
	}, []);

	useEffect(() => {
		const div = subraceInput.length < 1 ? raceRef.current : subraceRef.current;
		const cat = subraceInput.length < 1 ? 'race' : 'subrace';
		addOptionEvent(div, handleSelect, [cat])
	}, [subraceInput]);

	useEffect(() => {
		if (!firstRender.current) {
			updateSelect(raceSelect, 'race');
			subraceRef.current.children[0].childNodes[0].nodeValue = initialOption.current;
			if (RaceSubrace.race[raceSelect].has_subrace) {
				subraceRef.current.classList.remove('hidden');
				setSubraceInput(Object.keys(RaceSubrace.subrace[raceSelect]));
				if (RaceSubrace.race[raceSelect].subrace_req) setRequired(true);
				else setRequired(false);
			} else {
				subraceRef.current.classList.add('hidden');
			}
		} else firstRender.current = false;
	}, [raceSelect]);

	useEffect(() => {
		if (raceSelect) {
			updateSelect(subraceSelect, 'subrace', raceSelect);
		}
	}, [subraceSelect]);

	const handleSelect = (val, cat) => {
		if (cat === 'race') {
			setRaceSelect(val);
		} else if (cat === 'subrace') {
			setSubraceSelect(val);
		}
	};

	return (
		<div className="stat-input-container">
			<div ref={parentRef} id="SelectRace" className="stat-input">
				<p>Select Race</p>
				<div ref={raceRef} className="custom-dropdown">
					<div className="value-header">
						{initialOption.current}
						<div className="arrow-down"></div>
					</div>
					<ul id="select-race" className="value-list closed">
						{optionsArray.map((el) => (
							<li key={`race-${el}`}>{el}</li>
						))}
					</ul>
				</div>
				<div ref={subraceRef} className="custom-dropdown hidden">
					<div className="value-header">
						{initialOption.current}
						<div className="arrow-down"></div>
					</div>
					<ul id="select-subrace" className="value-list closed">
						{subraceInput.map((el) => (
							<li key={`subrace-${el}`}>{el}</li>
						))}
					</ul>
					{subraceInput && (<span className='alert'>{ required ? '* Subrace required' :'* Subrace NOT required' }</span>)}
				</div>
			</div>
		</div>
	);
});
