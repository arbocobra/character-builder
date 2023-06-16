// import './App.css';
import './Character.css'
import React, { useState, useEffect, useRef, memo } from 'react';
import { CharacterDisplay } from './components/CharacterDisplay';
import { CharacterSelect } from './components/CharacterSelect';
import { toggleSection, toggleHeading } from './components/utilities/selectFunctions';

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
      shield: 0,
      armor: 0,
      special: 0,
      total: 0,
    },
    background: '',
    class: '',
    class_scf_count: [],
    class_feature_special: {},
    class_spellcasting: {},
    equipment: {
      race: {
        armor: [],
        tools: [],
        weapons: [],
        other: [],
      },
      class: {
        armor: [],
        tools: [],
        weapons: [],
        other: [],
      },
      background: {
        armor: [],
        tools: [],
        weapons: [],
        other: [],
      },
      total: {
        armor: [],
        tools: [],
        weapons: [],
        other: [],
      },
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
      race: {
        armor: [],
        tools: [],
        weapons: [],
      },
      class: {
        armor: [],
        tools: [],
        weapons: [],
      },
      background: {
        armor: [],
        tools: [],
        weapons: [],
      },
      total: {
        armor: [],
        tools: [],
        weapons: [],
      },
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
    spellcaster: false,
    sub_name: '',
    subclass: '',
    subrace: '',
    variant: '',
  });

  // useEffect(() => console.log(character), [character])

  useEffect(() => {
    const inputArr = document.querySelectorAll('.section-heading');
    const displayArr = document.querySelectorAll('.display-heading');
    Array.from(inputArr).map(div => div.addEventListener('click', () => toggleSection(div)))
    Array.from(displayArr).map(div => div.addEventListener('click', () => toggleHeading(div)))
  },[])

  const updateCharacter = (val) => {
    setCharacter((prev) => ({
      ...prev,
      ...val,
    }));
  };

  return (
    <div className="App">
      <div id="player-select" className="container-box select">
        {/* <h2>Character Select</h2> */}
        <CharacterSelect updateCharacter={updateCharacter} character={character} />
      </div>
      <div id="player-display" className="container-box display">
        {/* <h2>Character Display</h2> */}
        <CharacterDisplay updateCharacter={updateCharacter} currentCharacter={character} />
      </div>
    </div>
  );
};

// export const updateCharacterSpecial = (val) => updateCharacter(val)

export default App;
