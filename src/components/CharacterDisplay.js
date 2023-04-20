import React, { useState, useEffect, useRef, memo } from 'react';
import { DisplayBio } from './display/DisplayBio';
import { DisplayAbilities } from './display/DisplayAbilities';
import { DisplaySaves } from './display/DisplaySaves';
import { DisplaySkills } from './display/DisplaySkills';

const _ = require('lodash'); 


  export const CharacterDisplay = (props) => {

  const { currentCharacter } = props;

  // const firstRender = useRef(true)
  const abilityRef = useRef(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'])
  // const prevChar = useRef(null)
  // const saveProps = useRef({mods: [], profBonus: 0, saves: []})

  const abilityObj = useRef({
    base: [0,0,0,0,0,0],
    totalBonus: [0,0,0,0,0,0],
    total: [0,0,0,0,0,0],
    modifiers: [0,0,0,0,0,0],
  })

  // useEffect(() => {
  //   if (!firstRender.current) {
  //     let hasChanged = updatesSavesComp();
  //     if (hasChanged) {
  //       saveProps.current = {
  //         mods: [...currentCharacter.abilities.modifiers], 
  //         profBonus: currentCharacter.proficiency_bonus > 0 ? currentCharacter.proficiency_bonus : 2,
  //         saves: [...currentCharacter.saving_throws],
  //       }
  //       console.log('something changed')
  //     }
  //   }
  //   prevChar.current = currentCharacter;
  // })

  const abilityScores = _.omit(currentCharacter.abilities, ['bonus'])

  // useEffect(() => {
  //   if (firstRender.current) firstRender.current = false
  // }, [])

  // const updatesSavesComp = () => {
  //   if (!_.isEqual(currentCharacter.abilities.modifiers, prevChar.current.abilities.modifiers)) return true;
  //   else if (!_.isEqual(currentCharacter.saving_throws, prevChar.current.saving_throws)) return true;
  //   else if (currentCharacter.proficiency_bonus !== prevChar.current.proficiency_bonus) return true;
  //   else return false;
  // }

  // const saveProps = {
  //   modsA: [...currentCharacter.abilities.modifiers],
  //   profBonusA: currentCharacter.proficiency_bonus > 0 ? currentCharacter.proficiency_bonus : 2,
  //   savesA: [...currentCharacter.saving_throws]
  // }

  // const mods = [...currentCharacter.abilities.modifiers];
  // const profBonus = currentCharacter.proficiency_bonus > 0 ? currentCharacter.proficiency_bonus : 2;
  // const saves = [...currentCharacter.saving_throws];


  return (
    // <div className="parent-grid">
    <div>
      <DisplayBio currentCharacter={currentCharacter} />
      <DisplayAbilities abilityScores={abilityScores} abilityRef={abilityRef.current} />
      <div className='save-skill-grid display-grid'>
        <DisplaySaves currentCharacter={currentCharacter} abilityRef={abilityRef.current} />
        {/* <DisplaySaves abilityRef={abilityRef.current} saveProps={saveProps.current} /> */}
        <DisplaySkills currentCharacter={currentCharacter} scoreModifiers={abilityScores.modifiers} />   
      </div>
       
    </div>
  )
}