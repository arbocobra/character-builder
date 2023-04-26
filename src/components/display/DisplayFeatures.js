import React, { useState, useEffect, useRef, memo } from 'react';
import featDetails from './../../data/FeatureDetails';
import { smartCase } from '../utilities/helperFunctions';
const _ = require('lodash'); 

export const DisplayFeatures = memo(function DisplayFeatures(props) {
   const {currentCharacter} = props;
   return (
      <div className='stat-box' id='features'>
         <FeaturesRow name='features' bio={currentCharacter.features}/>
         <FeaturesRow name='proficiencies' bio={currentCharacter.proficiencies}/>
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
           <div key={i} className='tooltip'>
             <div>{el}</div>
             <div className='tooltiptext'>{results[2][i]}</div>
           </div>
         )}
     })
   //   console.log(rows)
     return ( 
     <div className='row-grid' key={`${name}-${index}`}>
       {name === 'features' ? <div className='feat-subtitle'>{results[0] ? `${_.capitalize(results[0])}:` : null}</div> : null}
       {name === 'proficiencies' ? <div className='feat-subtitle'>{results[0] ? `${_.capitalize(results[0])}:` : null}</div> : null}
       <div>{ rows }</div>
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