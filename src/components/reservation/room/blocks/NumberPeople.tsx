import React from 'react';
import './ReservationBlock.css';

type NumberPeopleProp = {
    isDateConfirmed: boolean,
    isCountConfirmed: boolean,
    count: number | null,
    setCount: (_: number | null) => void
}

export default function NumberPeople({ isDateConfirmed, isCountConfirmed, count, setCount }: NumberPeopleProp) {
	return isDateConfirmed ? (
        <div className="settings-block">
            <p>Number of people:</p>
            <input className="value-block" type="number" 
                value={count ?? 0}
                onChange={e => 
                    parseInt(e.target.value) > 0 ? setCount(parseInt(e.target.value)) : setCount(null)
                }/>
        </div>
    ) : isCountConfirmed ? (
        <div className="settings-block">
            <p>Number of people:</p>
            <div className="value-block">
                { count }
            </div>
        </div>
    ) : null
}
