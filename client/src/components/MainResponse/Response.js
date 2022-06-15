import React, {useEffect, useState} from "react";
import ResponseWord from "./ResponseWord";
import '../../componentsStyles/Response.css';

function Response({countedWords, wordsAmount}) {
    const [wordElements, setWordElements] = useState([]);

    useEffect(() => {
        let wordsUpdate = [];
        let i = 0;
        for (let [word, entries] of Object.entries(countedWords)) {
            wordsUpdate.push(
                <ResponseWord
                    key={i}
                    word={word}
                    entries={entries}
                    precent={(entries / wordsAmount * 100).toFixed(2)}
                />
            )
            i += 1;
        }
        setWordElements(wordsUpdate)
    }, [wordsAmount, countedWords])

    return (
        <div className='response'>
            <div className='response__header'>
                <div className='response__header_elementary'>Elementary</div>
                <div className='response__header_intermediate'>Intermediate</div>
                <div className='response__header_advance'>Advance</div>
            </div>
            <hr className='response__header-separator'/>
            <div className='response__word-list'>
                {wordElements}
            </div>
            <hr />
        </div>
    )
}

export default Response