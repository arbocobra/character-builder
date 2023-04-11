export const SubmitButton = (props) => {
   // const { updateSelect, setSelectionType, canSubmit, selectedArr } = props;
	const { canSubmit, submit, args } = props;

   // const handleSelect = () => {
	// 	updateSelect(selectedArr, 'base');
	// 	setSelectionType('Complete. Can reselect.');
	// };
   return (
      <div className='button-container full'>
				<button onClick={() => submit(...args)} disabled={!canSubmit}>
					<span>&#10003;</span>
				</button>
			</div>
   )
}