import React, { useState, useEffect, useRef, memo } from 'react';
import { skills } from '../../data/CharacterDetails';
const _ = require('lodash'); 

export const DisplaySkills = memo(function DisplaySkills(props) {
   const {currentCharacter} = props;

  //  const [currentSkills, setCurrentSkills] = useState([]) 
  //  const [skillProf, setSkillProf] = useState([])
   const abilityRef = useRef(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'])

   const charSkills = [...currentCharacter.skills.total];
   const charMods = currentCharacter.abilities.modifiers.length ? [...currentCharacter.abilities.modifiers] : null;
   const profBonus = currentCharacter.proficiency_bonus > 0 ? currentCharacter.proficiency_bonus : 2
   const skillProf = charMods ? skills.map(el => charSkills.includes(el[0]) ? charMods[el[1]] + profBonus : charMods[el[1]]) : null;
   const profDisplay = !skillProf ? null : skillProf.map(num => num > 0 ? `+${num}` : num);
 
   return (
    <div className='skill-display'>
      <div className='display-heading open'>
      <p className='section-title'>Skills</p>
		</div>
    { charSkills.length ? (
      <div className='skill-grid display-box'>
         <div className='skill-row header'>
           <div>PB</div>
           <div>Skill</div>
           <div>Bonus</div>
         </div>
         { skills.map((el,i) => (
         <div key={el[0]} className='skill-row'>
           <div>{ charSkills.includes(el[0]) ? 'X' : null}</div>
           <div>{_.capitalize(el[0])} <span className='skill-ability'>({abilityRef.current[el[1]].slice(0,3)})</span></div>
           <div className='strong'>{ skillProf ? profDisplay[i] : null }</div>
         </div>
       )) }
       </div>
    ) : <div className='display-box'><p>No skills selected</p></div>}
      
       
     </div>
   )
 })