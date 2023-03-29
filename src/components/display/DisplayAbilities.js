import React from 'react';

export const DisplayAbilities = (props) => {
   const {abilityScores, abilityRef} = props;
 
   return (
     <div className='ability-grid table-grid'>
       <div className='ability-row header'>
         <div>Ability</div>
         <div>Base</div>
         <div>Bonus</div>
         <div>Total</div>
         <div>Modifier</div>
       </div>
     { abilityScores.map((el,i) => (
       <div key={abilityRef[i]} className='ability-row'>
         <div>{abilityRef[i]}</div>
         <div>{el[0]}</div>
         <div>{el[1]}</div>
         <div>{el[2]}</div>
         { el[0] > 0 && <div>{el[3]}</div> }
       </div>
     )) }
     </div>
   )
 
 }
 