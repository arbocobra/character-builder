import React, { useState, useEffect, useRef, memo } from 'react';

import { PointBuy } from './abilities/PointBuy';
import { StandardArray } from './abilities/StandardArray';
import { RandomRoll } from './abilities/RandomRoll';

export const SelectAbilities = memo(function SelectAbilities(props) {
  const { updateSelect } = props;

    useEffect(() => {
      const selectionOptions = document.attributeSelect.attributes;
      for (const opt of Array.from(selectionOptions)) {
        opt.addEventListener('change', selectAttributeOption);
      }
    }, []);

    const handleSelect = (arr) => {
      updateSelect(arr, 'base');
      setSelectionType('Complete. Can reselect.');
    };
  
    const [selectionType, setSelectionType] = useState('No method selected');
    const abilities = useRef(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma',]);

    const selectAttributeOption = (event) => {
      setSelectionType(event.target.value);
    };

    const reset = () => setSelectionType('No method selected')
  
    return (
      <div className="stat-input-container">
        <div className='section-heading'>
          <p className='section-title'>Select Abilities</p>
        </div>
        <div id="SelectAbilities" className="stat-input hidden">
            <form id="selection-form" name="attributeSelect" className='selectionRadio'>
              <div>
                <input type="radio" id="point-buy" name="attributes" value="point-buy"/>
                <label htmlFor="point-buy">Point Buy</label>
              </div>
              <div>
                <input type="radio" id="standard-array" name="attributes" value="standard-array"/>
                <label htmlFor="standard-array">Standard Array</label>
              </div>
              <div>
                <input type="radio" id="random-roll" name="attributes" value="random-roll"/>
                <label htmlFor="random-roll">Random Roll</label>
              </div>
            </form>
            {selectionType === 'point-buy' ? (
              <PointBuy abilities={abilities.current} submit={handleSelect} reset={reset} />
            ) : selectionType === 'standard-array' ? (
              <StandardArray abilities={abilities.current} submit={handleSelect} reset={reset} />
            ) : selectionType === 'random-roll' ? (
              <RandomRoll abilities={abilities.current} submit={handleSelect} reset={reset} />
            ) : (
              <p>{selectionType}</p>
            )}
          </div>
      </div>
    );
  });