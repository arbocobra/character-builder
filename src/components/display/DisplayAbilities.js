import React, { useEffect, memo } from 'react';
const _ = require('lodash'); 

export const DisplayAbilities = memo(function DisplayAbilities(props) {
   const {abilityScores, abilityRef, altAbilityScores} = props;

  //  useEffect(() => console.log(abilityScores))
  //  useEffect(() => console.log(altAbilityScores.total))
 
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
     <p>Total: {altAbilityScores.total}</p>
     </div>
   )
 
 })

 export const DisplayAbilitiesAlt = memo(function DisplayAbilities(props) {

  const {abilities, abilityRef, abilityScores} = props;

  // useEffect(() => {
  //   if (_.has(abilities, 'total')) console.log(abilities.total)
  //   }, [abilities])
  // useEffect(() => console.log('render alt'))

  
    
  return (
    <div className='ability-grid table-grid'>
      {/* {_.keys(abilities).map(el => !_.isEmpty(abilities[el]) ? (<p key={el}>{_.capitalize(el)}: {abilities[el]}</p>) : null)} */}
      {/* {!_.isEmpty(abilities.base) && <p>Base: {abilities.base}</p>}
      {!_.isEmpty(abilities.totalBonus) && <p>Bonus: {abilities.totalBonus}</p>}
      {!_.isEmpty(abilities.total) && <p>Total: {abilities.total}</p>}
      {!_.isEmpty(abilities.modifiers) && <p>Modifiers: {abilities.modifiers}</p>} */}
      <p>Base: {abilities.base}</p>
      <p>Bonus: {abilities.totalBonus}</p>
      <p>Total: {abilities.total}</p>
      <p>Modifiers: {abilities.modifiers}</p>
    </div>
  )
} )