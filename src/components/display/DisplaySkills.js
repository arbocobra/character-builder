import React, { memo } from 'react';
// import React, { useState } from 'react';
import { skills } from '../../data/CharacterDetails';

export const DisplaySkills = memo(function DisplaySkills(props) {
   const {currentCharacter, abilityScores} = props;
 
  //  const [skillProficiency, setSkillProficiency] = useState([]);
  //  const [proficiencyBonus, setProficiencyBonus] = useState(0);
 
   return (
     <div className='skill-grid table-grid'>
       <div className='skill-row header'>
         <div>P?</div>
         <div>Skill</div>
         <div>Bonus</div>
       </div>
       { skills.map((el,i) => (
       <div key={el[0]} className='skill-row'>
         <div>{ currentCharacter.skills.includes(el[0].toLowerCase()) && 'X'}</div>
         <div>{el[0]}</div>
         <div>{ abilityScores[el[1]][0] > 0 && abilityScores[el[1]][3] }</div>
       </div>
     )) }
     </div>
   )
 })