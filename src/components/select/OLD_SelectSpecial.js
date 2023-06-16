import React, { useState, useEffect, useRef, memo } from 'react';
import { Dropdown } from '../Dropdown';
import { SubmitButton } from '../SubmitButton';
const _ = require('lodash'); 

export const SelectSpecial = (props) => {
   const {selectSpecial, updateSelect, selectRef} = props;
   
	// console.log(selectCats)
	// const [selectCount, setSelectCount] = useState(null)
	// const [selectCountObj, setSelectCountObj] = useState({})
	const firstRender = useRef(true)
	// const prevDisplay = useRef()
	// const allSelections = useRef(null)

	const selectCats = useRef(Object.keys(selectSpecial).filter(cat => !_.isEmpty(selectSpecial[cat])))

	const initalSelectDisplay = () => {
		const init = {};
		Object.keys(selectSpecial).forEach(cat => {
			if (!_.isEmpty(selectSpecial[cat])) {
				let arrLength = selectSpecial[cat].direct.length + selectSpecial[cat].multi.length;
				init[cat] = [...Array(arrLength).keys()]
			}
		})
		return init;
	}

	const [selectDisplay, setSelectDisplay] = useState(() => initalSelectDisplay())

	// const selectCats = Object.keys(selectSpecial).filter(cat => !_.isEmpty(selectSpecial[cat])) 	

	useEffect(() => {
		if (!firstRender.current) {
			console.log('selectSpecial');
			setSelectDisplay((current) => {
				let curr = {...current}
				Object.keys(selectSpecial).forEach(cat => {
					if (!_.isEmpty(selectSpecial[cat])) {
						let arrLength = selectSpecial[cat].direct.length + selectSpecial[cat].multi.length
						// if (!_.has(current, cat)) curr = {...current, [cat]: [...Array(arrLength).keys()]}
						// else curr[cat] = [...Array(arrLength).keys()]
						curr[cat] = [...Array(arrLength).keys()]
					}})
					// console.log(selectSpecial[cat].direct.length + selectSpecial[cat].multi.length)})
				return curr
			})
		}
	}, [selectSpecial])

	// useEffect(() => {
	// 	console.log('render');
	// 	console.log(prevDisplay.current)
	// 	setSelectDisplay((current) => {
	// 		let temp = {...current}
	// 		Object.keys(selectSpecial).forEach(cat => {
	// 			if (!_.isEmpty(selectSpecial[cat])) {
	// 				let arrLength = selectSpecial[cat].direct.length + selectSpecial[cat].multi.length
	// 				if (!_.has(current, cat)) temp = {...current, [cat]: [...Array(arrLength).keys()]}
	// 				else temp[cat] = [...Array(arrLength).keys()]
	// 			}})
	// 			// console.log(selectSpecial[cat].direct.length + selectSpecial[cat].multi.length)})
	// 		return temp
	// 	})
	// }, [selectSpecial])

	// useEffect(() => {
	// 	// allSelections.current = JSON.parse(JSON.stringify(selectSpecial))
	// 	// console.log('change')
	// 	// console.log(selectRef)
	// 	// if (selectCats.includes(selectRef)) {
	// 	// 	console.log('clear')
	// 	// }
		

	// 	// selectCats.current = Object.keys(allSelections.current).filter(cat => !_.isEmpty(allSelections.current[cat])) 	
	// 	// const count = selectCats.current.map(cat => [...allSelections.current[cat].multi, ...allSelections.current[cat].direct]).flatMap(el => el.map(e => `${e.catName}-${e.index}`))
	// 	const count = selectCats.map(cat => [...selectSpecial[cat].multi, ...selectSpecial[cat].direct]).flatMap(el => el.map(e => `${e.catName}-${e.index}`))
	// 		setSelectCount(count)

	// }, [selectSpecial])

	// useEffect(() => {
	// 	prevDisplay.current = selectDisplay
	// }, [selectDisplay])

	// useEffect(() => {
	// 	allSelections.current = JSON.parse(JSON.stringify(selectSpecial))
	// 	selectCats.current = Object.keys(allSelections.current).filter(cat => !_.isEmpty(allSelections.current[cat])) 	
	// 	const count = selectCats.current.map(cat => [...allSelections.current[cat].multi, ...allSelections.current[cat].direct]).flatMap(el => el.map(e => `${e.catName}-${e.index}`))
	// 		setSelectCount(count)
		
	// 	// if (selectCats.current.length) {
	// 		// const count = selectCats.map(cat => [...selectSpecial[cat].multi, ...selectSpecial[cat].direct]).flatMap(el => el.map(e => `${e.catName}-${e.index}`))
	// 	// }
		
	// }, [selectSpecial])

	// useEffect(() => {
	// 	console.log('selectCount')
	// 	console.log(selectCount)

	// },[selectCount])
	
	useEffect(() => { firstRender.current = false }, [])

	const handleSubmit = (select,i) => {
		// console.log(select)
		const catSection = select.catSection
		const countId = `${catSection}-${i}`
		// console.log(countId)
		if (select.catType === 'list') {
			const catTrait = select.cat[1]
			const catSubTrait = select.cat[2] ? select.cat[2] : null
			const val = select.result
			// console.log('val')
			// console.log(val)
			updateSelect(val, catTrait, [catSection, catSubTrait])
		} else if (select.catType === 'array') {
			select.cat.forEach((cat,i) => {
				const catTrait = cat[1]
				const catSubTrait = cat[2] ? cat[2] : null
				const val = select.result[i]
				// console.log('val')
				// console.log(val)
				updateSelect(val, catTrait, [catSection, catSubTrait])
			})
		}
		// setSelectCount((current) => {
		// 	let index = current.indexOf(countId);
		// 	return [...current.slice(0,index), ...current.slice(index + 1)]
		// })

		// let val, cat, trait;
		// const selectedVal = selectArr[0]
		// const allCats = selectArr[1]
		// const objRef = selectArr?.[2] ? selectArr[2] : null;
		// if (objRef) val = [...objRef.result, ...selectedVal];
		// else val = selectedVal
		
		// if (_.isString(allCats[0])) {
		// 	cat = allCats[0]
		// 	trait = allCats[1]
		// 	updateSelect(val, trait, allCats)
			
		// // else allCats.forEach((cat,i) => )
		// } else if (_.isArray(allCats[0])) {
		// 	cat = allCats[0][0]
		// 	trait = allCats[0][1]
		// 	allCats.forEach((el,i) => updateSelect(val[i], trait, el))
		// }
		// const filterVal = `${cat}-${i}`
		// setSelectCount((current) => {
		// 	let index = current.indexOf(filterVal);
		// 	return [...current.slice(0,index), ...current.slice(index + 1)]
		// })

		// const val = selectArr[0];
		// const catArr = selectArr[1];
		// const trait = catArr[1]
		// let filterVal = `${catArr[0]}-${i}`

		// updateSelect(val, trait, catArr)
	}
   
   return (
		<div className="stat-input-container">
			<div className='display-heading open'>
				<p className='section-title'>Select Additional</p>
			</div>
         {/* <div>{ selectCats.length ? selectCats.map(cat => <SelectionCategory key={`select-${cat}`}  cat={cat} obj={selectSpecial[cat]} handleSubmit={handleSubmit} />) : null}</div> */}
			
			{/* <div>{ selectCats.current.length ? selectCats.current.map(cat => <SelectionCategory key={`select-${cat}`}  cat={cat} obj={selectSpecial[cat]} handleSubmit={handleSubmit} />) : null}</div> */}
			<div>{ Object.keys(selectDisplay).map(cat => selectDisplay[cat].length ? <SelectionCategory key={`select-${cat}`}  cat={cat} obj={selectSpecial[cat]} handleSubmit={handleSubmit} /> : null) }</div>
      </div>
	);
}

const SelectionCategory = (props) => {
   const {cat, obj, handleSubmit} = props;

	const [multiSelect, setMultiSelect] = useState(obj.multi)
	const [directSelect, setDirectSelect] = useState(obj.direct)
	// const [currentSelection, setCurrentSelection] = useState([])

	useEffect(() => {
		console.log('obj render')
	},[obj])

	// const updateArrays = (val,i,type) => {
	// 	if (type === 'radioToList') {
	// 		const id = multiSelect.findIndex(el => el.index === i)
	// 		setMultiSelect((current) => [...current.slice(0,id), ...current.slice(id + 1)])
	// 		val.index = i;
	// 		setDirectSelect((current) => [val, ...current])
	// 	} else if (type === 'radioToResult') {
	// 		handleSubmit(val,i)
	// 		const id = multiSelect.findIndex(el => el.index === i)
	// 		setMultiSelect((current) => [...current.slice(0,id), ...current.slice(id + 1)])
	// 	} else if (type === 'listToResult') {
	// 		console.log('updateArrays - list to result')
	// 		console.log(val)
	// 		console.log(i)
	// 		handleSubmit(val,i)
	// 		const id = directSelect.findIndex(el => el.index === i)
	// 		setDirectSelect((current) => [...current.slice(0,id), ...current.slice(id + 1)])
	// 	}
	// 	setCurrentSelection([])
	// }
	
	const updateRadioToList = (val) => {
		let i = val.index;
		const id = multiSelect.findIndex(el => el.index === i)
		setMultiSelect((current) => [...current.slice(0,id), ...current.slice(id + 1)])
		// val.index = i;
		setDirectSelect((current) => [val, ...current])
	}
	const updateRadioToResult = (val) => {
		let i = val.index;
		handleSubmit(val,i)
		const id = multiSelect.findIndex(el => el.index === i)
		setMultiSelect((current) => [...current.slice(0,id), ...current.slice(id + 1)])
	}

	const listToResult = (val) => {
		let i = val.index;
		handleSubmit(val,i)
		const id = directSelect.findIndex(el => el.index === i)
		setDirectSelect((current) => [...current.slice(0,id), ...current.slice(id + 1)])
	}

	// useEffect(() => {
	// 	console.log('currentselection:')
	// 	console.log(currentSelection)
	// 	// if (currentSelection.length) {
	// 	// 	updateArrays(currentSelection[0],currentSelection[1],currentSelection[2])
	// 	// }
	// }, [currentSelection])

	const handleSelect = (val,type) => {
		// console.log('handleSelect')
		// console.log(type)
		// console.log(val)
		
		// console.log(i)
		if (type === 'listToResult') {
			const valObject = val[1]
			let selection = val[0]
			let initResults = valObject.result
			valObject.result = [...initResults, ...selection].flat();
			listToResult(valObject)
			// const finalVal = val[0].flat(2)
			// val.splice(0,1,finalVal)
		} 
		else if (type === 'radioToList') updateRadioToList(val)
		else if (type === 'radioToResult') updateRadioToResult(val)
		// setCurrentSelection([val,i,type])
	}

   return (
      <div className="stat-input">
               <p>{cat}</p>
					{ multiSelect.length ? 
					<div>
						{ multiSelect.map(el => <SelectionRadio key={`option-${el.index}`} option={el} nameArr={el.name} index={el.index} handleSelect={handleSelect} />) }
					</div> : null}
					{ directSelect.length ?  
					<div>{ directSelect.map(el => <SelectionList key={`option-${el.index}`} option={el} nameArr={el.name} index={el.index} count={el.count} handleSelect={handleSelect} selectIndex={_.has(el,'selectIndex') ? el.selectIndex : null} />) }
					</div> : null}
            </div>
   )
}

const SelectionRadio = (props) => {
   const {option, nameArr, index, handleSelect} = props;
	// const [returnArray, setReturnArray] = useState([])
	const returnArray = useRef([])

   const cat = nameArr[0];
	const catName = nameArr?.[1];
	const displayName = nameArr.map((word,i) => i === 0 ? (<span key={`name-${index}-${i}`}>{_.capitalize(word)}:</span>) : (<span key={`name-${index}-${i}`}><br/><b>{_.capitalize(word)}</b></span>))

	useEffect(() => {
		option.direct.forEach((opt,i) => {
			const selection = {
				index: option.index,
				// displayCat: option.name,
				catSection: option.catName,
			}
			selection.catType = opt.cat.some(el => _.isArray(el)) ? 'array' : 'list';
			// selection.selectionDisplay = option.init[i];
			Object.assign(selection, opt)
			returnArray.current.push(selection)
			// setReturnArray((current) => [...current, selection])
			// console.log('selection')
			// console.log(selection)
		})

	},[])

	// useEffect(() => {
	// 	console.log('return array')
	// 	console.log(returnArray)
	// },[returnArray])

   useEffect(() => {
		const divArr = document.getElementsByName(`${cat}-${catName}-${index}`)
		Array.from(divArr).forEach(div => div.addEventListener('change', radioSelect))
	},[])

	const radioSelect = (event) => {
		let i = Number(event.target.value);
		const result = returnArray.current[i]
		// option.direct[i].selectIndex = i;
		// const val = option.direct[i]
		// if (_.isEmpty(val.list)) handleSelect([val.result, val.cat], index, 'radioToResult')
		// else handleSelect(val, index, 'radioToList')
		if (_.isEmpty(result.list)) handleSelect(result, 'radioToResult')
		else handleSelect(result, 'radioToList')
	}

   return (
      <div>
         <p>{displayName}</p>
         {option.init.map((el,i) => (
				<div key={`radio-${index}-${i}`}>
					<input type='radio' id={`${cat}-${catName}-${index}-${i}`} name={`${cat}-${catName}-${index}`} value={i}/>
					<label htmlFor={`${cat}-${catName}-${index}-${i}`}>{el}</label>
				</div>
			))}
      </div>
   )
}

const SelectionList = (props) => {
   const {option, nameArr, index, count, handleSelect} = props;
	const countArr = Array(count).fill('')

	const [canSubmit, setCanSubmit] = useState(false);
	const [selection, setSelection] = useState([...countArr])
	const initialOption = useRef('-- select --');
	const returnArray = useRef({})

	
	const displayName = nameArr.map((word,i) => i === 0 ? 
		(<span key={`name-${index}-${i}`}>{_.capitalize(word)}:</span>) : 
		(<span key={`name-${index}-${i}`}><br/><b>{_.capitalize(word)}</b></span>))
	const currentOptions = option.list;

	useEffect(() => {
		const selection = {
			index: option.index,
			// displayCat: option.name,
			cat: option.cat,
			count: option.count,
			// catSection: option.catName,
			result: option.result,
			list: option.list,
		}
		
		selection.catSection = option.catName ||= option.catSection;
		selection.catType = option.cat.some(el => _.isArray(el)) ? 'array' : 'list';
		returnArray.current = selection
		// console.log('selection')
		// console.log(selection)
	},[])

	// useEffect(() => setSelection(Array(count).fill('')),[])

	const dropSelect = (countIndex, i) => {
		// console.log(index)
		// console.log(i)
		const val = currentOptions[i]
		// const index = returnArray.current.index;
		if (returnArray.current.catType === 'array') {
			if (returnArray.current.cat.some(arr => arr.some(el => _.isArray(el)))) returnArray.current.cat = returnArray.current.cat[i]
			// console.log(returnArray.current.cat)
		}
		setSelection((current) => [...current.slice(0,countIndex), val, ...current.slice(countIndex + 1)])
	}

	// const findListValue = (val) => {
	// 	let lowVal = val.toLowerCase();
	// 	const valArr = _.split(lowVal,',')
	// 	const listVals = option.list;
	// 	return listVals.filter(el => _.isEqual(el, valArr))
	// }

	useEffect(() => {
		if (_.compact(selection).length) {
			// console.log(selection)
			if (_.uniq(_.compact(selection)).length === count) setCanSubmit(true)
			else setCanSubmit(false)
			// console.log(selection)
		}
	}, [selection])

   return (
      <div>
         <p>{displayName}</p>
			{countArr.map((el,i) => <Dropdown key={`dropdown-${index}-${i}`} cat={option.cat} handleSelect={dropSelect} optionsArray={currentOptions} initialOption={initialOption.current} index={i} returnSelectIndex={true}/>)}
			<SubmitButton canSubmit={canSubmit} submit={handleSelect} args={[[selection, returnArray.current], 'listToResult']} reset={null} />
      </div>
   )
}