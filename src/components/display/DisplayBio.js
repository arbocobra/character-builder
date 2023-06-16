import React, { useState, useEffect, useRef, memo } from 'react';
import featDetails from './../../data/FeatureDetails';
import { smartCase } from '../utilities/helperFunctions';
const _ = require('lodash'); 

export const DisplayBio = memo(function DisplayBio(props) {
   const {currentCharacter} = props;

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
      </div>
    )
   } 

   const classFeatRow = (obj) => {
    let arr = Object.keys(obj)
    return (
      <div className={`row-line special`}>
        {arr.map((el,i) => (<div key={`class-special-${i}`}>
          <div className='bio-info'>{_.capitalize(obj[el])}</div>
          <div className='bio-name'>{smartCase(el)}</div>
        </div>))}
      </div>
    )
    }

   
  let charClass,level, subclass, subclassName, race, subrace, subraceName, hitDice, hitPoints, saves, profBonus, background, size, speed, languages, skills, classFeatures, armor;
  
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
  armor = currentCharacter.armor_class.total > 0 ? currentCharacter.armor_class.total : null;
  subclassName = currentCharacter.sub_name.length ? smartCase(currentCharacter.sub_name) : 'Subclass';
  subraceName = currentCharacter.subrace.length ? 'Subrace' : null;
  hitPoints = currentCharacter.hit_points > 0 ? currentCharacter.hit_points : null;
  profBonus = currentCharacter.proficiency_bonus > 0 ? `+${currentCharacter.proficiency_bonus}` : null
  saves = currentCharacter.saving_throws.map(el => _.capitalize(el));
  speed = currentCharacter.speed > 0 ? currentCharacter.speed : null;
  languages = currentCharacter.languages.total.map(el => _.capitalize(el));
  skills = currentCharacter.skills.total.map(el => _.capitalize(el));
  classFeatures = !_.isEmpty(currentCharacter.class_feature_special) ? currentCharacter.class_feature_special : null

   return (
    <div className="display-container">
      <div className='display-heading open'>
        <p className='section-title'>Character Details</p>
		  </div>
      
      <div className='display-box bio-container'>
        { Row('double', [[charClass, level], subclass], ['Class & Level', subclassName]) }
        { Row('double', [race, subrace], ['Race', subraceName]) }
        { Row('triple', [hitDice, hitPoints, profBonus], ['Hit Dice', 'HP', 'Proficiency Bonus']) }
        { Row('special', [armor, saves], ['AC', 'Saving Throws']) }
        { Row('triple', [background, size, speed], ['Background', 'Size', 'Speed']) }
        { Row('single', [languages], ['Language(s)']) }
        { Row('single', [skills], ['Skill(s)']) }
        {/* {classFeatRow} */}
        { classFeatures ? (<p className='bio-subtitle'>Special Class Abilities</p>) : null}
        { classFeatures ? classFeatRow(classFeatures) : null}
        
        
      </div>

    </div>
   )
 })