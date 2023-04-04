import React, { useState, useEffect, useRef, memo } from 'react';
import { addDropdownEvent, addOptionEvent } from '../selectFunctions'
import RaceSubrace from '../../data/RaceSubrace';

// export const SelectRace = memo(function SelectRace(props) {
// 	const { updateSelect } = props;

// 	const [raceSelect, setRaceSelect] = useState(null);
// 	const [subraceInput, setSubraceInput] = useState([]);
// 	const [subraceSelect, setSubraceSelect] = useState(null);
// 	const [required, setRequired] = useState(true);

// 	const firstRender = useRef(true);
// 	const parentRef = useRef();
// 	const raceRef = useRef();
// 	const subraceRef = useRef();
// 	const initialOption = useRef('-- select --');

// 	const optionsArray = Object.keys(RaceSubrace.race);

// 	useEffect(() => {
// 		const div = parentRef.current;
// 		const divArr = div.querySelectorAll('.custom-dropdown')
// 		for (let i = 0; i < divArr.length; i++) {
// 			addDropdownEvent(divArr[i])
// 		}
// 	}, []);

// 	useEffect(() => {
// 		const div = subraceInput.length < 1 ? raceRef.current : subraceRef.current;
// 		const cat = subraceInput.length < 1 ? 'race' : 'subrace';
// 		addOptionEvent(div, handleSelect, [cat])
// 	}, [subraceInput]);

// 	useEffect(() => {
// 		if (!firstRender.current) {
// 			updateSelect(raceSelect, 'race');
// 			subraceRef.current.children[0].childNodes[0].nodeValue = initialOption.current;
// 			if (RaceSubrace.race[raceSelect].has_subrace) {
// 				subraceRef.current.classList.remove('hidden');
// 				setSubraceInput(Object.keys(RaceSubrace.subrace[raceSelect]));
// 				if (RaceSubrace.race[raceSelect].subrace_req) setRequired(true);
// 				else setRequired(false);
// 			} else {
// 				subraceRef.current.classList.add('hidden');
// 			}
// 		} else firstRender.current = false;
// 	}, [raceSelect]);

// 	useEffect(() => {
// 		if (raceSelect) {
// 			updateSelect(subraceSelect, 'subrace', raceSelect);
// 		}
// 	}, [subraceSelect]);

// 	const handleSelect = (val, cat) => {
// 		if (cat === 'race') {
// 			setRaceSelect(val);
// 		} else if (cat === 'subrace') {
// 			setSubraceSelect(val);
// 		}
// 	};

// 	return (
// 		<div className="stat-input-container">
// 			<div ref={parentRef} id="SelectRace" className="stat-input">
// 				<p>Select Race</p>
// 				<div ref={raceRef} className="custom-dropdown">
// 					<div className="value-header">
// 						{initialOption.current}
// 						<div className="arrow-down"></div>
// 					</div>
// 					<ul id="select-race" className="value-list closed">
// 						{optionsArray.map((el) => (
// 							<li key={`race-${el}`}>{el}</li>
// 						))}
// 					</ul>
// 				</div>
// 				<div ref={subraceRef} className="custom-dropdown hidden">
// 					<div className="value-header">
// 						{initialOption.current}
// 						<div className="arrow-down"></div>
// 					</div>
// 					<ul id="select-subrace" className="value-list closed">
// 						{subraceInput.map((el) => (
// 							<li key={`subrace-${el}`}>{el}</li>
// 						))}
// 					</ul>
// 					{subraceInput && (<span className='alert'>{ required ? '* Subrace required' :'* Subrace NOT required' }</span>)}
// 				</div>
// 			</div>
// 		</div>
// 	);
// });

export const SelectRace = memo(function SelectRace(props) {
	const { updateSelect } = props;

	const [raceSelect, setRaceSelect] = useState(null);

	const firstRender = useRef(true);
	const raceRef = useRef();
	const initialOption = useRef('-- select --');

	const optionsArray = Object.keys(RaceSubrace.race);

	useEffect(() => {
		const div = raceRef.current
		addDropdownEvent(div)
		addOptionEvent(div, handleSelect, [])
	}, []);

	useEffect(() => {
		if (!firstRender.current) {
			updateSelect(raceSelect, 'race');
			const raceObj = {...RaceSubrace.race[raceSelect]};
		} else firstRender.current = false;
	}, [raceSelect]);

	const handleSelect = (val) => setRaceSelect(val);

	return (
		<div className="stat-input-container">
			<div id="SelectRace" className="stat-input">
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
				<SelectSubrace {...props} raceSelect={raceSelect} />
			</div>
		</div>
	);
});

export const SelectSubrace = (props) => {
	const {updateSelect, raceSelect} = props;
	
	const [subraceSelect, setSubraceSelect] = useState(null);
	const [subraceInput, setSubraceInput] = useState([])	
	const parentObj = useRef(null)
	const required = useRef(true)

	const subraceRef = useRef();
	const headerRef = useRef()
	const initialOption = useRef('-- select --');

	useEffect(() => addDropdownEvent(subraceRef.current), []);

	useEffect(() => {
		if (raceSelect) {
			setSubraceSelect(null)
			if (RaceSubrace.race[raceSelect].has_subrace) {
				parentObj.current = {...RaceSubrace.race[raceSelect]};

				headerRef.current.childNodes[0].nodeValue = initialOption.current;
				subraceRef.current.classList.remove('hidden');
				required.current = parentObj.current.subrace_req

				let initList = Object.keys(RaceSubrace.subrace[raceSelect])
				if (!parentObj.current.subrace_req) initList.unshift('N/A')
				setSubraceInput(initList);
				
			} else subraceRef.current.classList.add('hidden');
		}
	}, [raceSelect])

	useEffect(() => addOptionEvent(subraceRef.current, handleSelect, []), [subraceInput])

	const handleSelect = (val) => setSubraceSelect(val);

	useEffect(() => {
		if (subraceSelect) {
			updateSelect(subraceSelect, 'subrace', raceSelect)
		}
	}, [subraceSelect])

	return (
		<div ref={subraceRef} className="custom-dropdown hidden">
			<div ref={headerRef} className="value-header">
				{initialOption.current}
				<div className="arrow-down"></div>
			</div>
			<ul id="select-subrace" className="value-list closed">
				{subraceInput.map((el) => (
					<li key={`subrace-${el}`}>{el}</li>
				))}
			</ul>
			{subraceInput && (<span className='alert'>{ required.current ? '* Subrace required' :'* Subrace NOT required' }</span>)}
		</div>
	)
}