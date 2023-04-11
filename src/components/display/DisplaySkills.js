import React, { useState, useEffect, useRef, memo } from 'react';
import { skills } from '../../data/CharacterDetails';
const _ = require('lodash'); 

export const DisplaySkills = memo(function DisplaySkills(props) {
   const {currentCharacter} = props;

   const [currentSkills, setCurrentSkills] = useState([]) 
   const [skillProf, setSkillProf] = useState([])
   const abilityRef = useRef(['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'])

  //  const skillsName = skills.map(el => el[0]);
  //  const skillsAbility = skills.map(el => el[1]);

   useEffect(() => {
    if (currentCharacter.skills.total.length) setCurrentSkills(currentCharacter.skills.total);
    if (currentCharacter.skills.total.length !== currentSkills.length) setCurrentSkills(currentCharacter.skills.total);
   }, [currentCharacter]);

   useEffect(() => {
    if (currentSkills.length) {
      let updateProf = skills.map((el,i) => {
        let value = _.isEmpty(currentCharacter.abilities.modifiers) ? 0 : currentCharacter.abilities.modifiers[el[1]];
        return (currentSkills.includes(el[0])) ? value + currentCharacter.proficiency_bonus : value;
      })
      setSkillProf(updateProf)
    }
   }, [currentSkills, currentCharacter])

   

  //  const skillsProf = skills.map((el,i) => )
 
   return (
     <div className='skill-grid table-grid'>
       <div className='skill-row header'>
         <div>P?</div>
         <div>Skill</div>
         <div>Bonus</div>
       </div>
       { skills.map((el,i) => (
       <div key={el[0]} className='skill-row'>
         <div>{ currentSkills.includes(el[0]) ? 'X' : null}</div>
         <div>{_.capitalize(el[0])} <span className='skill-ability'>({abilityRef.current[el[1]].slice(0,3)})</span></div>
         {/* <div>{ currentSkills.includes(el[0]) ? currentCharacter.abilities.modifiers[el[1]] + currentCharacter.proficiency_bonus : currentCharacter.abilities.modifiers[el[1]]}</div> */}
         <div>{skillProf[i]}</div>
       </div>
     )) }
     </div>
   )
 })