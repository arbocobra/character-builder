import React, { useState, useEffect, useRef, memo } from 'react';
import featDetails from './../../data/FeatureDetails';
import { smartCase } from '../utilities/helperFunctions';
const _ = require('lodash'); 

export const DisplayBio = memo(function DisplayBio(props) {
   const {currentCharacter} = props;

  //  const Row = (title, bio, type) => {
  //   const isTrue = type === 'num' ? bio > 0 : bio.length > 0;
  //   // if (isTrue) return (
  //     return (
  //     <div className='row-grid'>
  //       <div>{title}:</div>
  //       { type === 'array' ? (<div>{bio.map(el => _.capitalize(el)).join(', ')}</div>) : null }
  //       { type !== 'array' ? (<div>{smartCase(bio)}</div>) : null }
  //     </div>
  //   )
  //  }
  //  const RowDouble = (bioA,bioB,nameA,nameB) => {
    
  //   return (
  //     <div className='row-line double'>
  //       <div>
  //         <div className='bio-info'>{bioA}</div>
  //         <div className='bio-name'>{nameA}</div>
  //       </div>
  //       <div>
  //         <div className='bio-info'>{bioB}</div>
  //         <div className='bio-name'>{nameB}</div>
  //       </div>
  //     </div>
  //   )
  //  }
   const Row = (colCount, bioArr, nameArr) => {
    const modArr = bioArr.map(el => _.isArray(el) ? (el.map((e,i) => <span key={e}>{e}</span>)) : el)
    return (
      <div className={`row-line ${colCount}`}>
        { modArr.map((el,i) => (
          <div key={`${el}-${i}`}>
            <div className='bio-info'>{el}</div>
            <div className='bio-name'>{nameArr[i]}</div>
          </div>
        ))}
        {/* { bioArr.forEach((el,i) => {
          if (_.isArray(el)) el = (<><span>{el[0]}</span><span>{el[1]}</span></>)
          return (
            <div>
              <div className='bio-info'>{el}</div>
              <div className='bio-name'>{nameArr[i]}</div>
          </div>
          )
        }) } */}
      </div>
    )
   }
  //  useEffect(() => console.log(currentCharacter.proficiencies), [currentCharacter])
   
  let charClass,level, subclass, subclassName, race, subrace, subraceName, hitDice, hitPoints, saves, background, size, speed, languages, skills;
  
  [charClass, subclass, race, subrace, hitDice, background, size] = [
    _.capitalize(currentCharacter.class), 
    smartCase(currentCharacter.subclass), 
    _.capitalize(currentCharacter.race), 
    smartCase(currentCharacter.subrace), 
    currentCharacter.hit_dice,
    _.capitalize(currentCharacter.background),
    currentCharacter.size,
  ]

  level = currentCharacter.level > 0 ? currentCharacter.level : null;
  subclassName = currentCharacter.sub_name.length ? smartCase(currentCharacter.sub_name) : 'Subclass';
  subraceName = currentCharacter.subrace.length ? 'Subrace' : null;
  hitPoints = currentCharacter.hit_points > 0 ? currentCharacter.hit_points : null;
  saves = currentCharacter.saving_throws.map(el => _.capitalize(el));
  speed = currentCharacter.speed > 0 ? currentCharacter.speed : null;
  languages = currentCharacter.languages.total.map(el => _.capitalize(el));
  skills = currentCharacter.skills.total.map(el => _.capitalize(el));

   return (
    <div className="display-container">
      <div className='display-heading open'>
        <p className='section-title'>Character Details</p>
		  </div>
      
      <div className='display-box bio-container'>
        { Row('double', [[charClass, level], subclass], ['Class & Level', subclassName]) }
        { Row('double', [race, subrace], ['Race', subraceName]) }
        { Row('triple', [hitDice, hitPoints, saves], ['Hit Dice', 'HP', 'Saves']) }
        { Row('triple', [background, size, speed], ['Background', 'Size', 'Speed']) }
        { Row('single', [languages], ['Language(s)']) }
        { Row('single', [skills], ['Skill(s)']) }
        {/* { Row('triple',[special_1_count, special_2_count, special_3_count] , [special_1_name, special_2_name, special_3_name]) } */}


        {/* { Row('Race', currentCharacter.race, 'string') }
        { Row('Subrace', currentCharacter.subrace, 'string') }
        { Row('Class', currentCharacter.class, 'string') }
        { Row(currentCharacter.sub_name, currentCharacter.subclass, 'string') }
        { Row('Level', currentCharacter.level, 'num') } */}

        {/* { Row('Hit Dice', currentCharacter.hit_dice, 'string') }
        { Row('Hit Points', currentCharacter.hit_points, 'num') }
        { Row('Saving Throws', currentCharacter.saving_throws, 'array') } */}

        {/* { Row('Prof. Bonus', currentCharacter.proficiency_bonus, 'num') }

        { Row('Speed', currentCharacter.speed, 'num') }
        { Row('Size', currentCharacter.size, 'string') }
        { Row('Background', currentCharacter.background, 'string') }
        
        { Row('Languages', currentCharacter.languages.total, 'array') }
        { Row('Skills', currentCharacter.skills.total, 'array') }
        { Row(currentCharacter.class_special_1_name, currentCharacter.class_special_1_count, 'string') }
        { Row(currentCharacter.class_special_2_name, currentCharacter.class_special_2_count, 'string') }
        { Row(currentCharacter.class_special_3_name, currentCharacter.class_special_3_count, 'string') } */}
        
      </div>

    </div>
   )
 })