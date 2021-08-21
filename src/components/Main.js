import React, {useState} from "react";
import CounterField from './MainCounterField/CounterField';
import Response from "./MainResponse/Response";
import '../componentsStyles/Main.css';

function Main({setSmartCountPopUp}) {
    const [textArea, setTextArea] = useState('');
    const [countedWords, setCountedWords] = useState({});
    const [wordsAmount, setWordsAmount] = useState(0);

    return (
        <main className='content-container'>
            <CounterField
                textArea={textArea}
                setTextArea={setTextArea}
                countedWords={countedWords}
                setCountedWords={setCountedWords}
                wordsAmount={wordsAmount}
                setWordsAmount={setWordsAmount}
                setSmartCountPopUp={setSmartCountPopUp}
            />
            <Response countedWords={countedWords} wordsAmount={wordsAmount}/>
        </main>
    )
}

export default Main