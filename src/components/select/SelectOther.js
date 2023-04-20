import React, { useState, useEffect, useRef, memo } from 'react';
import { Dropdown } from '../Dropdown';
import { SubmitButton } from '../SubmitButton';

const _ = require('lodash'); 

export const SelectOther = memo(function SelectOther(props) {
	const { updateSelect, selectionDetails } = props;
	
	const parentRef = useRef();
	const [active, setActive] = useState(false);
	
	useEffect(() => {
		if (selectionDetails[1].length) {
			setActive(true);
		} else setActive(false)
	}, [selectionDetails]);

	

	const handleSelect = (arr, i) => {

		let displayBoxes = _.values(parentRef.current.querySelectorAll('.category-select'))
		displayBoxes[i].classList.add('hidden')
		if (_.every(displayBoxes, el => _.includes(_.values(el.classList), 'hidden'))) { 
			setActive(false) 
		}
		if (_.isNil(selectionDetails[1][i][3])) updateSelect(arr[1], arr[0], selectionDetails[0]);
		else updateSelect(arr[1], arr[0], selectionDetails[0], selectionDetails[1][i][3]);
		// else console.log(arr[1], arr[0], selectionDetails[0], selectionDetails[1][i][3]);		
	};

	const title = (val,i) => {
		if (_.isNil(val[3])) return (<p className='section-title line-break'>{`Select ${_.capitalize(val[0])}`}</p>)
		else if (_.isArray(val[4])) return (<p id={`${val[3]}`} className='hidden'></p>);
		else return (<p className='section-title line-break'>{`Select ${_.capitalize(val[0])}:\n${_.capitalize(val[4])}`}</p>)
	}

	if (active && selectionDetails[1].length ) {
		return (
			<div className='stat-input-container other'>
				<div ref={parentRef} id='SelectOther' className='stat-input'>
					<p className='section-title'>Additional Selections</p>
				{selectionDetails[1].map((el, i) => (
					<div className='category-select' key={el[0]}>
						{/* <p className='section-title'>Select {_.isNil(el[3]) ? _.capitalize(el[0]) : `${_.capitalize(el[0])}:\n${_.capitalize(el[4])}`}</p> */}
						{/* <p className='section-title line-break'>Select {title(el)}</p> */}
						{ title(el, i) }
						<SelectOptions name={el[0]} count={el[1]} options={el[2]} index={i} handleSelect={handleSelect} cat={el?.[3]} title={el?.[4]}/>
					</div>
				))}
				</div>
			</div>
		)
	}
});

const SelectOptions = (props) => {
	const {name, count, options, index, handleSelect, cat, title} = props;
	
	const [canSubmit, setCanSubmit] = useState(false)
	const [selection, setSelection] = useState(['', Array(count).fill('')])
	const initialOption = useRef('-- select --');
	const parentRef = useRef()
	const titleRef = useRef(title);
	const [currentOptions, setCurrentOptions] = useState(options)

	const selectionArr = Array(count).fill(options)
	

	useEffect(() => {
		if (selection[0]) {
			const divArr = parentRef.current.querySelectorAll('.custom-dropdown');
			if (_.compact(selection[1]).length === count) {
				if (_.uniq(_.compact(selection[1])).length === count) {
					[...divArr].map(div => div.children[0].classList.remove('red'))
					setCanSubmit(true);
				}
				else {
					[...divArr].map(div => div.children[0].classList.add('red'))
					setCanSubmit(false)
				}
			}			
		}
	}, [selection])

	useEffect(() => {
		if (_.isArray(titleRef.current)) {
			const headingDiv = document.getElementById(cat);
			headingDiv.innerHTML = `Select ${count}: ${title.join('\nOR ')}`
			headingDiv.classList.add('section-title', 'line-break')
			headingDiv.classList.remove('hidden')
			const radios = document.getElementsByName(`${cat}-option`)
			Array.from(radios).forEach(el => el.addEventListener('change', selectRadio))
			// addEventListener('select'))
		}
	},[])

	const selectRadio = (event) => {
		let i = event.target.value;
		titleRef.current = title[i];
		setCurrentOptions(options[i])
	}
	

	const radioSelection = () => {

		return (
			<form id="selection-form" name={cat} className='selectionRadio column'>
				{ title.map((el,i) => (
					<div>
						<input type="radio" id={el} name={`${cat}-option`} value={i}/>
						<label htmlFor={el}>{_.capitalize(el)}</label>
					</div>
				)) }
			</form>
		)
	}

	const dropSelect = (val, cat, num) => {
		let arr = [...selection][1];
		arr[num] = _.lowerCase(val);
		setSelection([cat, arr])
	}
	if (_.isArray(titleRef.current)) {
		console.log('two!')
		return radioSelection()
		
	} else {
		return (
			<div className='select-other-container' ref={parentRef} >
				{selectionArr.map((el,i) => <Dropdown key={`${name}_${i}`} cat={name} handleSelect={dropSelect} optionsArray={currentOptions} initialOption={initialOption.current} index={i} />)}
				{/* <div className='button-container'>
					<button onClick={() => handleSelect(selection, index)} disabled={!canSubmit}><span>&#10003;</span></button>
				</div> */}
				<SubmitButton canSubmit={canSubmit} submit={handleSelect} args={[selection, index]} />
			</div>
		)
	}
	
}

// const SelectBox = (props) => {
// 	const {name, count, options, index, handleSelect} = props;
	
// 	const [canSubmit, setCanSubmit] = useState(false)
// 	const [selection, setSelection] = useState(['', Array(count).fill('')])
// 	const initialOption = useRef('-- select --');
// 	const parentRef = useRef()

// 	const selectionArr = Array(count).fill(options)

// 	useEffect(() => {
// 		const divArr = parentRef.current.querySelectorAll('.custom-dropdown');
// 		for (let i = 0; i < count; i++) {
// 			addDropdownEvent(divArr[i]);
// 			addOptionEvent(divArr[i], dropSelect, [name, i])
// 		}
// 	}, [])

// 	useEffect(() => {
// 		if (selection[0]) {
// 			const divArr = parentRef.current.querySelectorAll('.custom-dropdown');
// 			if (_.compact(selection[1]).length === count) {
// 				if (_.uniq(_.compact(selection[1])).length === count) {
// 					[...divArr].map(div => div.children[0].classList.remove('red'))
// 					setCanSubmit(true);
// 				}
// 				else {
// 					[...divArr].map(div => div.children[0].classList.add('red'))
// 					setCanSubmit(false)
// 				}
// 			}			
// 		}
// 	}, [selection])

// 	const dropSelect = (val, cat, index) => {
// 		let arr = [...selection][1];
// 		arr[index] = val;
// 		setSelection([cat, arr])
// 	}

// 	return (
// 		<div ref={parentRef} >
			
// 			{ selectionArr.map((el,i) => 
// 				( <div key={`${name}-${i}`} className="custom-dropdown">
// 					<div className="value-header">
// 						{initialOption.current}
// 						<div className="arrow-down"></div>
// 					</div>
// 					<ul id="select-other" className="value-list closed">
// 						{options.map((el) => (
// 							<li key={`opt-${el}`}>{el}</li>
// 						))}
// 					</ul>
// 				</div> )) }
// 			<div className='button-container'>
// 				<button onClick={() => handleSelect(selection, index)} disabled={!canSubmit}><span>&#10003;</span></button>
// 			</div>
// 		</div>
// 	)
// }