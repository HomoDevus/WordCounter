import React from "react";

function CounterFieldHeader() {
    return (
        <div className='counter-field__header'>
            <h3 className='counter-field__heading'>Words: {'432'}</h3>
            <h3 className='counter-field__heading'>Characters: {'432'}</h3>
            <label>
                <input type='checkbox'/>
                <h3 className='counter-field__heading'>Smart count</h3>
            </label>
        </div>
    )
}

export default CounterFieldHeader