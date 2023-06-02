import React, { useState, useEffect, useRef, memo, useReducer } from 'react';
import { Dropdown } from '../Dropdown';
const _ = require('lodash'); 

const optionReducer = (options, action) => {
   switch (action.method) {
      case 'add': {
         return [
            ...options,
            {
               section: action.section,
               type: action.type,
               name: action.name,
               list: action.list,
               count: action.count,
               countSelect: action.countSelect,
               category: action.category,
               result: [],
               selected: false,
               id: `${action.section}-${action.index}`,
            }
         ]
      }
      case 'delete': {
         return options.filter(opt => opt.id !== action.id)
      }
      case 'multiToDirect': {
         return options.map(opt => {
            if (opt.id === action.id) {
               return Object.assign(opt, action.option);
            } else return opt
         })
      }
      case 'multiToResult': {
         return options.map(opt => {
            if (opt.id === action.id) {
               return {
                  ...opt,
                  category: action.category,
                  selected: true,
                  result: action.result,
               }
            } else return opt
         })
      }
      case 'directToResult': {
         return options.map(opt => {
            if (opt.id === action.id) {
               return Object.assign(opt, action.option);
            } else return opt
         })
      }
      case 'directToPartial': {
         return options.map(opt => {
            if (opt.id === action.id) {
               return Object.assign(opt, action.option);
            } else return opt
         })
      }
   }
}

const initOptions = (select, cat) => {
   const init = [];
   for (let type in select[cat]) {
      if (!_.isEmpty(select[cat][type])) {
         for (let selection of select[cat][type]) {
            let option = {
               section: cat,
               type: type,
               name: selection.name,
               list: type === 'direct' ? selection.list : selection.init,
               count: type === 'direct' ? selection.count : null,
               countSelect: type === 'direct' ? Array(selection.count).fill(0) : null,
               category: type === 'direct' ? selection.cat : null,
               result: [],
               selected: false,
               id: `${cat}-${selection.index}`,
            }
            init.push(option)
         }
      }
   }
   return init;
}

export const TestSpecial = (props) => {
   const {selectSpecial, updateSelect, selectRef, clearSelections} = props;
   const initRender = useRef(true)
   const submitCategory = useRef(selectRef)
   const [options, dispatch] = useReducer(optionReducer, initOptions(selectSpecial, selectRef))

   useEffect(() => {
      if (!initRender.current) {
         if (_.some(options, ['section', selectRef])) replaceCategory(selectRef)
         else if (selectRef) {
            if (!_.isEmpty(selectSpecial[selectRef].direct)) selectSpecial[selectRef].direct.forEach(el => addSelection(el, 'direct'))
            if (!_.isEmpty(selectSpecial[selectRef].multi)) selectSpecial[selectRef].multi.forEach(el => addSelection(el, 'multi'))
         }
      }
   }, [selectSpecial])

   const addSelection = (opt, type) => {
      dispatch({
         method: 'add',
         type: type,
         section: opt.catName,
         name: opt.name,
         list: type === 'direct' ? opt.list : opt.init,
         count: type === 'direct' ? opt.count : null,
         countSelect: type === 'direct' ? Array(opt.count).fill(0) : null,
         category: type === 'direct' ? opt.cat : null,
         index: opt.index
      })
   }
   const deleteSelection = (val) => {
      dispatch({
         method: 'delete',
         id: val
      })
   }
   const replaceCategory = (cat) => {
      for (let opt of options) {
         if (opt.section === cat) deleteSelection(opt.id)
      }
      if (!_.isEmpty(selectSpecial[cat].direct)) selectSpecial[cat].direct.forEach(el => addSelection(el, 'direct'))
      if (!_.isEmpty(selectSpecial[cat].multi)) selectSpecial[cat].multi.forEach(el => addSelection(el, 'multi'))
   }
   const multiSelect = (element, i) => {
      let mainIndex = Number.parseInt(element.id.split('-')[1])
      let multiEntry = selectSpecial[element.section].multi
      let mainEntry = multiEntry[multiEntry.findIndex(el => el.index === mainIndex)].direct[i]
      if (_.isEmpty(mainEntry.list)) {
         dispatch({
            method: 'multiToResult',
            id: element.id,
            result: mainEntry.result,
            category: mainEntry.cat,
         })
      } else {
         dispatch({
            method: 'multiToDirect',
            id: element.id,
            option: {
               type: 'direct',
               list: mainEntry.list,
               result: mainEntry.result,
               category: mainEntry.cat,
               count: mainEntry.count,
               countSelect: Array(mainEntry.count).fill(0),
               selected: false,
            }
         })
      }
      // let updatedList = _.isEmpty(mainEntry.list) ? element.list : mainEntry.list;
      
   }
   const directSelect = (element) => {
      dispatch({
         method: 'directToResult',
         id: element.id,
         option: {
            result: element.result,
            category: element.category,
            countSelect: element.countSelect,
            selected: true,
         }
      })
   }
   const directSelectPartial = (element) => {
      dispatch({
         method: 'directToPartial',
         id: element.id,
         option: {
            result: element.result,
            countSelect: element.countSelect,
         }
      })
   }
   
   const radioSelect = (e) => {
      const index = Number(e.target.name)
      const selected = options[options.findIndex(el => el.id === e.target.value)]
      if (selected.type === 'multi') multiSelect(selected,index)
      else if (selected.type === 'direct') {
         let updateElement = {...selected};
         updateElement.category = updateElement.category.some(el => _.isArray(el)) ? updateElement.category[index] : updateElement.category;
         let result = updateElement.list[index]
         updateElement.countSelect = [1]
         updateElement.result = [...updateElement.result, result].flat(1)
         // console.log(updateElement)
         directSelect(updateElement)
      }
   }

   const dropdownSelect = (string, id, i) => {
      let val = _.lowerCase(string)
      const selected = options[options.findIndex(el => el.id === id)]
      let updateElement = {...selected};
      if (updateElement.count < 2) {
         updateElement.result = [...updateElement.result, val].flat(1)
         updateElement.countSelect = [1]
         directSelect(updateElement)
      } else {
         updateElement.countSelect.splice(i, 1, 1)
         if (updateElement.countSelect.some(el => el === 0)) {
            updateElement.result = [...updateElement.result, val].flat(1)
            directSelectPartial(updateElement)
         } else {
            if (updateElement.result.length === updateElement.count) updateElement.result.splice(i, 1, val).flat(1)  
            else updateElement.result = [...updateElement.result, val].flat(1)
            directSelect(updateElement)
         } 
      }
   }

   const handleSubmit = (element) => {
      submitCategory.current = element.section
      if (element.category.some(el => _.isArray(el))) element.category.forEach((arr,i) => updateSelect(element.result[i], arr[1], arr[0], arr?.[2]))
      else updateSelect(element.result, element.category[1], element.category[0], element.category?.[2])
      deleteSelection(element.id)
   }

   const selectContainer = (option) => {
      const displayName = option.name.length === 1 ? (<p>Select {_.capitalize(option.name[0])}</p>) : (<p>Select {_.capitalize(option.name[0])}: {_.capitalize(option.name[1])}</p>)
      // const checkBox = (<input type='checkbox' value={option.id} onChange={handleChange} checked={option.selected} />)
      const optionSelect = option.type === 'multi' || option.list.length < 3 ? optionRadio(option) : optionDropdown(option)

      return (
         <div className='full-width' key={option.id}>
            {displayName}
            {optionSelect}
         </div>
      )
   }

   const optionRadio = (element) => {
      let option0 = element.list[0]
      let option1 = element.list[1]
      // let isSelected = element.selected
      return (
         <div className='row'>
            <div>
               <input type='radio' id={`${element.id}-0`} value={element.id} name='0' onChange={radioSelect}/>
               <label htmlFor={`${element.id}-0`}>{_.isArray(option0) ? option0.join(', ') : option0}</label>
            </div>
            <div>OR</div>
            <div>
               <input type='radio' id={`${element.id}-1`} value={element.id} name='1' onChange={radioSelect} />
               <label htmlFor={`${element.id}-1`}>{_.isArray(option1) ? option1.join(', ') : option1}</label>
            </div>
            {element.selected ? <div>{`Selected: ${element.result} (${element.section})`}<input type='button' value='Submit' onClick={(() => handleSubmit(element))} /> </div> : null}
         </div>
      )
   }

   const optionDropdown = (element) => {
      let count = Array(element.count).fill(0)
      // console.log(element.list)
      return (
         <div className='row'>
            { count.map((el,i) => <Dropdown key={`${element.id}-${i}`} cat={element.id} handleSelect={dropdownSelect} optionsArray={element.list} initialOption='-- select --' index={i} />)}
            {element.selected ? <div>{`Selected: ${element.result} (${element.section})`}<input type='button' value='Submit' onClick={(() => handleSubmit(element))} /> </div> : null}
         </div>
      )
   }

   useEffect(() => {
      if (!_.some(options, ['section', submitCategory.current]) && submitCategory.current) {
         clearSelections(submitCategory.current)
         submitCategory.current = null;
      }
   },[optionReducer, options])
   
   useEffect(() => {
      initRender.current = false
   }, [])

   return (
      <div className="stat-input-container">
         <div className='display-heading open'>
            <p className='section-title'>Test</p>
         </div>
         <div className='stat-input'>
            { options.map(cat => selectContainer(cat))}
         </div>
      </div>
   )
}


// export const TestSpecial = (props) => {
// const {selectSpecial, updateSelect, selectRef} = props;
// const [allSelection, setAllSelection] = useState({race: [], class: [], background: []})

// useEffect(() => {
//    setAllSelection(current => {
//       let update;
//       Object.keys(current).map(el => {
//          if (el === selectRef) {
//             if (!_.isEmpty(current[el])) clearChecklistEvent()
//             let arr = []
//             if (!_.isEmpty(selectSpecial[el].direct)) selectSpecial[el].direct.forEach(e => arr.push(false))
//             if (!_.isEmpty(selectSpecial[el].multi)) selectSpecial[el].multi.forEach(e => arr.push(false))
//             update = {...current, [el]: arr}
//          }
//       })
//       return update
//    })
//    addCheckListEvent()
// }, [selectSpecial])

// const addCheckListEvent = () => {
//    const checkList = document.getElementsByName('select-check');
//    for (let i = 0; i < checkList.length; i++) {  
//       if (!Array.from(checkList[i].classList).includes('event')) {
//          checkList[i].addEventListener('change', (event) => updateSelections(event.target.checked, event.target.value))
//          checkList[i].classList.add('event')
//       }
//    }
// }

// const clearChecklistEvent = () => {
//    const checkList = document.getElementsByName('select-check');
//    for (let i = 0; i < checkList.length; i++) {
//       const cat = checkList[i].value.split(',')[0]
//       if (cat === selectRef) {
//          checkList[i].removeEventListener('change', updateSelections)
//          checkList[i].checked = false
//          checkList[i].classList.remove('event')
//       }
//    }
// }

// const updateSelections = (isChecked, val) => {
//    const cat = val.split(',')[0]
//    const i = Number(val.split(',')[1])
//    setAllSelection(current => {
//       let update = [...current[cat].slice(0, i), isChecked, ...current[cat].slice(i + 1)]
//       return ({...current, [cat]: update})
//    })
// }


// return (
//    <div className="stat-input-container">
//       <div className='display-heading open'>
//          <p className='section-title'>Test</p>
//       </div>
//       { Object.keys(selectSpecial).map(cat => !_.isEmpty(selectSpecial[cat]) ? <CategoryDiv key={`${cat}-select`} catName={cat} cat={selectSpecial[cat]} /> : null) }
//       {/* { Object.keys(selectSpecial).map(cat => !_.isEmpty(selectSpecial[cat]) ? categoryDiv(cat) : null)} */}
//    </div>
// )
// }

// const CategoryDiv = (props) => {
//    const {catName, cat} = props
//    // const [multiSelect, setMultiSelect] = useState(cat.multi)
// 	// const [directSelect, setDirectSelect] = useState(cat.direct)
//    // console.log(cat)

//    return (
//       <div key={catName}>
//          {catName}
//          {/* { multiSelect.length ? <CategoryList key={`${catName}-multi`} section={cat.multi} catName={catName} sectionName='multi' /> : null} */}
//          {/* { directSelect.length ? <CategoryList key={`${catName}-direct`} section={cat.direct} catName={catName} sectionName='direct' /> : null} */}
//          {/* { Object.keys(cat).map(section => _.isEmpty(cat[section]) ? null : categoryList(cat[section], [cat, section].join('-'))) } */}
//          {/* { Object.keys(cat).map(section => _.isEmpty(cat[section]) ? null : <CategoryList key={`${catName}-${section}`} section={cat[section]} />) } */}
//       </div>
//    )
// }

// // const CategoryList = (props) => {
// //    const {section, catName, sectionName} = props
// //    //  console.log(section)
// //     return (
// //       // <ul key={keyName}>
// //       <ul>
// //          {section.map((el,i) => (<li key={i}>{el.name.join(' ')}<input type='checkbox' name='select-check' value={[el.catName, el.index]}/></li>))}
// //       </ul>
// //    )
// // }

// // const categoryList = (section, keyName) => {
// //    // console.log(section)
// //    return (
// //       <ul key={keyName}>
// //          {section.map((el,i) => (<li key={i}>{el.name.join(' ')}<input type='checkbox' name='select-check' value={[el.catName, el.index]}/></li>))}
// //       </ul>
// //    )
// // }