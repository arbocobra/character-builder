import './App.css';
import React, { useState, useEffect } from 'react';
import { CharacterDisplay } from './components/CharacterDisplay';
import { CharacterSelect } from './components/CharacterSelect';

const App = () => {
  const [character, setCharacter] = useState({
    // abilities: {
    //   base: [],
    //   bonus: {
    //     race: [],
    //     class: [],
    //   },
    //   totalBonus: [],
    //   total: [],
    //   modifiers: [],
    // },
    // ***Temp - swap back after testing ****
    abilities: { 
      base: [12,12,12,13,13,13],
      bonus: {
        race: [],
        class: [],
      },
      totalBonus: [],
      total: [12,12,12,13,13,13],
      modifiers: [1,1,1,1,1,1],
    },
    // ***
    armor_class: {
      base: 0,
      sheild: 0,
      total: 0,
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
      armor: {
        race: [],
        class: [],
        background: [],
        total: [],
      },
      tools: {
        race: [],
        class: [],
        background: [],
        total: [],
      },
      weapons: {
        race: [],
        class: [],
        background: [],
        total: [],
      }
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
        <h2>Character Select</h2>
        <CharacterSelect updateCharacter={updateCharacter} character={character} />
      </div>
      <div id="player-display" className="container-box display">
        <h2>Character Display</h2>
        <CharacterDisplay currentCharacter={character} />
      </div>
    </div>
  );
};

export default App;
