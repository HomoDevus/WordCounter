import React from "react";

function CounterFieldHeader({textArea, wordsAmount}) {

    return (
        <div className='counter-field__header'>
            <h3 className='counter-field__heading'>Words: {wordsAmount}</h3>
            <h3 className='counter-field__heading'>Characters: {textArea.length}</h3>
        </div>
    )
}

export default CounterFieldHeader