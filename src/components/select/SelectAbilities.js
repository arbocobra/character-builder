import React, { useState, useEffect, useRef, memo } from 'react';

import { PointBuy } from './abilities/PointBuy';
import { StandardArray } from './abilities/StandardArray';
import { RandomRoll } from './abilities/RandomRoll';

export const SelectAbilities = memo(function SelectAbilities(props) {
  
    useEffect(() => {
      const selectionOptions = document.attributeSelect.attributes;
      for (const opt of Array.from(selectionOptions)) {
        opt.addEventListener('change', selectAttributeOption);
      }
    }, []);
  
    const [selectionType, setSelectionType] = useState('No method selected');
    const abilities = useRef(['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma',]);

    const selectAttributeOption = (event) => {
      setSelectionType(event.target.value);
    };
  
    return (
      <div className="stat-input-container abilities">
        <div id="SelectAbilities" className="stat-input">
          <p className='section-title'>Select Abilities</p>
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
              <PointBuy {...props} abilities={abilities.current} setSelectionType={setSelectionType} />
            ) : selectionType === 'standard-array' ? (
              <StandardArray {...props} abilities={abilities.current} setSelectionType={setSelectionType} />
            ) : selectionType === 'random-roll' ? (
              <RandomRoll {...props} abilities={abilities.current} setSelectionType={setSelectionType} />
            ) : (
              <p>{selectionType}</p>
            )}
          </div>
      </div>
    );
  });