import React, { useState, useEffect, useRef, memo } from 'react';
import { Dropdown } from '../Dropdown';
import { SubmitButton } from '../SubmitButton';

const _ = require('lodash'); 

export const SelectOther = memo(function SelectOther(props) {
	const { updateSelect, selectionDetails } = props;
	
	const parentRef = useRef();
	const headingRef = useRef();

	useEffect(() => {
		// const div = headingRef.current;
		// div.addEventListener('click', () => {
		// 	div.classList.toggle('open');
		// 	div.nextElementSibling.classList.toggle('hidden')
		// })
	 },[])


	
	

	// const handleSelect = (arr, i, cat) => {
	// 	if (_.isNil(selectionDetails[cat][i][3])) updateSelect(arr[1], arr[0], cat);
	// 	else updateSelect(arr[1], arr[0], cat, selectionDetails[cat][i][3]);	
	// };

	// const title = (val,i) => {
	// 	if (_.isNil(val[3])) return (<p className='section-title line-break'>{`Select ${_.capitalize(val[0])}`}</p>)
	// 	else if (_.isArray(val[4])) return (<p id={`${val[3]}`} className='hidden'></p>);
	// 	else if (_.isNil(val[4])) return (<p className='section-title line-break'>{`Select ${_.capitalize(val[0])}:\n${_.capitalize(val[3])}`}</p>)
	// 	else return (<p className='section-title line-break'>{`Select ${_.capitalize(val[0])}:\n${_.capitalize(val[4])}`}</p>)
	// }

	// const sectionTitles = (el) => el.length > 4 ? [el?.[3], el?.[4]] : undefined;
	
	return (
		<div className='stat-input-container other'>
			<div ref={headingRef} className='section-heading open'>
				<p className='section-title'>Additional Selections</p>
			</div>
			<div ref={parentRef} id='SelectOther' className='stat-input'>
				{/* { Object.keys(selectionDetails).map(cat => 
				<div className='select-other-inner-row' key={`select-other-${cat}`}>
					{selectionDetails[cat].map((el,i) => (
						<div className='category-select' key={el[0]}>
							{ title(el, i) }
							<SelectOptions name={el[0]} count={el[1]} options={el[2]} index={i} handleSelect={handleSelect} cat={cat} title={sectionTitles(el)}/>
						</div>
					))}
				</div>)} */}
			</div>
		</div>
	)
	
});

const SelectOptions = (props) => {
	const {name, count, options, index, handleSelect, cat, title} = props;
	
	const [canSubmit, setCanSubmit] = useState(false)
	const [selection, setSelection] = useState(['', Array(count).fill('')])
	const [radio, setRadio] = useState(false)
	
	const initialOption = useRef('-- select --');
	const parentRef = useRef()
	// const titleRef = useRef(title?.[1]);
	const titleRef = useRef();
	const [currentOptions, setCurrentOptions] = useState(options)

	const selectionArr = Array(count).fill(options)
	
	const titleName = _.isArray(title) ? title[0] : null;
	

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
		titleRef.current = title?.[1];
		if (_.isArray(titleRef.current)) {
			setRadio(true)
			const headingDiv = document.getElementById(titleName);
			headingDiv.innerHTML = `Select ${count}: ${titleRef.current.join('\nOR ')}`
			headingDiv.classList.add('section-title', 'line-break')
			headingDiv.classList.remove('hidden')
			const radios = document.getElementsByName(`${titleName}-option`)
			Array.from(radios).forEach(el => el.addEventListener('change', selectRadio))
		} else setRadio(false)
	},[options])

	const selectRadio = (event) => {
		let i = event.target.value;
		titleRef.current = title[1][i];
		setCurrentOptions(options[i])
	}

	const radioSelection = () => {
		return (
			
			<form id="selection-form" name={titleName} className='selectionRadio column'>
				{ titleRef.current.map((el,i) => (
					<div key={`radio-${i}`}>
						<input type="radio" id={el} name={`${titleName}-option`} value={i}/>
						<label htmlFor={el}>{_.capitalize(el)}</label>
					</div>
				)) }
			</form>
		)
	}

	const dropSelect = (val, catName, num) => {
		let arr = [...selection][1];
		arr[num] = _.lowerCase(val);
		setSelection([catName, arr])
	}
	// if (_.isArray(titleRef.current)) {
	if (radio) {
		return radioSelection()
		
	} else {
		return (
			<div className='select-other-container' ref={parentRef} >
				{selectionArr.map((el,i) => <Dropdown key={`${name}_${index}_${i}`} cat={name} handleSelect={dropSelect} optionsArray={currentOptions} initialOption={initialOption.current} index={i} />)}
				<SubmitButton canSubmit={canSubmit} submit={handleSelect} args={[selection, index, cat]} reset={null} />
			</div>
		)
	}
	
}