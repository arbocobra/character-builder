import React, { useState, useEffect, Fragment, memo } from 'react';
import featDetails from './../../data/FeatureDetails';
import { smartCase } from '../utilities/helperFunctions';
const _ = require('lodash'); 

export const DisplayBio = memo(function DisplayBio(props) {
   const {currentCharacter} = props;
  //  const { race, subrace, background, level, size, speed} = currentCharacter;
   const skills = currentCharacter.skills.total;
   const languages = currentCharacter.languages.total;
  
   return (
    <Fragment>
      <Row name={'Race'} bio={currentCharacter.race} type='string' list={false} />
      <Row name={'Subrace'} bio={currentCharacter.subrace} type='string' list={false} />
      <Row name={'Size'} bio={currentCharacter.size} type='string' list={false} />
      <Row name={'Speed'} bio={currentCharacter.speed} type='num' list={false} />
      <Row name={'Background'} bio={currentCharacter.background} type='string' list={false} />
      <Row name={'Prof. Bonus'} bio={currentCharacter.proficiency_bonus} type='num' list={false} />
      <Row name={'Class'} bio={currentCharacter.class} type='string' list={false} />
      <Row name={currentCharacter.sub_name} bio={currentCharacter.subclass} type='string' list={false} />
      <Row name={'Level'} bio={currentCharacter.level} type='num' list={false} />
      <Row name={'Hit Points'} bio={currentCharacter.hit_points} type='num' list={false} />
      <Row name={'Hit Dice'} bio={currentCharacter.hit_dice} type='string' list={false} />
      <Row name={'Saving Throws'} bio={currentCharacter.saving_throws} type='array' list={false} />
      {/* <Row name={'Abilities'} bio={currentCharacter.abilities.total} type='array' list={false} /> */}
      <Row name={'Languages'} bio={currentCharacter.languages.total} type='array' list={false} />
      <Row name={'Skills'} bio={currentCharacter.skills.total} type='array' list={false} />
      <FeaturesRow features={currentCharacter.features} />
    </Fragment>
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

  const total = features.total;
  const isTrue = total.length > 0;
  const featureCats = ['race', 'class', 'background']

  if (isTrue) {

    return (
      <div className='row-grid'>
        <div>Features:</div>
        <div className='grid-features'>
          { featureCats.map(el => features[el].length ? <FeaturesList key={el} cat={el} features={features[el]} /> : null ) }

          {/* {features.race.length ? <FeaturesRace features={features.race} /> : null }
          {features.class.length ? <FeaturesClass features={features.class} /> : null }
          {features.background.length ? <FeaturesBackground features={features.background} /> : null } */}

          {/* { features.race.length ? (<ul>{ features.race.map((el,i) => (<li key={`features_race-${i}`}>{el}</li>)) }</ul>) : null}
          { features.background.length ? (<ul>{ features.background.map((el,i) => (<li key={`features_background-${i}`}>{el}</li>)) }</ul>) : null}
          { features.class.length ? (<ul>{ features.class.map((el,i) => (<li key={`features_class-${i}`}>{el}</li>)) }</ul>) : null} */}
        </div>
      </div>
    )
  }
}

const FeaturesList = (props) => {
  const {features, cat} = props;
  const [display, setDisplay] = useState([])
  const [hover, setHover] = useState([])

  useEffect(() => {
    const update = displayText();
    setDisplay(update[0]);
    setHover(update[1])
  },[features])
  
  const displayText = () => {
    const result = [[],[]];
    features.map(el => {
      let cap = smartCase(el);
      if (Object.keys(featDetails[cat]).includes(el)) {
        let tip = featDetails[cat][el];
        result[1].push(tip);
      } else result[1].push('-');
      result[0].push(cap);
    })
    return result;
  }

  return (

      <ul>
        { display.map((el,i) => (<li key={`${cat}-feat${i}`}>
          <div className="tooltip">
            <div>{el}</div>
            <div className="tooltiptext">{hover[i]}</div>
          </div>
        </li>)) }
      </ul>

  )
}