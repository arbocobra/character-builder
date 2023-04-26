import React, { useState, useEffect, memo } from 'react';
const _ = require('lodash'); 

export const DisplayAbilities = memo(function DisplayAbilities(props) {
   const {abilityScores, abilityRef} = props;

  const displayModifiers = _.isEmpty(abilityScores.modifiers) ? [] : abilityScores.modifiers.map(num => num > 0 ? `+${num}` : num )
 
   return (
   <div className='display-container'>
    <div className='display-heading open'>
      <p className='section-title'>Abilities</p>
		</div>
    { abilityScores.total.length ? (
      <div className='ability-grid display-box'>
      
      <div className='ability-row header'>
        <div>Ability</div>
        <div>Base</div>
        <div>Bonus</div>
        <div>Total</div>
        <div>Modifier</div>
      </div>
    { abilityRef.map((el,i) => (
      <div key={el} className='ability-row'>
        <div>{_.capitalize(el)}</div>
        <div>{ abilityScores.base.length ? abilityScores.base[i] : null }</div>
        {/* <div>{ abilityScores.base.every(val => val === 0) ? null : abilityScores.base[i] }</div> */}
        <div>{ abilityScores.totalBonus.length ? abilityScores.totalBonus[i] : null }</div>
        {/* <div>{ abilityScores.totalBonus.every(val => val === 0) ? null : abilityScores.totalBonus[i] }</div> */}
        <div>{ abilityScores.total.length ? abilityScores.total[i] : null }</div>
        {/* <div>{ abilityScores.total.every(val => val === 0) ? null : abilityScores.total[i] }</div> */}
        <div className='strong'>{ displayModifiers.length ? displayModifiers[i] : null }</div>
      </div>
    )) }
    </div>
    ) : <div className='display-box'><p>Abilities not selected</p></div> }
    
     </div>
   )
 
 })