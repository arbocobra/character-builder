import React, { useState, useEffect, useRef, memo, useReducer } from 'react';
import { Dropdown } from '../Dropdown';
import { SubmitButton } from '../SubmitButton';
import { RadioButton, RadioButtonAlt } from '../RadioButton';
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

export const SelectAdditional = memo(function SelectAdditional(props) {
   const {selectSpecial, updateSelect, updateSelectArray, selectRef, clearSelections} = props;
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
   const radioSelect = (val,i) => {
      const index = i
      const selected = options[options.findIndex(el => el.id === val)]
      if (selected.type === 'multi') multiSelect(selected,index)
      else if (selected.type === 'direct') {
         let updateElement = {...selected};
         updateElement.category = updateElement.category.some(el => _.isArray(el)) ? updateElement.category[index] : updateElement.category;
         let result = updateElement.list[index]
         updateElement.countSelect = [1]
         if (updateElement.selected) {
            let defaultResults = _.without(updateElement.result, updateElement.list[0], updateElement.list[1])
            
            updateElement.result = [...defaultResults, result].flat(1)
         } else {
            updateElement.result = [...updateElement.result, result].flat(1)
         }
         directSelect(updateElement)
      }
   }
   const dropdownSelect = (string, id, i) => {
      let val = _.lowerCase(string)
      const selected = options[options.findIndex(el => el.id === id)]
      let updateElement = {...selected};
      if (updateElement.count < 2) {
         // updateElement.result = [...updateElement.result, val].flat(1)
         updateElement.countSelect = [1]
         if (updateElement.selected) {
            let defaultResults = _.without(updateElement.result, ...updateElement.list)
            updateElement.result = [...defaultResults, val].flat(1)
         } else updateElement.result = [...updateElement.result, val].flat(1)
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
      if (element.category.some(el => _.isArray(el))) {
         updateSelectArray(element.result, element.category)
         // element.category.forEach((arr,i) => updateSelectArray([element.result[i]].flat(1), arr[1], arr[0], arr?.[2]))
      } else {
         updateSelect(element.result, element.category[1], element.category[0], element.category?.[2])
      }
      deleteSelection(element.id)
   }

   const catNameDisplay = (cat) => {
      return (<p className='subhead'>{_.capitalize(cat)}</p>)
   }

   const selectContainer = (option) => {
      const displayName = option.name.length === 1 ? (<p>Select {_.capitalize(option.name[0])}</p>) : (<p>Select {_.capitalize(option.name[0])}: {_.capitalize(option.name[1])}</p>)
      const optionSelect = option.type === 'multi' || option.list.length < 3 ? optionRadio(option) : optionDropdown(option)

      return (
         <div className='select-additional-row' key={option.id}>
            {displayName}
            {optionSelect}
         </div>
      )
   }

   const optionRadio = (element) => {
      let option0 = element.list[0]
      let option1 = element.list[1]
      

      return (
         <div>
            
               <RadioButtonAlt id={element.id} name={element.name} select={radioSelect} options={element.list} />
            {element.selected ? 
            <div className='complete-selection'>
               {`Selected: ${element.result}`}
               <SubmitButton canSubmit={true} submit={handleSubmit} args={[element]} reset={false} addClass={'small'}/>
               {/* <input type='button' value='Submit' onClick={(() => handleSubmit(element))} />  */}
            </div> : null}
         </div>
      )
   }

   const optionDropdown = (element) => {
      let count = Array(element.count).fill(0)
      // console.log(element.list)
      return (
         <div>
            <div className='row'>
               { count.map((el,i) => <Dropdown key={`${element.id}-${i}`} cat={element.id} handleSelect={dropdownSelect} optionsArray={element.list} initialOption='-- select --' index={i} />)}
            </div>
            {element.selected ? 
            <div className='complete-selection'>
               {`Selected: ${element.result}`}
               <SubmitButton canSubmit={true} submit={handleSubmit} args={[element]} reset={false} addClass={'small'}/>
               {/* <input type='button' value='Submit' onClick={(() => handleSubmit(element))} />  */}
            </div> : null}
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

   const selectCats = Object.keys(selectSpecial).filter(cat => !_.isEmpty(selectSpecial[cat]))

   return (
      <div className="stat-input-container">
         <div className='display-heading open'>
            <p className='section-title'>Select Additional</p>
         </div>
         <div className='stat-input'>
            { selectCats.map(cat => (<div key={`${cat}-options`}>{catNameDisplay(cat)}{ options.map(el => el.section === cat ? selectContainer(el) : null) }</div>))}
            {/* { options.map(cat => selectContainer(cat))} */}
         </div>
      </div>
   )
})