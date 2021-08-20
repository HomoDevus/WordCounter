import React, {useEffect, useState} from "react";
import ResponseWord from "./ResponseWord";
import '../../componentsStyles/Response.css';

function Response({countedWords}) {
    const [wordElements, setWordElements] = useState([]);

    useEffect(() => {
        let wordsUpdate = [];
        for (let [word, entries] of Object.entries(countedWords)) {
            wordsUpdate.push(<ResponseWord word={word} entries={entries}/>)
        }
        setWordElements(wordsUpdate)
    }, [countedWords])

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