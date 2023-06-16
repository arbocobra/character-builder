import React, { useRef, memo } from 'react';
import { Background } from '../../data/Background';
import { Dropdown } from '../Dropdown';
const _ = require('lodash'); 

export const SelectBackground = memo(function SelectBackground(props) {
	const { updateSelect } = props;

	const initialOption = useRef('-- select --');
	const backgroundRef = useRef();
   const optionsArray = Object.keys(Background.background);

	const handleSelect = (val, cat) => {
		updateSelect(_.lowerCase(val), cat)
	}

   return (
		<div ref={backgroundRef} className="stat-input-container">
			<div className='section-heading'>
				<p className='section-title'>Select Background</p>
			</div>
         <div id="SelectBackground" className="stat-input hidden">
            <Dropdown cat='background' handleSelect={handleSelect} optionsArray={optionsArray} initialOption={initialOption.current} />
         </div>
      </div>
	);
});
