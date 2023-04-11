import React, { useState, useEffect, useRef, memo } from 'react';
// import RaceSubrace from '../data/RaceSubrace';
// import { skills } from '../data/CharacterDetails';
import { DisplayBio } from './display/DisplayBio';
import { DisplayAbilities, DisplayAbilitiesAlt } from './display/DisplayAbilities';
import { DisplaySkills } from './display/DisplaySkills';

const _ = require('lodash'); 

// export const CharacterDisplay = memo(function CharacterDisplay(props) {
  export const CharacterDisplay = (props) => {

  const { currentCharacter } = props;

  const firstRender = useRef(true)
  const abilityRef = useRef(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'])
  // const initialScores = useRef([[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]])
  const abilityObj = useRef({
    base: [0,0,0,0,0,0],
    totalBonus: [0,0,0,0,0,0],
    total: [0,0,0,0,0,0],
    modifiers: [0,0,0,0,0,0],
  })
  const [abilityScores, setAbilityScores] = useState(abilityObj.current)


  useEffect(() => {
    if (!firstRender.current && _.has(currentCharacter, 'abilities')) {
      const update = _.omit(currentCharacter.abilities, ['bonus'])
      setAbilityScores(update);
    }
  }, [currentCharacter])

  useEffect(() => {
    if (firstRender.current) firstRender.current = false
  }, [])


  return (
    <div className="parent-grid">
      <DisplayBio currentCharacter={currentCharacter} />
      <DisplaySavingThrows currentCharacter={currentCharacter} abilityRef={abilityRef.current} />
      <DisplayAbilities abilityScores={abilityScores} abilityRef={abilityRef.current} />
      <DisplaySkills currentCharacter={currentCharacter} scoreModifiers={abilityScores.modifiers} />    
    </div>
  )
}

const DisplaySavingThrows = memo(function DisplaySavingThrows(props) {
  const {currentCharacter, abilityRef} = props;
  
  // useEffect(() => {
  //   if (currentCharacter.skills.total.length) setCurrentSkills(currentCharacter.skills.total);
  //   if (currentCharacter.skills.total.length !== currentSkills.length) setCurrentSkills(currentCharacter.skills.total);
  //  }, [currentCharacter]);

  return (
    <div className='save-grid table-grid'>
      <div className='save-row header'>
        <div>P?</div>
        <div>Skill</div>
        <div>Modifier</div>
      </div>
    { abilityRef.map((el,i) => (
      <div key={el} className='save-row'>
        <div>X</div>
        <div>{el}</div>
        <div>X</div>
      </div>
    )) }
    </div>
  )

})