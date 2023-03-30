import React, { useState, useEffect, useRef, memo } from 'react';
// import RaceSubrace from '../data/RaceSubrace';
// import { skills } from '../data/CharacterDetails';
import { DisplayBio } from './display/DisplayBio';
import { DisplayAbilities, DisplayAbilitiesAlt } from './display/DisplayAbilities';
import { DisplaySkills } from './display/DisplaySkills';

export const CharacterDisplay = memo(function CharacterDisplay(props) {

  const { currentCharacter } = props;

  const firstRender = useRef(true)
  const abilityRef = useRef(['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'])
  const initialScores = useRef([[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]])
  // const characterRef = useRef({
  //   background: '',
  //   baseModifiers: [],
  //   bonusModifiers_race: [],
  //   bonusModifiers_class: [],
  //   class: '',
  //   extras_race: [],
  //   extras_class: [],
  //   extras_background: [],
  //   language: [],
  //   level: 0,
  //   proficiency_bonus: 0,
  //   race: '',
  //   size: '',
  //   skills: [],
  //   speed: 0,
  //   subclass: '',
  //   subrace: '',
  //   variant: '',
  // });

  const [abilityScores, setAbilityScores] = useState(initialScores.current)

  useEffect(() => {
    if (!firstRender.current) {
      if (currentCharacter.baseModifiers.length > 0) {
        updateAbilityScores('base', currentCharacter.baseModifiers)
      }
      if (currentCharacter.bonusModifiers_race.length > 0) {
        updateAbilityScores('bonus_race', currentCharacter.bonusModifiers_race)
      }
      if (currentCharacter.bonusModifiers_class.length > 0) {
        updateAbilityScores('bonus_class', currentCharacter.bonusModifiers_class)
      }
    }
    else {
      firstRender.current = false
    }
  }, [currentCharacter])

  const updateAbilityScores = (cat, val) => {
    const update = [...abilityScores]
    if (cat === 'base') {
      val.map((el,i) => update[i][0] = el)
    } else {
      let bonusArr = [...new Array(6)].map(()=> [0,0]);
      if (cat === 'bonus_race') val.map((el,i) => bonusArr[i][0] = el);
      if (cat === 'bonus_class') val.map((el,i) => bonusArr[i][1] = el);
      bonusArr.map((el,i) => update[i][1] = el[0] + el[1])
    }
    update.map(el => el[2] = el[0] + el[1])
    update.map(el => el[3] = Math.floor((el[2] - 10) / 2))
    setAbilityScores(update)
  }

  return (
    <div className="parent-grid">
      <DisplayBio currentCharacter={currentCharacter} />
      <DisplayAbilities abilityScores={abilityScores} abilityRef={abilityRef.current} />
      <DisplayAbilitiesAlt abilityScores={abilityScores} abilityRef={abilityRef.current} />
      <DisplaySkills currentCharacter={currentCharacter} abilityScores={abilityScores} />    
    </div>
  )
})