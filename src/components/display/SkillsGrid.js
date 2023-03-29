import React, { useState, useEffect, useRef, memo } from 'react';
import {skills} from './../../CharacterDetails'

export const SkillsGrid = (props) => {
   const {currentCharacter, modifierPoints} = props;
   const skillsRef = useRef(skills);
   const initProficiency = useRef(Array(18).fill(false))
   const [proficiencyArr, setProficiencyArr] = useState(initProficiency.current)
   const [pBonus, setPBonus] = useState(0);
   const [charSkillsIndex, setCharSkillsIndex] = useState([])
   const skillsArr = skillsRef.current.map((el, i, arr) => el[0]);
   const modArr = skillsRef.current.map(el => modifierPoints[el[1]])

   useEffect(() => {
      if (Object.keys(currentCharacter).includes('skills')) {
         if (currentCharacter.skills) {
            // console.log('found skills')
            // console.log(currentCharacter.skills)
            // console.log(skillsArr)
            setCharSkillsIndex(currentCharacter.skills.map(skill => skillsArr.findIndex(el => el.toLowerCase() === skill.toLowerCase())))
            // console.log(charSkillsIndex)
            setProficiencyArr((current) => current.map((el, i) => {
               let skill = skillsArr[i].toLowerCase()
               return currentCharacter.skills.includes(skill) ? true : el}))
            // console.log(proficiencyArr)
         } else setCharSkillsIndex([])
         // let charSkillsIndex = currentCharacter.skills.map
         // skillsArr.map(el => el === )
         
      }
      if (Object.keys(currentCharacter).includes('proficiency bonus')) {
         setPBonus(currentCharacter['proficiency bonus'])
      }
   }, [currentCharacter])
   
   useEffect(() => {
      // console.log(charSkillsIndex)
      // if (charSkillsIndex.length > 0) {
      //    setProficiencyArr((current) => current)
      // }
   }, [charSkillsIndex])

   useEffect(() => {
      // console.log(proficiencyArr)
      // if (charSkillsIndex.length > 0) {
      //    setProficiencyArr((current) => current)
      // }
   }, [proficiencyArr])

   return (
     <div className='skill-container'>
       <div className="skill-row header">
         <div className='skill-inner'>PB?</div>
         <div className='skill-inner name'>Skill</div>
         <div className='skill-inner'>#</div>
       </div>
       {skillsArr.map((el, i) => (
         <div key={el + '-row'} className="skill-row">
            <div className='skill-inner'>{proficiencyArr[i] && 'X'}</div>
            <div className='skill-inner name'>{el}</div>
            {/* <div className='skill-inner'>{proficiencyArr ? currentCharacter.proc}</div> */}
            <div className='skill-inner'>{proficiencyArr[i] ? modArr[i] + pBonus : modArr[i]}</div>
       </div>
       ))}
       
     </div>
   )
 }