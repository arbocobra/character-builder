import React, { useState, useEffect, useRef, memo } from 'react';
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
  // const firstRender = useRef(true)
  // const [display, setDisplay] = useState({})
  // const [hover, setHover] = useState({})

  const count = Array(3).fill(null);
  const cats = Object.keys(bio)

  const isTrue = bio.total?.length > 0 || cats.some(el => bio[el].total?.length);

  // useEffect(() => {
  //   const section = document.getElementById(name);
  //   // if (section) section.replaceChildren()
  //   // console.log(section.parentElement)
  //   displayText(section)

  // }, [bio])
  
  // const displayText = () => {
  //   const result = [];
  //   // const section = document.getElementById(name)
  //   // console.log(section)
  //   count.forEach((_,i) => {
  //     let details = getDetails(cats[i]);
  //     if (details[1].length) {
  //       const row = document.createElement('ul');
  //       if (name === 'proficiencies') {
  //         let subtitle = document.createElement('div')
  //         let text = document.createTextNode(details[0]);
  //         subtitle.append(text)
  //         // row.append(subtitle)
  //         // subtitle.classList.add('subtitle')
  //       }
  //       details[1].forEach((el,j) => {
  //         let list = document.createElement('li');
  //         let div = document.createElement('div')
  //         let innerA = document.createElement('div')
  //         let innerB = document.createElement('div')
  //         let text = document.createTextNode(el);
  //         let description = document.createTextNode(details[2][j]);
  //         innerA.append(text);
  //         innerB.append(description)
  //         div.append(innerA, innerB)
  //         list.append(div)
  //         row.append(list)
  //         div.classList.add('tooltip')
  //         innerB.classList.add('tooltiptext')
  //       })
  //       result.push(row)
  //       // section.append(row)
  //     }
  //   }) 
  //   if (!firstRender.current) return result
  //   // console.log(row)
  //   // return result;
  // }
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
  // const list = displayText();
  // console.log(list)

  // useEffect(() => {
  //   firstRender.current = false
  // }, [])

  const DisplayFeatures = (index) => {
    let results = getDetails(cats[index]);
    // console.log(results)
    
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
        )
      }
    })

    return ( 
    <div className='row-grid' key={`${name}-${index}`}>
      <div className='feat-subtitle'>{results[0] ? `${_.capitalize(results[0])}:` : null}</div>
      <div>{ rows }</div>
    </div>
    )
  }
  
  if (isTrue) return (
      <div className='grid-features'>
        <div>{_.capitalize(name)}:</div>
        {count.map((_,i) => DisplayFeatures(i))}
      </div>
    )
}

// Features
// div - row-grid
// div - (name) /div
// div - grid-features
// ul (each cat)
// li (map cat array)
// div -  tooltip
// div - (el) /div
// div - tooltiptext (hover) /div
//  /div /li

// Profs
// div - row-grid
// div - (name) /div
// div - grid-features
// div (each cat) /div
// ul 
// li (map cat array)
// div -  tooltip
// div - (el) /div
// div - tooltiptext (hover) /div
//  /div /li

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

          
//         </div>
//       </div>
//     )
//   }
// }

// const Row = (props) => {
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




// const FeaturesList = (props) => {
//   const {features, cat} = props;
//   const [display, setDisplay] = useState([])
//   const [hover, setHover] = useState([])

//   useEffect(() => {
//     const update = displayText();
//     setDisplay(update[0]);
//     setHover(update[1])
//   },[features])
  
//   const displayText = () => {
//     const result = [[],[]];
//     features.map(el => {
//       let cap = smartCase(el);
//       if (Object.keys(featDetails[cat]).includes(el)) {
//         let tip = featDetails[cat][el];
//         result[1].push(tip);
//       } else result[1].push('-');
//       result[0].push(cap);
//     })
//     return result;
//   }

//   return (

//       <ul>
//         { display.map((el,i) => (<li key={`${cat}-feat${i}`}>
//           <div className="tooltip">
//             <div>{el}</div>
//             <div className="tooltiptext">{hover[i]}</div>
//           </div>
//         </li>)) }
//       </ul>

//   )
// }