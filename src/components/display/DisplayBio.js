import React, { useState, useEffect, Fragment, memo } from 'react';
import featDetails from './../../data/FeatureDetails';
import { smartCase } from '../utilities/helperFunctions';
const _ = require('lodash'); 

// export const DisplayBio = memo(function DisplayBio(props) {
//   const {currentCharacter} = props;

//   const titles = [
//     'race', 'subrace', 
//     'class', 'subclass', 
//     'level', 'proficiency_bonus',
//     'hit_points', 'hit_dice',
//     'size', 'speed', 'background',  'saving_throws', 'languages', 'skills']
    
//     // passive wisdom - armour class - initiative
//   const totalTitles = ['languages', 'skills'];
//   const displayTitles = ['features', 'proficiencies']
  

//   const bioDisplay = [];
  
//   const titleEffects = (title) => {
//     let result;
//     if (title.includes('_')) result = title.split('_').join(' ');
//     else if (title === 'subclass') result = currentCharacter.sub_name;
//     else result = title;
//     return _.capitalize(result)
//   }
  
//   const valEffects = (val, type, title) => {
//     let result;
//     if (type === 'object') {
//       let caps = val.map(el => _.capitalize(el));
//       result = caps.join(', ');
//     } else {
//       result = _.capitalize(val)
//     }
//     return result
//   }

//   const createRow = (title, val, type) => {
//     if (totalTitles.includes(title)) val = currentCharacter[title].total;
//     const isSelected = type === 'number' ? val > 0 : val.length > 0;
//     if (isSelected) {
//       let newTitle = titleEffects(title);
//       let newVal = valEffects(val, type, title);
//       const row = <div>{newVal}</div>
//       bioDisplay.push([newTitle, row])
//     }
//   }

//   const createFeatureRow = (title, val) => {
//     if (title === 'proficiencies') {
//       for (let cat in val) {
//         if (val[cat].total.length) {
//           let newVal = valEffects(val[cat].total, 'object', title);
//           const row = <div>{newVal}</div>
//           bioDisplay.push([cat, row])
//         }
//       }
//     }
//     // let list;
//     // if (title === 'features') {
//     //   if (val.total.length) {
//     //     list = createListRow(title)
//     //     bioDisplay.push([title, list])
//     //   }
//     // } else if (title === 'proficiencies') {
//     //   for (let cat in val) {
//     //     if (val[cat].total.length) {
//     //       list = createListRow(val[cat].total)
//     //       bioDisplay.push([cat, list])
//     //     }
//     //   }
//     // }
//   }

//   const createListRow = (val) => {
//     return (
//       <div>
//         { val.map(el => _.isArray(el) ? (<div>{el.join(' ')}</div>) : (<div>{el}</div>))}
//       </div>    
//     )
//   }

//   titles.forEach(el => createRow(el, currentCharacter[el], typeof currentCharacter[el]))
//   displayTitles.forEach(el => createFeatureRow(el, currentCharacter[el]))

//   return (
//     <div className="display-parent">
//       {bioDisplay.map(el => (
//         <div className='bio-row' key={`bio-${el[0]}`}>
//           <div>{el[0]}:</div>
//           {el[1]}
//         </div>
//       ))}
//     </div>
//   )

// })

export const DisplayBio = memo(function DisplayBio(props) {
   const {currentCharacter} = props;
  //  const skills = currentCharacter.skills.total;
  //  const languages = currentCharacter.languages.total;
  //  const titles = ['race', 'subrace', 'size', 'speed', 'background', 'proficiency_bonus', 'class', 'subclass', 'level', 'hit_points', 'hit_dice', 'saving_throws', 'languages', 'skills']

   const altRow = (title, bio, type) => {
    const isTrue = type === 'num' ? bio > 0 : bio.length > 0;
    if (isTrue) return (
      <div className='row-grid'>
        <div>{title}:</div>
        { type === 'array' ? (<div>{bio.map(el => _.capitalize(el)).join(', ')}</div>) : null }
        { type !== 'array' ? (<div>{_.capitalize(bio)}</div>) : null }
      </div>
    )
   }

   const featureRow = (features) => {
    const featureCats = ['race', 'class', 'background']

    const list = (cat, feats) => {
      
    }

    const isTrue = features.total.length > 0;
    if (isTrue) return (
        <div className='row-grid'>
          <div>Features:</div>
          <div className='grid-features'>
            { featureCats.map(el => features[el].length ? <FeaturesList key={el} cat={el} features={features[el]} /> : null )}
          </div>
        </div>
      )
   } 

   return (
    <div className="display-parent">
      { altRow('Race', currentCharacter.race, 'string') }
      { altRow('Subrace', currentCharacter.subrace, 'string') }
      { altRow('Class', currentCharacter.class, 'string') }
      { altRow(currentCharacter.sub_name, currentCharacter.subclass, 'string') }
      { altRow('Level', currentCharacter.level, 'num') }
      { altRow('Prof. Bonus', currentCharacter.proficiency_bonus, 'num') }
      { altRow('Hit Dice', currentCharacter.hit_dice, 'string') }
      { altRow('Hit Points', currentCharacter.hit_points, 'num') }
      { altRow('Speed', currentCharacter.speed, 'num') }
      { altRow('Size', currentCharacter.size, 'string') }
      { altRow('Background', currentCharacter.background, 'string') }
      { altRow('Saving Throws', currentCharacter.saving_throws, 'array') }
      { altRow('Languages', currentCharacter.languages.total, 'array') }
      { altRow('Skills', currentCharacter.skills.total, 'array') }
      { featureRow(currentCharacter.features) }

    </div>
    // <Fragment>
    //   <Row name={'Race'} bio={currentCharacter.race} type='string' list={false} />
    //   <Row name={'Subrace'} bio={currentCharacter.subrace} type='string' list={false} />
    //   <Row name={'Size'} bio={currentCharacter.size} type='string' list={false} />
    //   <Row name={'Speed'} bio={currentCharacter.speed} type='num' list={false} />
    //   <Row name={'Background'} bio={currentCharacter.background} type='string' list={false} />
    //   <Row name={'Prof. Bonus'} bio={currentCharacter.proficiency_bonus} type='num' list={false} />
    //   <Row name={'Class'} bio={currentCharacter.class} type='string' list={false} />
    //   <Row name={currentCharacter.sub_name} bio={currentCharacter.subclass} type='string' list={false} />
    //   <Row name={'Level'} bio={currentCharacter.level} type='num' list={false} />
    //   <Row name={'Hit Points'} bio={currentCharacter.hit_points} type='num' list={false} />
    //   <Row name={'Hit Dice'} bio={currentCharacter.hit_dice} type='string' list={false} />
    //   <Row name={'Saving Throws'} bio={currentCharacter.saving_throws} type='array' list={false} />
    //   {/* <Row name={'Abilities'} bio={currentCharacter.abilities.total} type='array' list={false} /> */}
    //   <Row name={'Languages'} bio={currentCharacter.languages.total} type='array' list={false} />
    //   <Row name={'Skills'} bio={currentCharacter.skills.total} type='array' list={false} />
    //   <FeaturesRow features={currentCharacter.features} />
    // </Fragment>
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