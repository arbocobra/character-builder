import React, { useEffect, useRef, memo } from 'react';
import { Background } from '../../data/Background';
import { Dropdown } from '../Dropdown';

export const SelectBackground = memo(function SelectBackground(props) {
	const { updateSelect } = props;

	const initialOption = useRef('-- select --');
	const backgroundRef = useRef();
   const optionsArray = Object.keys(Background);
	// const backgroundOptions = Object.keys(Background);
   

	// useEffect(() => {
	// 	addDropdownEvent(backgroundRef.current)
	// 	addOptionEvent(backgroundRef.current, handleSelect, ['background'])
	// }, []);

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
   // return (
	// 	<div className="stat-input-container">
   //       <div id="SelectBackground" className="stat-input">
   //          <p className='section-title'>Select Background</p>
   //          <div ref={backgroundRef} className="custom-dropdown">
   //             <div className="value-header">
   //                {initialOption.current}
   //                <div className="arrow-down"></div>
   //             </div>
   //             <ul id="select-background" className="value-list closed">
   //                {backgroundOptions.map((el) => (
   //                   <li key={`background-${el}`}>{el}</li>
   //                ))}
   //             </ul>
   //          </div>
   //       </div>
   //    </div>
	// );
});
