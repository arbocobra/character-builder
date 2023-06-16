import { useEffect } from 'react';
const _ = require('lodash'); 
export const RadioButton = (props) => {
   const {name, id, num, select, option} = props;
   const displayLabel = _.isArray(option) ? option.map(el => _.capitalize(el)).join(', ') : _.capitalize(option)
   return (
      <div className='radio-container'>
         <input className='default-radio' type='radio' id={`${id}-${num}`} value={id} name={num} onChange={select}/>
         <span className='custom-radio'></span>
         <label htmlFor={`${id}-${num}`}>{displayLabel}</label>
      </div>
   )
}
export const RadioButtonAlt = (props) => {
   const {id, name, select, options} = props
   const displayLabel = (val) => _.isArray(val) ? val.map(el => _.capitalize(el)).join(', ') : val

   useEffect(() => {
      const div = document.getElementById(`radio-${id}`)
      const radioArr = Array.from(div.querySelectorAll('.custom-radio'))
      radioArr.forEach((el,i) => el.addEventListener('click', () => select(id,i)))
   },[])

   return (
      <div id={`radio-${id}`} className='row'>
         <div className='radio-container'>
            <label htmlFor={`${id}-0`}>{displayLabel(options[0])}
               <input className='default-radio' type='radio' id={`${id}-0`} value={id} name={`radio-${id}`}/>
               <span className='custom-radio'></span>
            </label>
         </div>
         <div>OR</div>
         <div className='radio-container'>
            <label htmlFor={`${id}-1`}>{displayLabel(options[1])}
               <input className='default-radio' type='radio' id={`${id}-1`} value={id} name={`radio-${id}`}/>
               <span className='custom-radio'></span>
            </label>
         </div>


         {/* {options.map((el,i) => {
            return (
               <div className='radio-container'>
                  <label htmlFor={`${id}-${i}`}>{displayLabel(el)}
                     <input className='default-radio' type='radio' id={`${id}-${i}`} value={id} name={`radio-${name[1]}`}/>
                     <span className='custom-radio'></span>
                  </label>
               </div>
         )})} */}
      </div>
   )
}