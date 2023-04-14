import React, { useState, useEffect, useRef, memo } from 'react';
import { clearSelection, resetSub } from '../utilities/selectFunctions'
import RaceSubrace from '../../data/RaceSubrace';
import { Dropdown } from '../Dropdown';
const _ = require('lodash'); 

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

	const handleSelect = (cap, cat) => {
		const val = _.lowerCase(cap);
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