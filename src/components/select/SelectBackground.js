import React, { useEffect, useRef, memo } from 'react';
import { Background } from '../../data/Background';
import { Dropdown } from '../Dropdown';

export const SelectBackground = memo(function SelectBackground(props) {
	const { updateSelect } = props;

	const initialOption = useRef('-- select --');
	const backgroundRef = useRef();
   const optionsArray = Object.keys(Background);

	const handleSelect = (val, cat) => {
		updateSelect(val, cat)
	}

   return (
		<div ref={backgroundRef} className="stat-input-container">
         <div id="SelectBackground" className="stat-input">
            <p className='section-title'>Select Background</p>
            <Dropdown cat='background' handleSelect={handleSelect} optionsArray={optionsArray} initialOption={initialOption.current} />
         </div>
      </div>
	);
});
