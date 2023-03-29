import '../../abilities.css'
import React, { useState, useEffect, useRef } from 'react';

export const AbilitiesGrid = (props) => {
    const {baseModifiers, bonusModifiers, modCalc, modifierPoints} = props;

    const abilities = useRef(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma' ]);
    const initialValue = useRef([0,0,0,0,0,0]);

    const [displayTotal, setDisplayTotal] = useState(initialValue.current)
    const [displayBase, setDisplayBase] = useState(initialValue.current)
    const [displayBonus, setDisplayBonus] = useState(initialValue.current);
    // const [modifierPoints, setModifierPoints] = useState(initialValue.current);
    const [displayMax, setDisplayMax] = useState(false);

    useEffect(() => setDisplayTotal(() => displayBase.map((el, i) => el + displayBonus[i])), [displayBase, displayBonus]);

    useEffect(() => {
        if (bonusModifiers) {
            setDisplayBonus(initialValue.current)
            if (Object.keys(bonusModifiers).length > 1) {
                // console.log('something else')
                const bonusHold = [];
                for (const [key, value] of Object.entries(bonusModifiers)) {
                    if (bonusHold.length < 1) {
                        value.map(el => el === '-' ? bonusHold.push([0]) : bonusHold.push([el]))
                    } else {
                        value.map((el, i) => el === '-' ? bonusHold[i].push(0) : bonusHold[i].push(el))
                    }
                }
                const update = bonusHold.map(arr => arr.reduce((a,b) => a + b))
                setDisplayBonus(update.flat());
            } else {
                const value = Object.values(bonusModifiers)[0];
                if (typeof value === 'object') {
                    setDisplayBonus(() => value.map((el, i) => el === '-' ? 0 : el));
                }
            }
        }
    }, [bonusModifiers]);

    useEffect(() => {
        if (baseModifiers) {
            setDisplayBase(baseModifiers);
        }
    }, [baseModifiers]);

    useEffect(() => {
        if (baseModifiers) {
            modCalc(displayTotal);
            // setModifierPoints(() => displayTotal.map(el => Math.floor((el - 10) / 2)));
        }
        if (displayTotal.some(el => el > 20)) setDisplayMax(true)
        else setDisplayMax(false)
    }, [displayTotal]);

    const gridDiv = (mod, i) => {
        const title = mod.charAt(0).toUpperCase() + mod.slice(1);
        const abr = mod.slice(0,3);
        const maxVal = (<span>20 <span className='red'>*</span></span>)
        return (
            <div key={`${mod}-div`} className={mod}>
                <div className={`${abr}-title title`}>{title}</div>
                <div className={`${abr}-base`}>{displayBase[i] > 0 ? displayBase[i] : '-'}</div>
                <div className={`${abr}-bonus`}>{displayBonus[i] > 0 ? displayBonus[i] : '-'}</div>
                <div className={`${abr}-total`}>{displayTotal[i] === 0 ? '-' : displayTotal[i] > 20 ? maxVal : displayTotal[i]}</div>
                <div className={`${abr}-mod`}>{modifierPoints[i] < 0 ? `${modifierPoints[i]}` : modifierPoints[i] > 0 ? `+${modifierPoints[i]}` : '-'}</div>
            </div>
        )
    }

    return (
        <>
            <div className="grid-container">
                <div className="grid-header">
                    <div className="blank title"></div>
                    <div className="base">Base Score</div>
                    <div className="bonus">Bonus</div>
                    <div className="total">Total Score</div>
                    <div className="modifier">Modifier</div>
                </div>
                { abilities.current.map(gridDiv)}
            </div>
            {displayMax && (<span className='alert'>* Max ability score is 20</span>)}
        </>
    )
}