import React, { useState, useEffect, useRef, memo } from 'react';
const _ = require('lodash'); 

export const DisplaySaves = memo(function DisplaySaves(props) {
  const {currentCharacter, abilityRef} = props;
  //  const {abilityRef, saveProps} = props;
  //  const {mods, profBonus, saves} = saveProps;
 
   const mods = [...currentCharacter.abilities.modifiers];
   const profBonus = currentCharacter.proficiency_bonus > 0 ? currentCharacter.proficiency_bonus : 2;
   const saves = [...currentCharacter.saving_throws];

   const proficiencies = (mods.length && profBonus > 0 && saves.length) ? mods.map((num,i) => saves.includes(abilityRef[i]) ? num + profBonus : num) : null;

   const displayModifiers = proficiencies ? proficiencies.map(num => num > 0 ? `+${num}` : num) : []
 
   return (
     <div>
       <p className='section-title'>Saving Throws</p>
       <div className='save-grid table-grid'>        
         <div className='save-row header'>
           <div>PB</div>
           <div>Skill</div>
           <div>Modifier</div>
         </div>
       { abilityRef.map((el,i) => (
         <div key={el} className='save-row'>
           {/* <div>{currentCharacter.saving_throws?.includes(el) ? 'X' : null}</div> */}
           <div>{saves.includes(el) ? 'X' : null}</div>
           <div>{_.capitalize(el)}</div>
           <div className='strong'>{displayModifiers.length ? displayModifiers[i] : null}</div>
         </div>
       )) }
       </div>
     </div>
   )
 
 })