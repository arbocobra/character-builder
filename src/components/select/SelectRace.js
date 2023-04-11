import React, { useState, useEffect, useRef, memo } from 'react';
import { clearSelection, resetSub } from '../utilities/selectFunctions'
import RaceSubrace from '../../data/RaceSubrace';
import { Dropdown } from '../Dropdown';

export const SelectRace = memo(function SelectRace(props) {
	const { updateSelect } = props;

	const initialOption = useRef('-- select --');
	const raceRef = useRef()
	const optionsArray = Object.keys(RaceSubrace.race);

	const [raceSelect, setRaceSelect] = useState(null);
	const [subraceSelect, setSubraceSelect] = useState(null);

	const hasSubrace = useRef(false)
	const required = useRef(true)
	const subraceInput = useRef([])

	const handleSelect = (val, cat) => {
		if (cat === 'race') {
			if (subraceInput.current.length) resetSub(raceRef.current, subraceInput.current, initialOption.current, hasSubrace.current, 1)

			required.current = RaceSubrace.race[val].subrace_req;
			
			if (RaceSubrace.race[val].has_subrace) {
				hasSubrace.current = true;
				subraceInput.current = RaceSubrace.race[val].subrace;
			} else {
				hasSubrace.current = false;
				subraceInput.current = [];
			}
			setRaceSelect(val)
		} else if (cat === 'subrace') {
			setSubraceSelect(val)
		}
	}

	useEffect(() => {
		if (raceSelect) updateSelect(raceSelect, 'race');	
		if (raceSelect && subraceSelect) clearSelection(setSubraceSelect)
	}, [raceSelect])

	useEffect(() => {
		if (subraceSelect) updateSelect(subraceSelect, 'subrace', raceSelect);
	}, [subraceSelect])

	return (
		<div ref={raceRef} className="stat-input-container">
			<div id="SelectRace" className="stat-input">
				<p className='section-title'>Select Race</p>
				<Dropdown cat='race' handleSelect={handleSelect} optionsArray={optionsArray} initialOption={initialOption.current} />
				{ hasSubrace.current ? 
				<Dropdown cat='subrace' handleSelect={handleSelect} optionsArray={subraceInput.current} initialOption={initialOption.current} /> : null }
				{hasSubrace.current ? (<span className="alert">{ required.current ? '* Subrace required' :'* Subrace NOT required' }</span>) : null}
			</div>
		</div>
	)
})

// export const SelectRaceAlt = memo(function SelectRace(props) {
// 	const { updateSelect } = props;

// 	const [raceSelect, setRaceSelect] = useState(null);

// 	const firstRender = useRef(true);
// 	const raceRef = useRef();
// 	const initialOption = useRef('-- select --');

// 	const optionsArray = Object.keys(RaceSubrace.race);

// 	useEffect(() => {
// 		const div = raceRef.current
// 		addDropdownEvent(div)
// 		addOptionEvent(div, handleSelect, [])
// 	}, []);

// 	useEffect(() => {
// 		if (!firstRender.current) {
// 			updateSelect(raceSelect, 'race');
// 			const raceObj = {...RaceSubrace.race[raceSelect]};
// 		} else firstRender.current = false;
// 	}, [raceSelect]);

// 	const handleSelect = (val) => setRaceSelect(val);

// 	return (
// 		<div className="stat-input-container">
// 			<div id="SelectRace" className="stat-input">
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
// 				<SelectSubrace {...props} raceSelect={raceSelect} />
// 			</div>
// 		</div>
// 	);
// });

// export const SelectSubrace = (props) => {
// 	const {updateSelect, raceSelect} = props;
	
// 	const [subraceSelect, setSubraceSelect] = useState(null);
// 	const [subraceInput, setSubraceInput] = useState([]);
// 	const parentObj = useRef(null)
// 	const required = useRef(true)

// 	const subraceRef = useRef();
// 	const headerRef = useRef()
// 	const initialOption = useRef('-- select --');

// 	useEffect(() => addDropdownEvent(subraceRef.current), []);

// 	useEffect(() => {
// 		if (raceSelect) {
// 			setSubraceSelect(null)
// 			if (RaceSubrace.race[raceSelect].has_subrace) {
// 				parentObj.current = {...RaceSubrace.race[raceSelect]};

// 				headerRef.current.childNodes[0].nodeValue = initialOption.current;
// 				subraceRef.current.classList.remove('hidden');
// 				required.current = parentObj.current.subrace_req

// 				let initList = Object.keys(RaceSubrace.subrace[raceSelect])
// 				if (!parentObj.current.subrace_req) initList.unshift('N/A')
// 				setSubraceInput(initList);
				
// 			} else subraceRef.current.classList.add('hidden');
// 		}
// 	}, [raceSelect])

// 	useEffect(() => addOptionEvent(subraceRef.current, handleSelect, []), [subraceInput])

// 	const handleSelect = (val) => setSubraceSelect(val);

// 	useEffect(() => {
// 		if (subraceSelect) {
// 			updateSelect(subraceSelect, 'subrace', raceSelect)
// 		}
// 	}, [subraceSelect])

// 	return (
// 		<div ref={subraceRef} className="custom-dropdown hidden">
// 			<div ref={headerRef} className="value-header">
// 				{initialOption.current}
// 				<div className="arrow-down"></div>
// 			</div>
// 			<ul id="select-subrace" className="value-list closed">
// 				{subraceInput.map((el) => (
// 					<li key={`subrace-${el}`}>{el}</li>
// 				))}
// 			</ul>
// 			{subraceInput && (<span className='alert'>{ required.current ? '* Subrace required' :'* Subrace NOT required' }</span>)}
// 		</div>
// 	)
// }