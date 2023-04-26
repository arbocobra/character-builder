import React, { useState, useEffect, useRef } from 'react';
import { addDropdownEvent, addOptionEvent } from '../../utilities/selectFunctions';
import { SubmitButton } from '../../SubmitButton';
const _ = require('lodash'); 

export const PointBuy = (props) => {
	const { abilities, submit, reset } = props;

	const [total, setTotal] = useState(27);
	const [selectedArr, setSelectedArr] = useState([0, 0, 0, 0, 0, 0]);
	const [canSubmit, setCanSubmit] = useState(false);

	const costValue = useRef({ 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 });

	useEffect(() => {
		const costArr = selectedArr.map((el) => {
			let i = Object.keys(costValue.current).indexOf(el.toString());
			return i > 0 ? Object.values(costValue.current)[i] : 0
		});
		const totalCost = costArr.reduce((a, b) => a + b);
		setTotal(27 - totalCost);
		if (selectedArr.filter((el) => el !== 0).length === 6) setCanSubmit(true);
		else setCanSubmit(false);
	}, [selectedArr]);

	return (
		<div className='ability-select-container'>
			<p>Total: {total}</p>
			{abilities.map((ability, i) => (
				<Stat key={ability} index={i} pointsObj={costValue.current} total={total} ability={ability} setSelectedArr={setSelectedArr} />
			))}
			{/* <SubmitButton {...props} canSubmit={canSubmit} selectedArr={selectedArr} /> */}
			<SubmitButton canSubmit={canSubmit} submit={submit} args={[selectedArr]} reset={reset} />
		</div>
	);
};

const Stat = (props) => {
	const { index, pointsObj, total, ability, setSelectedArr } = props;

	const [displayArr, setDisplayArr] = useState([8, 9, 10, 11, 12, 13, 14, 15]);
	const [selected, setSelected] = useState(0);
	const firstRender = useRef(true);
	const parentRef = useRef();
	const selectRef = useRef();

	useEffect(() => {
		if (firstRender.current) addDropdownEvent(selectRef.current);
		addOptionEvent(selectRef.current, handleSelect, ['base']);
	}, [displayArr]);

	

	const filterAvailable = (num) => {
		if (selected > 0) {
			if (pointsObj[num] <= total + pointsObj[selected]) return num;
		} else {
			if (pointsObj[num] <= total) return num;
		}
	};

	const getAvailable = () => {
		return Object.keys(pointsObj)
			.map((val) => Number.parseInt(val))
			.filter(filterAvailable);
	};

	useEffect(() => {
		if (!firstRender.current) {
			const availableArray = getAvailable();
			const lessArray = displayArr.filter((el) => el <= selected);
			const final = [...new Set([...lessArray, ...availableArray])];
			if (final.length !== displayArr.length) {
				setDisplayArr(final);
			}
		} else firstRender.current = false;
	}, [total]);

	const handleSelect = (val) => {
		setSelected(val);
		setSelectedArr((current) => current.map((el, i) => (i === index ? Number.parseInt(val) : el)));
	};

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
				<ul className='value-list closed'>
					{displayArr.map((n) => (
						<li key={`level-${n}`}>{n}</li>
					))}
				</ul>
			</div>
		</div>
	);
}