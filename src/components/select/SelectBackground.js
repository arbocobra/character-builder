import React, { useEffect, useRef, memo } from 'react';
import { addDropdownEvent, addOptionEvent } from '../selectFunctions'
import { Background } from '../../data/Background';

export const SelectBackground = memo(function SelectBackground(props) {
	const { updateSelect } = props;

	const initialOption = useRef('-- select --');
	const backgroundRef = useRef();

	const backgroundOptions = Object.keys(Background)	

	useEffect(() => {
		addDropdownEvent(backgroundRef.current)
		addOptionEvent(backgroundRef.current, handleSelect, ['background'])
	}, []);

	const handleSelect = (val, cat) => {
		updateSelect(val, cat)
	}

	return (
		<div className="stat-input-container">
         <div id="SelectBackground" className="stat-input">
            <p>Select Background</p>
            <div ref={backgroundRef} className="custom-dropdown">
               <div className="value-header">
                  {initialOption.current}
                  <div className="arrow-down"></div>
               </div>
               <ul id="select-background" className="value-list closed">
                  {backgroundOptions.map((el) => (
                     <li key={`background-${el}`}>{el}</li>
                  ))}
               </ul>
            </div>
            {/* <div ref={variantRef} className="custom-dropdown hidden">
               <div ref={headerRef} className="value-header">
                  {variantInitialOption.current}
                  <div className="arrow-down"></div>
               </div>
               <ul ref={optionsRef} id="select-background" className="value-list closed">
                  {variantOpt.map((el) => (
                     <li key={`variant-${el}`}>{el}</li>
                  ))}
               </ul>
            </div> */}
         </div>
      </div>
	);
});
