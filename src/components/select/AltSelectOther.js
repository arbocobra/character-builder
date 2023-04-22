import React, { useState, useEffect, useRef, memo } from 'react';
import { Dropdown } from '../Dropdown';
import { SubmitButton } from '../SubmitButton';

const _ = require('lodash'); 

export const AltSelectOther = memo(function AltSelectOther(props) {
	const { updateSelect, selectionDetails } = props;

   useEffect(() => console.log(selectionDetails))

   const addChecks = (cat, i) => {
      const div = document.getElementById(cat);
      console.log(div)
      // const input = document.createElement('input');
      // input.setAttribute('type', 'checkbox')
      // input.setAttribute('id', `${id[0]}-${i}`)
      // input.setAttribute('checked', 'false');
      // div.append(input);
   }

   if (_.isEmpty(selectionDetails)) {
      return (<div>Hello</div>)
   } else {
      return Object.keys(selectionDetails).map(el => 
         (<div key={`select-${el}`}>
            <div>{el}</div>
            { selectionDetails[el].map(cat => 
               (<div key={`select-${el}-${cat[0]}`}>
                  <div id={cat[0]} >{cat[0]}</div>
                  {addChecks(cat[0])}
                  {/* { Array(cat[1]).fill('').map((_,i) => addChecks(cat[0],i)) } */}
               </div>)) }
         </div>))
   }
})