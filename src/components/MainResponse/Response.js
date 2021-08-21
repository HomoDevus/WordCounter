import React, {useEffect, useState} from "react";
import ResponseWord from "./ResponseWord";
import '../../componentsStyles/Response.css';

function Response({countedWords, wordsAmount}) {
    const [wordElements, setWordElements] = useState([]);

    useEffect(() => {
        let wordsUpdate = [];
        let i = 0;
        for (let [word, entries] of Object.entries(countedWords)) {
            console.log(entries, wordsAmount)
            console.log(entries / wordsAmount)
            wordsUpdate.push(
                <ResponseWord key={i} word={word} entries={entries} precent={(entries / wordsAmount * 100).toFixed(1)}/>
            )
            i += 1;
        }
        setWordElements(wordsUpdate)
    }, [wordsAmount])

    return (
        <div className='response'>
            <div className='response__header'>
                <div className='response__header_elementary'>Elementary</div>
                <div className='response__header_intermediate'>Intermediate</div>
                <div className='response__header_advance'>Advance</div>
            </div>
            <hr />
            <div className='response__word-list'>
                {wordElements}
            </div>
        </div>
    )
}

export default Response