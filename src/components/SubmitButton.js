export const SubmitButton = (props) => {
   // const { updateSelect, setSelectionType, canSubmit, selectedArr } = props;
	const { canSubmit, submit, args, reset } = props;

	
   return (
      <div className='button-container full'>
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