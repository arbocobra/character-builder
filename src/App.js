import './App.css';
import React, { useState, useEffect } from 'react';
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
    background: '',
    baseModifiers: [],
    bonusModifiers_race: [],
    bonusModifiers_class: [],
    class: '',
    extras_race: [],
    extras_class: [],
    extras_background: [],
    language: [],
    level: 0,
    proficiency_bonus: 0,
    race: '',
    size: '',
    skills: [],
    speed: 0,
    subclass: '',
    subrace: '',
    variant: '',
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
