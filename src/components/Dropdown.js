import React, { useEffect, useRef } from 'react';
import { addDropdownEvent, addOptionEvent, addOptionEventSpecial } from './utilities/selectFunctions';
const _ = require('lodash'); 

export const Dropdown = (props) => {
	const {cat, handleSelect, optionsArray, initialOption, index, returnSelectIndex } = props;
	const dropdown = useRef();

	useEffect(() => {
		const div = dropdown.current
		addDropdownEvent(div)
	}, []);

	useEffect(() => {
		const div = dropdown.current
	if (index !== null) {
		if (returnSelectIndex) {addOptionEventSpecial(div, handleSelect, index)}
		else addOptionEvent(div, handleSelect, [cat, index])
		} else {
			addOptionEvent(div, handleSelect, [cat])}
	}, [optionsArray]);

	return (
		<div id={`select-${cat}`} ref={dropdown} className="custom-dropdown">
			<div className="value-header">
				{initialOption}
				<div className="arrow-down"></div>
			</div>
			<ul className="value-list closed">
				{optionsArray.map((el) => (
					<li key={`{${cat}-${el}}`}>{_.capitalize(el)}</li>
				))}
			</ul>
		</div>
	)
}