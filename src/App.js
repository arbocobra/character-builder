// import './App.css';
import './Character.css'
import React, { useState, useEffect, useRef, memo } from 'react';
import { CharacterDisplay } from './components/CharacterDisplay';
import { CharacterSelect } from './components/CharacterSelect';

const App = () => {
  const [character, setCharacter] = useState({
    abilities: {
      base: [],
      bonus: {
        race: [],
        class: [],
      },
      totalBonus: [],
      total: [],
      modifiers: [],
    },
    // ***Temp - swap back after testing ****
    // abilities: { 
    //   base: [12,12,12,13,13,13],
    //   bonus: {
    //     race: [],
    //     class: [],
    //   },
    //   totalBonus: [],
    //   total: [12,12,12,13,13,13],
    //   modifiers: [1,1,1,1,1,1],
    // },
    // ***
    armor_class: {
      base: 0,
      sheild: 0,
      total: 0,
    },
    background: '',
    class: '',
    class_scf_count: [],
    class_special_1_name: '',
    class_special_1_count: 0,
    class_special_2_name: '',
    class_special_2_count: 0,
    class_special_3_name: '',
    class_special_3_count: 0,
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

  const toggleSection = (div, ) => {
    div.classList.toggle('open')
    div.nextElementSibling.classList.toggle('hidden')
    let parent = div.closest('.container-box');
    let arr = parent.querySelectorAll('.section-heading');
    arr.forEach((el,i) => {
      if (el !== div) {
      // if (i !== index) {
        el.classList.remove('open')
        el.nextElementSibling.classList.add('hidden')
      }
    })}

  const toggleHeading = (div) => {
    div.classList.toggle('open')
    div.nextElementSibling.classList.toggle('hidden')
  }

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
        <CharacterDisplay currentCharacter={character} />
      </div>
    </div>
  );
};

export default App;
