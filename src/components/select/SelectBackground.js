import React, { useEffect, useRef, memo } from 'react';
import { addDropdownEvent, addOptionEvent } from '../selectFunctions'
import { Background } from '../../data/Background';

export const SelectBackground = memo(function SelectBackground(props) {
	const { updateSelect } = props;

	const initialOption = useRef('-- select --');
	const backgroundRef = useRef();

	const backgroundOptions = Object.keys(Background)

   // const { updateSelect, BackgroundObj } = props;
	
	// const BackgroundRef = useRef(Background)

	// const [backgroundSelect, setBackgroundSelect] = useState(null);
	// const [variantOpt, setVariantOpt] = useState([]);
	// const [variantSelect, setVariantSelect] = useState(null);

	// const firstRender = useRef(true);
	// const initialOption = useRef('-- select --');
   // const variantInitialOption = useRef('-- optional variant --')

	// const parentRef = useRef();
   // const headerRef = useRef();
   // const optionsRef = useRef();
	// const backgroundRef = useRef();
   // const variantRef = useRef();
	
	// const optionsArray = Object.keys(BackgroundObj.background);
	// const dropdownArr = ['background', 'variant'];

	// useEffect(() => {
	// 	const parent = parentRef.current;
	// 	if (parent.querySelectorAll('.custom-dropdown').length > 0) {
	// 		for (let i = 0; i < dropdownArr.length; i++) {
	// 			let div = parent.querySelectorAll('.custom-dropdown')[i];
	// 			let header = div.children[0]
	// 			let options = div.children[1]
	// 			header.addEventListener('click', () => toggleList(options));
	// 		}
	// 	}
	// }, []);

	// useEffect(() => {
	// 	const div = variantOpt.length < 1 ? backgroundRef.current : variantRef.current;
	// 	const cat = variantOpt.length < 1 ? 'background' : 'variant';
	// 	const options = div.children[1].children;
	// 	const header = div.children[0];
	// 	for (let i = 0; i < options.length; i++) {
	// 		options[i].addEventListener('click', () => {
	// 			let val = options[i].innerHTML;
	// 			header.childNodes[0].nodeValue = val;
	// 			toggleList(div.children[1]);
	// 			handleSelect(val, cat);
	// 		});
	// 	}
	// }, [variantOpt]);

	// useEffect(() => {
	// 	if (!firstRender.current) {
	// 		setVariantSelect(null)
	// 		variantRef.current.children[0].childNodes[0].nodeValue = variantInitialOption.current;
   //       let variant = BackgroundObj.background[backgroundSelect].var
	// 		if (variant) {
	// 			variantRef.current.classList.remove('hidden');
   //          setVariantOpt(['No variant', variant])
	// 		} else {
	// 			variantRef.current.classList.add('hidden');
	// 		}
	// 	} else firstRender.current = false;
	// }, [backgroundSelect]);

	// useEffect(() => {
	// 	if (backgroundSelect) {
	// 		if (!variantSelect || variantSelect === 'No variant') {
	// 			updateSelect(backgroundSelect, 'background');
	// 		} else updateSelect(variantSelect, 'background', backgroundSelect);
	// 	}
	// }, [backgroundSelect,variantSelect]);

	// const handleSelect = (val, cat) => {
	// 	if (cat === 'background') {
	// 		setBackgroundSelect(val);
	// 	} else if (cat === 'variant') {
	// 		setVariantSelect(val);
	// 	}
	// };

	



	useEffect(() => {
		addDropdownEvent(backgroundRef.current)
		addOptionEvent(backgroundRef.current, handleSelect, 'background')
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
