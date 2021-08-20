import React from "react";
import CounterFieldHeader from "./CounterFieldHeader";
import CounterFieldInput from "./CounterFieldInput";

function CounterField({textArea, setTextArea, countedWords, setCountedWords}) {
    return (
        <div className='counter-field'>
            <CounterFieldHeader countedWords={countedWords} textArea={textArea}/>
            <hr />
            <CounterFieldInput textArea={textArea} setTextArea={setTextArea} setCountedWords={setCountedWords}/>
            <hr className='last-hr'/>
            <div className='counter-field__footer'>
                <button>Count</button>
            </div>
        </div>
    )
}

export default CounterField