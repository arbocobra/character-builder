import './App.css';
import React, { useState, useEffect } from 'react';
import { CharacterDisplay } from './components/CharacterDisplay';
import { CharacterSelect } from './components/CharacterSelect';

const App = () => {
  const [character, setCharacter] = useState({
    abilities: {
      // ***Temp - swap back base/total/modifiers after testing ****
      base: [12,12,12,13,13,13],
      // base: [],
      bonus: {
        race: [],
        class: [],
      },
      totalBonus: [],
      // total: [],
      total: [12,12,12,13,13,13],
      // modifiers: [],
      modifiers: [1,1,1,1,1,1],
      // ***
    },
    background: '',
    class: '', 
    equipment: {
      race: [],
      class: [],
      background: [],
      total: [],
    },
    features: {
      race: [],
      class: [],
      background: [],
      total: [],
    },
    hit_dice: '',
    hit_points: 0,
    hp_selection: '',
    languages: {
      race: [],
      class: [],
      background: [],
      total: [],
    },
    level: 0,
    proficiencies: {
      race: [],
      class: [],
      background: [],
      total: [],
    },
    proficiency_bonus: 0,
    race: '',
    saving_throws: [],
    size: '',
    skills: {
      race: [],
      class: [],
      background: [],
      total: [],
    },
    speed: 0,
    sub_name: '',
    subclass: '',
    subrace: '',
    variant: '',
    // baseModifiers: [],
    // bonusModifiers_race: [],
    // bonusModifiers_class: [],
    // extras_race: [],
    // extras_class: [],
    // extras_background: [],
    // skill: [],
    // language: [],
  });

  // useEffect(() => console.log(character), [character])

    const updateCharacter = (val) => {
    setCharacter((prev) => ({
      ...prev,
      ...val,
    }));
  };

  return (
    <div className="App">
      <div id="player-select" className="container-box select">
      <p>Character Display</p>
        <CharacterSelect updateCharacter={updateCharacter} character={character} />
      </div>
      <div id="player-display" className="container-box display">
        <p>Character Select</p>
        <CharacterDisplay currentCharacter={character} />
      </div>
    </div>
  );
};

export default App;
