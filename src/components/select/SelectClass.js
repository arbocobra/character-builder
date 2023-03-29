import React, { useState, useEffect, useRef, memo } from 'react';
// import { toggleList } from '../../helperFunctions';
import { addDropdownEvent, addOptionEvent } from '../selectFunctions'
import CharacterClassSubclass from '../../data/ClassSubclass';

export const SelectClass = memo(function SelectClass(props) {
	const { updateSelect } = props;

	const [levelSelect, setLevelSelect] = useState(0);
	const [classSelect, setClassSelect] = useState(null);
	const [subclassInput, setSubclassInput] = useState([])
	// const [subclassSelect, setSubclassSelect] = useState(null);
	const parentRef = useRef();
	const levelRef = useRef();
	const classRef = useRef();
	const subclassRef = useRef();
	const classObj = useRef(CharacterClassSubclass.class)
	const selectedClassObj = useRef(null)
	const initialOption = useRef('-- select --');

	const levelNum = [...Array(20).keys()];
	const classTitles = Object.keys(classObj.current)
	const dropdownCat = ['level', 'class', 'subclass'];

	useEffect(() => {
		const div = parentRef.current;
		const divArr = div.querySelectorAll('.custom-dropdown')
		for (let i = 0; i < divArr.length; i++) {
			addDropdownEvent(divArr[i])
		}
	}, []);

	useEffect(() => {
		const divArr = parentRef.current.querySelectorAll('.custom-dropdown')
		for (let i = 0; i < divArr.length; i++) {
			addOptionEvent(divArr[i], handleSelect, dropdownCat[i])
		}
	}, [classSelect]);

	useEffect (() => {
		if (classSelect) {
			// selectedClassObj.current = classObj.current[classSelect];
			setSubclassInput(classObj.current[classSelect].subArray);
			if (levelSelect >= selectedClassObj.current.subLevel) subclassRef.current.classList.remove('hidden');
			else subclassRef.current.classList.add('hidden');
			
		}
	}, [classSelect])

	useEffect(() => {
		if (levelSelect > 0) {
			updateSelect(levelSelect, 'level');
		}
		if (classSelect) {
			if (levelSelect >= selectedClassObj.current.subLevel) subclassRef.current.classList.remove('hidden');
			else subclassRef.current.classList.add('hidden');
		}
	}, [levelSelect]);

	const handleSelect = (val, cat) => {
		if (cat === 'level') {
			setLevelSelect(val);
		} else if (cat === 'class') {
			setClassSelect(val)
			selectedClassObj.current = classObj.current[val];
		}
	};

	return (
		<div className="stat-input-container">
			<div id="SelectClass" ref={parentRef} className="stat-input">
				<p>Select Class</p>
				<div ref={levelRef} className="custom-dropdown">
					<div className="value-header small">
						- level -
						<div className="arrow-down"></div>
					</div>
					<ul className="value-list closed">
						{levelNum.map((n) => (
							<li key={`level-${n + 1}`}>{n + 1}</li>
						))}
					</ul>
				</div>
				<div ref={classRef} className="custom-dropdown">
					<div className="value-header">
						{initialOption.current}
						<div className="arrow-down"></div>
					</div>
					<ul className="value-list closed">
						{classTitles.map((val) => (
							<li key={`class-${val}`}>{val}</li>
						))}
					</ul>
				</div>
				{ !classSelect ? null 
				  : levelSelect < selectedClassObj.current.subLevel ? (<p>Selection of {selectedClassObj.current.subName} is made at level {selectedClassObj.current.subLevel}</p>) : null }
				<div ref={subclassRef} className="custom-dropdown hidden">
					<div className="value-header">
						{initialOption.current}
						<div className="arrow-down"></div>
					</div>
					<ul className="value-list closed">
						{subclassInput.map((val) => (
							<li key={`subclass-${val}`}>{val}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
});
