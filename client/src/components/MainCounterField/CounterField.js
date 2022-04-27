import React, {useEffect, useRef, useState} from "react";
import CounterFieldHeader from "./CounterFieldHeader";
import CounterFieldInput from "./CounterFieldInput";
import '../../componentsStyles/SmartCountExplanation.css';
import Book from "../../functions/sendRequest";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const notification = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!liveCount) {
            setWordsAmount('-');
            setCountedWords({});
            setCharactersAmount('-');
        }
    }, [liveCount])

    function smartCountStart() {
        if (textArea) {
            setIsLoading(true)
            setLiveCount(false);
            let request = new Book(textArea);
            request.getLemmas()
                .then((ans) => {
                    if (ans === undefined || ans == false) {
                        toast.error("API didn't fetched any data")
                    } else {
                        setUpdateResponse(ans);
                        toast.success('Words have been counted')
                    }
                }).catch(e => {
                    toast.error('API answered with an error')
                    console.error(e)
                }).finally(() => {setIsLoading(false)})
        }
    }

    return (
        <div className='counter-field'>
            <div className="form-group">
                <ToastContainer useRef={notification}/>
            </div>
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
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </div>
            <hr className='last-hr'/>
            <div className='counter-field__footer'>
                <button
                    className='button smart-count__button'
                    onClick={smartCountStart}
                    disabled={isLoading}
                >
                    Smart count
                </button>
                <button
                    onClick={() => {setSmartCountPopUp(true)}}
                    className='counter-field__footer__question noselect'
                >
                    ?
                </button>
            </div>
        </div>
    )
}

export default CounterField