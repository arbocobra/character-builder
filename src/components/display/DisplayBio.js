import React, { useEffect, Fragment, memo } from 'react';
const _ = require('lodash'); 

export const DisplayBio = memo(function DisplayBio(props) {
   const {currentCharacter} = props;
  //  const { race, subrace, background, level, size, speed} = currentCharacter;
   const skills = currentCharacter.skills.total;
   const languages = currentCharacter.languages.total;
  
   return (
    <div>
      <Row name={'Race'} bio={currentCharacter.race} type='string' list={false} />
      <Row name={'Subrace'} bio={currentCharacter.subrace} type='string' list={false} />
      <Row name={'Size'} bio={currentCharacter.size} type='string' list={false} />
      <Row name={'Speed'} bio={currentCharacter.speed} type='num' list={false} />
      <Row name={'Background'} bio={currentCharacter.background} type='string' list={false} />
      <Row name={'Prof. Bonus'} bio={currentCharacter.proficiency_bonus} type='num' list={false} />
      <Row name={'Class'} bio={currentCharacter.class} type='string' list={false} />
      <Row name={'Level'} bio={currentCharacter.level} type='num' list={false} />
      {/* <Row name={'Abilities'} bio={currentCharacter.abilities.total} type='array' list={false} /> */}
      <Row name={'Languages'} bio={currentCharacter.languages.total} type='array' list={false} />
      <Row name={'Skills'} bio={currentCharacter.skills.total} type='array' list={false} />
      <FeaturesRow features={currentCharacter.features} />
    </div>
   )
 })

 const Row = (props) => {
    const {name, bio, type, list} = props;

    const bioBool = (type) => {
      if (type === 'string' || type === 'array') return bio.length > 0;
      if (type === 'num') return bio > 0;
    }

    const isTrue = bioBool(type);

    if (isTrue) {
      return (
        <div className='row-grid'>
          <div>{name}:</div>
          { list ? (<ul>{bio.map((el,i) => (<li key={`${name}-${i}`}>{el}</li>))}</ul>) : null }
          { !list && type === 'array' ? (<div>{bio.join(', ')}</div>) : null }
          { !list && type !== 'array' ? (<div>{bio}</div>) : null }
        </div>
      )
    }
 }

 const FeaturesRow = (props) => {
  const {features} = props;

  // const bioBool = (type) => {
  //   if (type === 'string' || type === 'array') return bio.length > 0;
  //   if (type === 'num') return bio > 0;
  // }
  const total = features.total;
  const isTrue = total.length > 0;

  if (isTrue) {
    return (
      <div className='row-grid'>
        <div>Features:</div>
        <div className='grid-features'>
          { features.race.length ? (<ul>{ features.race.map((el,i) => (<li key={`features_race-${i}`}>{el}</li>)) }</ul>) : null}
          { features.background.length ? (<ul>{ features.background.map((el,i) => (<li key={`features_background-${i}`}>{el}</li>)) }</ul>) : null}
          { features.class.length ? (<ul>{ features.class.map((el,i) => (<li key={`features_class-${i}`}>{el}</li>)) }</ul>) : null}
        </div>
      </div>
    )
  }
}