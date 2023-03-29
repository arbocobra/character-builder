import React, { useState, useEffect, useRef, useCallback, memo, createRef, Fragment } from 'react';
import { toggleList } from '../../helperFunctions';

export const SelectOther = memo(function SelectOther(props) {
	const { updateSelect, selectionDetails } = props;
	
	const parentRef = useRef();
	const [active, setActive] = useState(false);
	
	useEffect(() => {
		if (selectionDetails.length > 0) {
			setActive(true);
		}
	}, [selectionDetails]);

	const handleSelect = (arr, i) => {
		let displayBoxes = Array.from(parentRef.current.querySelectorAll('.select-other-box'));
		displayBoxes[i].classList.add('hidden')
		// console.log(displayBoxes[i].classList)
		if (displayBoxes.every(el => Array.from(el.classList).includes('hidden'))) { setActive(false) }
		updateSelect(arr[1], arr[0])

	};


	if (active) {
		return (
			<div className='stat-input-container other'>
				<div ref={parentRef} id='SelectOther' className='stat-input'>
				{selectionDetails.map((el, i) => (
					<div className='select-other-box' key={el[0]}>
						<p>Select {el[0]}</p>
						<SelectBox name={el[0]} count={el[1]} arr={el[2]} index={i} handleSelect={handleSelect} />
					</div>
				))}
				</div>
			</div>
		);
	}
});

const SelectBox = (props) => {
	const {name, count, arr, index, handleSelect} = props;
	
	const [canSubmit, setCanSubmit] = useState(false)
	const [selection, setSelection] = useState(['', Array(count).fill('')])
	const initialOption = useRef('-- select --');

	const selectionArr = Array(count).fill(arr)

	useEffect(() => {
		const parent = document.querySelectorAll('.select-other-box');
		const select = parent[index].querySelectorAll('.custom-dropdown')

		selectionArr.map((el, num) => {
			const div = select[num]
			const list = div.children[1];
			const header = div.children[0];
			header.addEventListener('click', () => toggleList(list));
			const options = list.children;
			for (let i = 0; i < options.length; i++) {
				options[i].addEventListener('click', () => {
					let val = options[i].innerHTML;
					header.childNodes[0].nodeValue = val;
					toggleList(div.children[1]);
					singleSelect(val, name, num)
				});
			}
		})
	}, [])

	useEffect(() => {
		if (selection[0] !== '') {
			if (selection[1].length === 1) setCanSubmit(true)
			else {
				let uniqueArr = new Set(selection[1])
				const parent = document.querySelectorAll('.select-other-box');
				const select = parent[index].querySelectorAll('.custom-dropdown')
				if (selection[1].length === uniqueArr.size) {
					for (let el of select) {
						el.children[0].classList.remove('red')
					}
					setCanSubmit(true)
				} else {
					for (let el of select) {
						el.children[0].classList.add('red')
					}
					setCanSubmit(false)
				}
			}
		}
	}, [selection])

	const singleSelect = (val, cat, index) => {
		let arr = [...selection][1]
		arr.forEach((el,i) => {
			if (i === index) {
				arr[i] = val
			} else (
				arr[i] = el
			)
		})
		if (!arr.includes('')) setSelection([cat, arr])
	}

	return (
		<Fragment>
			{ selectionArr.map((el,i) => 
		( <div key={`${name}-${i}`} className="custom-dropdown">
			<div className="value-header">
				{initialOption.current}
				<div className="arrow-down"></div>
			</div>
			<ul id="select-other" className="value-list closed">
				{arr.map((el) => (
					<li key={`opt-${el}`}>{el}</li>
				))}
			</ul>
		</div> )) }
		<div className='button-container'>
			<button onClick={() => handleSelect(selection, index)} disabled={!canSubmit}><span>&#10003;</span></button>
		</div>
		</Fragment>
	)
}