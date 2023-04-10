import React, { useEffect, useRef } from 'react';
import { addDropdownEvent, addOptionEvent } from './utilities/selectFunctions';

export const Dropdown = (props) => {
	const {cat, handleSelect, optionsArray, initialOption } = props;
	const dropdown = useRef();

	useEffect(() => {
		const div = dropdown.current
		addDropdownEvent(div)
	}, []);

	useEffect(() => {
		const div = dropdown.current
		addOptionEvent(div, handleSelect, [cat])
	}, [optionsArray]);

	return (
		<div ref={dropdown} className="custom-dropdown">
			<div className="value-header">
				{initialOption}
				<div className="arrow-down"></div>
			</div>
			<ul id={`select-${cat}`} className="value-list closed">
				{optionsArray.map((el) => (
					<li key={`{${cat}-${el}}`}>{el}</li>
				))}
			</ul>
		</div>
	)
}