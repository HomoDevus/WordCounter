import React, {useEffect, useRef, useState} from "react";
import CounterFieldHeader from "./CounterFieldHeader";
import CounterFieldInput from "./CounterFieldInput";
import '../../componentsStyles/SmartCountExplanation.css';
import Book from "../../functions/sendRequest";
import axios from 'axios';
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
    const [selectedFile, setSelectedFile] = useState({file: null, loaded: null})
    const notification = useRef(null);

    useEffect(() => {
        if (!liveCount) {
            setWordsAmount('-');
            setCountedWords({});
            setCharactersAmount('-');
        }
    }, [liveCount])

    function smartCountStart() {
        if (selectedFile.file == null) {
            if (textArea) {
                setLiveCount(false);
                let request = new Book(textArea);
                request.getLemmas()
                    .then((ans) => {
                        setUpdateResponse(ans);
                    }).catch(e => {
                    console.error(e)
                })
            }
        } else {
            const data = new FormData()
            data.append('file', selectedFile.file)
            axios.post("http://localhost:8000/upload", data, {
                onUploadProgress: ProgressEvent => {
                    setSelectedFile(
                        prevState => {
                            prevState.loaded = (ProgressEvent.loaded / ProgressEvent.total * 100)
                            return prevState
                        }
                    )
                }
            })
                .then(res => { // then print response status
                    console.log(res.statusText)
                    toast.success('upload success')
                })
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
                    setSelectedFile={setSelectedFile}
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