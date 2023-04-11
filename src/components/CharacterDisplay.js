import React, { useState, useEffect, useRef, memo } from 'react';
import { DisplayBio } from './display/DisplayBio';
import { DisplayAbilities } from './display/DisplayAbilities';
import { DisplaySaves } from './display/DisplaySaves';
import { DisplaySkills } from './display/DisplaySkills';

const _ = require('lodash'); 


  export const CharacterDisplay = (props) => {

  const { currentCharacter } = props;

  const firstRender = useRef(true)
  const abilityRef = useRef(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'])

  const abilityObj = useRef({
    base: [0,0,0,0,0,0],
    totalBonus: [0,0,0,0,0,0],
    total: [0,0,0,0,0,0],
    modifiers: [0,0,0,0,0,0],
  })
  // const [abilityScores, setAbilityScores] = useState(abilityObj.current)


  // useEffect(() => {
  //   if (!firstRender.current && _.has(currentCharacter, 'abilities')) {
  //     const update = _.omit(currentCharacter.abilities, ['bonus'])
  //     setAbilityScores(update);
  //   }
  // }, [currentCharacter])

  const abilityScores = _.omit(currentCharacter.abilities, ['bonus'])

  useEffect(() => {
    if (firstRender.current) firstRender.current = false
  }, [])


  return (
    <div className="parent-grid">
      <DisplayBio currentCharacter={currentCharacter} />
      <DisplayAbilities abilityScores={abilityScores} abilityRef={abilityRef.current} />
      <div className='save-skill-grid display-grid'>
        <DisplaySaves currentCharacter={currentCharacter} abilityRef={abilityRef.current} />
        <DisplaySkills currentCharacter={currentCharacter} scoreModifiers={abilityScores.modifiers} />   
      </div>
       
    </div>
  )
}