import React, { useState, useEffect, useRef, memo } from 'react';
import featDetails from './../../data/FeatureDetails';
import { smartCase } from '../utilities/helperFunctions';
import CharacterClassSubclass from '../../data/ClassSubclass';
import { toggleHeading } from '../utilities/selectFunctions';

const _ = require('lodash'); 

export const DisplayFeatures = memo(function DisplayFeatures(props) {
   const {currentCharacter} = props;

   const isSpellcaster = (currentCharacter.spellcaster && currentCharacter.level > 0);
   
   return (
      <div className='stat-box' id='features'>
         <FeaturesRow name='features' bio={currentCharacter.features}/>
         <FeaturesRow name='proficiencies' bio={currentCharacter.proficiencies}/>
         
         { isSpellcaster ? <Spellcasting charClass={currentCharacter.class} spellStats={currentCharacter.class_spellcasting} /> : null}
      </div>
   )
})

const FeaturesRow = (props) => {
   const {name, bio} = props;
 
   const count = Array(3).fill(null);
   const cats = name === 'features' ? Object.keys(bio) : Object.keys(bio.total)
 
   const isTrue = bio.total?.length > 0 || _.some(bio.total, (el) => el.length )
 
   const getDetails = (cat) => {
     let row = ['', [], []];
     const arr = name === 'features' ? bio[cat] : bio.total[cat];

     if (arr.length) {
       row[0] = cat;
       arr.map(el => {
         if (typeof el === 'string') {
           let cap = smartCase(el);
           row[1].push(cap)
           let tip = Object.keys(featDetails[cat]).includes(el) ? featDetails[cat][el] : null;
           row[2].push(tip)
         } else if (typeof el === 'object') {
           // console.log('array')
           let caps = el.map(e => _.capitalize(e))
           // console.log(caps)
           row[1].push(caps)
           row[2].push(null)
         }
       })
     }
     return row;
   }
   // let allFeats = Object.keys(featDetails.class).sort()
   // console.log(allFeats)
   const DisplayFeatures = (index) => {
     let results = getDetails(cats[index]);
   //   console.log(results)
     const rows = results[1].map((el,i) => {
       if (_.isArray(el)) {
         return (<div key={i}>{el.join(', ')}</div>)
       } else if (!results[2][i]) {
         return (<div key={i}>{el}</div>)
       } else {
         return (
          //  <div key={i} className='tooltip'>
          //    <div>{el}</div>
          //    <div className='tooltiptext'>{results[2][i]}</div>
          //  </div>
          <div className='feat' key={i}>
             <div className='tooltip'>{el}
              <span className='tooltiptext'>{results[2][i]}</span>
              {/* <div className='tooltipArrow'></div> */}
             </div>
           </div>
         )}
     })
   //   console.log(rows)
     return ( 
     <div className='row-grid' key={`${name}-${index}`}>
       {name === 'features' ? <div className='feat-subtitle'>{results[0] ? `${_.capitalize(results[0])}:` : null}</div> : null}
       {name === 'proficiencies' ? <div className='feat-subtitle'>{results[0] ? `${_.capitalize(results[0])}:` : null}</div> : null}
       <div className='feat-inner'>{ rows }</div>
     </div>
     )
   }
   return (
      <div className="display-container grid-features">
         <div className='display-heading open'>
            <p className='section-title'>{_.capitalize(name)}</p>
         </div>
         {/* <div>{_.capitalize(name)}:</div> */}
         <div className='display-box'>
         { isTrue ? count.map((_,i) => DisplayFeatures(i)) : <p>None selected</p>}
         </div>
       </div>
   )
 }

 const Spellcasting = (props) => {
  const {charClass, spellStats} = props;
  const spellRef = useRef()
  const slotsRef = useRef()
  
  useEffect(() => spellRef.current.addEventListener('click', () => toggleHeading(spellRef.current)), [])

  useEffect(() => {
    if (spellStats.spell_slots.length > 6) {
      slotsRef.current.classList.remove('spell-slots-sm')
      slotsRef.current.classList.remove('spell-slots-md')
      slotsRef.current.classList.add('spell-slots-lg')
    } else if (spellStats.spell_slots.length < 6) {
      slotsRef.current.classList.add('spell-slots-sm')
      slotsRef.current.classList.remove('spell-slots-md')
      slotsRef.current.classList.remove('spell-slots-lg')
    } else {
      slotsRef.current.classList.remove('spell-slots-sm')
      slotsRef.current.classList.add('spell-slots-md')
      slotsRef.current.classList.remove('spell-slots-lg')
    }
  },[spellStats])
  
  const inner = CharacterClassSubclass.spellcasting[charClass]();
  const spellSlots = spellStats.spell_slots.map((el,i) => {
    return (
      <div key={`spell-slot-${i}`} className='spell-stat-inner'>
        <span className='stat'>{el}</span>
        <span className='stat-name'>
          { i === 0 ? 'Cantrips' : i === 1 ? '1st' : i === 2 ? '2nd' : i === 3 ? '3rd' : `${i}th`}
        </span>
      </div>
    )
  })

      return (
         <div className="display-container grid-features">
            <div ref={spellRef} className='display-heading open'>
               <p className='section-title'>{charClass === 'warlock' ? 'Pact Magic' : 'Spellcasting'}</p>
            </div>
            <div className='display-box'>
              <div className='spell-stats'>
                <div className='spell-stat-inner'>
                  <span className='stat'>{spellStats.spell_modifier > 0 ? `+${spellStats.spell_modifier}`: spellStats.spell_modifier}</span>
                  <span className='stat-name'>Modifier</span>
                </div>
                <div className='spell-stat-inner'>
                <span className='stat'>{spellStats.spell_save > 0 ? `+${spellStats.spell_save}`: spellStats.spell_save}</span>
                  <span className='stat-name'>Spell Attack</span>
                </div>
                <div className='spell-stat-inner'>
                <span className='stat'>{spellStats.spell_attack > 0 ? `+${spellStats.spell_attack}`: spellStats.spell_attack}</span>
                  <span className='stat-name'>Save DC</span>
                </div>
              </div>
              <div className='spell-slots'>
                <p className='spellslot-heading'>Spell Slots</p>
                <div ref={slotsRef}>
                  { spellSlots }
                </div>
              </div>
               { inner }
            </div>
         </div>
      )

 }

 const FeatureStats = (props) => {

  return (
    <div></div>
  )
 }