import React, { Fragment } from 'react';

export const DisplayBio = (props) => {
   const {currentCharacter} = props;
   return (
     <Fragment>
       { currentCharacter.race !== '' && (<div className='row-grid'>
         <div>Race:</div>
         <div>{currentCharacter.race}</div>
       </div>)}
       { currentCharacter.subrace !== '' && (<div className='row-grid'>
         <div>Subrace:</div>
         <div>{currentCharacter.subrace}</div>
       </div>)}
       { currentCharacter.background !== '' && (<div className='row-grid'>
         <div>Background:</div>
         <div>{currentCharacter.background}</div>
       </div>)}
       { currentCharacter.class !== '' && (<div className='row-grid'>
         <div>Class:</div>
         <div>{currentCharacter.class}</div>
       </div>)}
       { currentCharacter.level > 0 && (<div className='row-grid'>
         <div>Level:</div>
         <div>{currentCharacter.level}</div>
       </div>)}
       { currentCharacter.language.length > 0 && (<div className='row-grid'>
         <div>Language(s):</div>
         <ul>{ currentCharacter.language.map((el,i) => (<li key={`language-${i}`}>{el}</li>)) }</ul>
       </div>)}
       { currentCharacter.size !== '' && (<div className='row-grid'>
         <div>Size:</div>
         <div>{currentCharacter.size}</div>
       </div>)}
       { currentCharacter.speed > 0 && (<div className='row-grid'>
         <div>Speed:</div>
         <div>{currentCharacter.speed}</div>
       </div>)}
       { (currentCharacter.extras_race.length > 0 || currentCharacter.extras_class.length > 0 || currentCharacter.extras_background.length > 0) && (<div className='row-grid'>
         <div>Features:</div>
         <div className='grid-features'>
           { currentCharacter.extras_race.length > 0 && 
           (<ul>{ currentCharacter.extras_race.map((el,i) => (<li key={`extras_race-${i}`}>{el}</li>)) }</ul>) }
           { currentCharacter.extras_class.length > 0 && 
           (<ul>{ currentCharacter.extras_class.map((el,i) => (<li key={`extras_class-${i}`}>{el}</li>)) }</ul>) }
           { currentCharacter.extras_background.length > 0 && 
           (<ul>{ currentCharacter.extras_background.map((el,i) => (<li key={`extras_background-${i}`}>{el}</li>)) }</ul>) }
         </div>
       </div>)}
     </Fragment>
   )
 }