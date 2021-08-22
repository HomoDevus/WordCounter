import React, {useEffect, useState} from "react";
import CounterFieldHeader from "./CounterFieldHeader";
import CounterFieldInput from "./CounterFieldInput";
import '../../componentsStyles/smartCount.css';
import Book from "../../functions/sendRequest";

function CounterField({
        textArea,
        setTextArea,
        countedWords,
        setCountedWords,
        wordsAmount,
        setWordsAmount,
        setSmartCountPopUp
    }) {
    const [liveCount, setLiveCount] = useState(true);
    const [charactersAmount, setCharactersAmount] = useState(textArea.length);
    const [updateResponse, setUpdateResponse] = useState(false);

    useEffect(() => {
        if (!liveCount) {
            setWordsAmount('-');
            setCountedWords({});
            setCharactersAmount('-');
        }
    }, [liveCount])

    function smartCountStart() {
        if (textArea) {
            setLiveCount(false);
            let request = new Book(textArea);
            request.getLemmas()
                .then((ans) => {
                    setUpdateResponse(ans);
                }).catch(e => {console.error(e)})
        }
    }

    return (
        <div className='counter-field'>
            <div className='counter-field__main'>
                <CounterFieldHeader
                    textArea={textArea}
                    wordsAmount={wordsAmount}
                    liveCount={liveCount}
                    setLiveCount={setLiveCount}
                    charactersAmount={charactersAmount}
                />
                <hr />
                <CounterFieldInput
                    textArea={textArea}
                    setTextArea={setTextArea}
                    setCountedWords={setCountedWords}
                    setWordsAmount={setWordsAmount}
                    countedWords={countedWords}
                    liveCount={liveCount}
                    setCharactersAmount={setCharactersAmount}
                    updateResponse={updateResponse}
                    setUpdateResponse={setUpdateResponse}
                />
            </div>
            <hr className='last-hr'/>
            <div className='counter-field__footer'>
                <button onClick={smartCountStart}>Smart count</button>
                <p onClick={() => {setSmartCountPopUp(true)}} className='counter-field__footer__question noselect'>?</p>
            </div>
        </div>
    )
}

export default CounterField