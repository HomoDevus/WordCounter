import React from "react";

function CounterFieldHeader({textArea, wordsAmount, liveCount, setLiveCount, charactersAmount}) {
    function handleEvent(e) {
        setLiveCount(e.target.checked);
    }

    return (
        <div className='counter-field__header'>
            <h3 className='counter-field__heading'>Words: {wordsAmount}</h3>
            <h3 className='counter-field__heading'>Characters: {charactersAmount}</h3>
            <label className='switch'>
                <h3 className='counter-field__heading'>Live Count</h3>
                <input type="checkbox" checked={liveCount} onChange={handleEvent}/>
                <span className='slider round'/>
            </label>
        </div>
    )
}

export default CounterFieldHeader