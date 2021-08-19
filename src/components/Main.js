import React, {useEffect, useState} from "react";
import CounterField from './MainCounterField/CounterField';
import Response from "./MainResponse/Response";
import '../componentsStyles/Main.css';

function Main() {
    const [textArea, setTextArea] = useState('');

    return (
        <main className='content-container'>
            <CounterField textArea={textArea} setTextArea={setTextArea}/>
            <Response />
        </main>
    )
}

export default Main