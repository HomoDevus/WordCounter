import React, {useEffect} from "react";
import CounterFieldHeader from "./CounterFieldHeader";
import CounterFieldInput from "./CounterFieldInput";
import '../../componentsStyles/smartCount.css';

function CounterField({
        textArea,
        setTextArea,
        countedWords,
        setCountedWords,
        wordsAmount,
        setWordsAmount,
        setSmartCountPopUp
    }) {

    return (
        <div className='counter-field'>
            <div className='counter-field__main'>
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
            </div>
            <hr className='last-hr'/>
            <div className='counter-field__footer'>
                <button>Smart count</button>
                <p onClick={() => {setSmartCountPopUp(true)}} className='counter-field__footer__question'>?</p>
            </div>
        </div>
    )
}

export default CounterField