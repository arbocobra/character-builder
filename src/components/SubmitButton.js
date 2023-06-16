import { useRef, useEffect } from "react";
export const SubmitButton = (props) => {
   // const { updateSelect, setSelectionType, canSubmit, selectedArr } = props;
	const { canSubmit, submit, args, reset, addClass } = props;
	const buttonRef = useRef()

	useEffect(() => {
		if (addClass) buttonRef.current.classList.add(addClass)
	},[])
	
	
   return (
      <div ref={buttonRef} className='button-container'>
				<button onClick={() => submit(...args)} disabled={!canSubmit}>
					<span>&#10003;</span>
				</button>
				{ reset ? 
				(<button onClick={() => reset()} >
					<span className='reset'>&#8635;</span>
				</button>) : null}
			</div>
   )
}