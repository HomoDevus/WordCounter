import React, {useState} from "react";
import CounterFieldHeader from "./CounterFieldHeader";
import CounterFieldInput from "./CounterFieldInput";

function CounterField({textArea, setTextArea, countedWords, setCountedWords, wordsAmount, setWordsAmount}) {

    return (
        <div className='counter-field'>
            <CounterFieldHeader
                textArea={textArea}
                wordsAmount={wordsAmount}
            />
            <hr />
            <CounterFieldInput
                textArea={textArea}
                setTextArea={setTextArea}
                setCountedWords={setCountedWords}
                setWordsAmount={setWordsAmount}
                countedWords={countedWords}
            />
            <hr className='last-hr'/>
            <div className='counter-field__footer'>
                <button>Count</button>
            </div>
        </div>
    )
}

export default CounterField