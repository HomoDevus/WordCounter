import React from "react";

function CounterFieldHeader() {
    return (
        <div className='counter-field__header'>
            <h3>Words: {'432'}</h3>
            <h3>Characters: {'432'}</h3>
            <label>
                <input type='checkbox'/>
                <h3>Smart count</h3>
            </label>
        </div>
    )
}

export default CounterFieldHeader