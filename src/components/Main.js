import React, {useState} from "react";
import CounterField from './MainCounterField/CounterField';
import Response from "./MainResponse/Response";
import '../componentsStyles/Main.css';

function Main() {
    const [textArea, setTextArea] = useState('');
    const [countedWords, setCountedWords] = useState({});

    return (
        <main className='content-container'>
            <CounterField
                textArea={textArea}
                setTextArea={setTextArea}
                countedWords={countedWords}
                setCountedWords={setCountedWords}
            />
            <Response countedWords={countedWords}/>
        </main>
    )
}

export default Main