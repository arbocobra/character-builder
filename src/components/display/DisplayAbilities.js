import React, { useEffect, memo } from 'react';
const _ = require('lodash'); 

export const DisplayAbilities = memo(function DisplayAbilities(props) {
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
     { abilityRef.map((el,i) => (
       <div key={el} className='ability-row'>
         <div>{el}</div>
         {/* { !_.isEmpty(abilityScores.base ) && (<div>{abilityScores.base[i]}</div>)} */}
         {/* { !_.isEmpty(abilityScores.base ) && (<div>{abilityScores.base[i]}</div>)} */}
         <div>{abilityScores.base[i]}</div>
         <div>{abilityScores.totalBonus[i]}</div>
         <div>{abilityScores.total[i]}</div>
         { abilityScores.base.length && <div>{abilityScores.modifiers[i]}</div>}
       </div>
     )) }
     </div>
   )
 
 })

 export const DisplayAbilitiesAlt = memo(function DisplayAbilities(props) {

  const {abilities, abilityRef, abilityScores} = props;

  
    
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