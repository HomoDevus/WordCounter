import React from "react";

function CounterFieldHeader({countedWords, textArea}) {
    function estimateWords() {
        let wordsAmount = 0;
        for (let entries of Object.values(countedWords)) {
            wordsAmount += entries;
        }
        return wordsAmount;
    }

    return (
        <div className='counter-field__header'>
            <h3 className='counter-field__heading'>Words: {estimateWords()}</h3>
            <h3 className='counter-field__heading'>Characters: {textArea.length}</h3>
            <label>
                <input type='checkbox'/>
                <h3 className='counter-field__heading'>Smart count</h3>
            </label>
        </div>
    )
}

export default CounterFieldHeader