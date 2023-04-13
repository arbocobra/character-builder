import React, { useState, useEffect, Fragment, memo } from 'react';
import featDetails from './../../data/FeatureDetails';
import { smartCase } from '../utilities/helperFunctions';
const _ = require('lodash'); 

export const DisplayBio = memo(function DisplayBio(props) {
   const {currentCharacter} = props;
  //  const skills = currentCharacter.skills.total;
  //  const languages = currentCharacter.languages.total;
  //  const titles = ['race', 'subrace', 'size', 'speed', 'background', 'proficiency_bonus', 'class', 'subclass', 'level', 'hit_points', 'hit_dice', 'saving_throws', 'languages', 'skills']

   const Row = (title, bio, type) => {
    const isTrue = type === 'num' ? bio > 0 : bio.length > 0;
    if (isTrue) return (
      <div className='row-grid'>
        <div>{title}:</div>
        { type === 'array' ? (<div>{bio.map(el => _.capitalize(el)).join(', ')}</div>) : null }
        { type !== 'array' ? (<div>{_.capitalize(bio)}</div>) : null }
      </div>
    )
   }
  //  useEffect(() => console.log(currentCharacter.proficiencies), [currentCharacter])

   return (
    <div className="display-parent">
      { Row('Race', currentCharacter.race, 'string') }
      { Row('Subrace', currentCharacter.subrace, 'string') }
      { Row('Class', currentCharacter.class, 'string') }
      { Row(currentCharacter.sub_name, currentCharacter.subclass, 'string') }
      { Row('Level', currentCharacter.level, 'num') }
      { Row('Prof. Bonus', currentCharacter.proficiency_bonus, 'num') }
      { Row('Hit Dice', currentCharacter.hit_dice, 'string') }
      { Row('Hit Points', currentCharacter.hit_points, 'num') }
      { Row('Speed', currentCharacter.speed, 'num') }
      { Row('Size', currentCharacter.size, 'string') }
      { Row('Background', currentCharacter.background, 'string') }
      { Row('Saving Throws', currentCharacter.saving_throws, 'array') }
      { Row('Languages', currentCharacter.languages.total, 'array') }
      { Row('Skills', currentCharacter.skills.total, 'array') }
      <FeaturesRow name='features' bio={currentCharacter.features}/>
      <FeaturesRow name='proficiencies' bio={currentCharacter.proficiencies}/>

    </div>
   )
 })

const FeaturesRow = (props) => {
  const {name, bio} = props;
  // const [display, setDisplay] = useState({})
  // const [hover, setHover] = useState({})

  const count = Array(3).fill(null);
  const cats = Object.keys(bio)

  // useEffect(() => {
  //   console.log(bio)
  //   count.forEach((_,i) => {
  //     let sub = cats[i]
  //     console.log(name)
  //     name === 'Features' ? console.log(bio[sub]) : console.log(bio[sub].total)
  //   }
  // )}, [bio])

  const isTrue = bio.total?.length > 0 || cats.some(el => bio[el].total?.length);
  // console.log(name + ': ' + isTrue)

  // const catA = name === 'features' ? bio[cats[0]] : bio[cats[0]].total;
  // const catB = name === 'features' ? bio[cats[1]] : bio[cats[1]].total;
  // const catC = name === 'features' ? bio[cats[2]] : bio[cats[2]].total;
  // console.log(catA)
  // console.log(catB)
  // console.log(catC)

  

  const displayText = () => {
    const result = [];
    count.forEach((_,i) => {
      let row = getDetails(cats[i]);
      result.push(row)
    }) 
    console.log(result)
  }
  const getDetails = (cat) => {
    let row = ['', [], []];
    const arr = name === 'features' ? bio[cat] : bio[cat].total;
    if (arr.length) {
      row[0] = cat;
      arr.map(el => {
        if (typeof el === 'string') {
          let cap = smartCase(el);
          row[1].push(cap)
          let tip = Object.keys(featDetails[cat]).includes(el) ? featDetails[cat][el] : null;
          row[2].push(tip)
        } else if (typeof el === 'object') {
          el.map(e => {
            row[1].push(e)
            row[2].push(null)
          })
        }
      })
    }
    return row;
  }
  displayText();

  // const isTrue = true

  if (isTrue) return (
      <div className='row-grid'>
        <div>{_.capitalize(name)}:</div>
        <div className='grid-features'>
          {/* { featureCats.map(el => features[el].length ? <FeaturesList key={el} cat={el} features={features[el]} /> : null )} */}
        </div>
      </div>
    )
}

 // const FeaturesRow = (props) => {
//   const {features} = props;

//   const total = features.total;
//   const isTrue = total.length > 0;
//   const featureCats = ['race', 'class', 'background']

//   if (isTrue) {

//     return (
//       <div className='row-grid'>
//         <div>Features:</div>
//         <div className='grid-features'>
//           { featureCats.map(el => features[el].length ? <FeaturesList key={el} cat={el} features={features[el]} /> : null ) }

//           {/* {features.race.length ? <FeaturesRace features={features.race} /> : null }
//           {features.class.length ? <FeaturesClass features={features.class} /> : null }
//           {features.background.length ? <FeaturesBackground features={features.background} /> : null } */}

//           {/* { features.race.length ? (<ul>{ features.race.map((el,i) => (<li key={`features_race-${i}`}>{el}</li>)) }</ul>) : null}
//           { features.background.length ? (<ul>{ features.background.map((el,i) => (<li key={`features_background-${i}`}>{el}</li>)) }</ul>) : null}
//           { features.class.length ? (<ul>{ features.class.map((el,i) => (<li key={`features_class-${i}`}>{el}</li>)) }</ul>) : null} */}
//         </div>
//       </div>
//     )
//   }
// }

//  const Row = (props) => {
//     const {name, bio, type, list} = props;

//     const bioBool = (type) => {
//       if (type === 'string' || type === 'array') return bio.length > 0;
//       if (type === 'num') return bio > 0;
//     }

//     const isTrue = bioBool(type);

//     if (isTrue) {
//       return (
//         <div className='row-grid'>
//           <div>{name}:</div>
//           { list ? (<ul>{bio.map((el,i) => (<li key={`${name}-${i}`}>{el}</li>))}</ul>) : null }
//           { !list && type === 'array' ? (<div>{bio.join(', ')}</div>) : null }
//           { !list && type !== 'array' ? (<div>{bio}</div>) : null }
//         </div>
//       )
//     }
//  }



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