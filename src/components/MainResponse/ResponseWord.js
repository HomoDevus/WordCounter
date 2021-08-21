import React from "react";

function ResponseWord({word, entries, precent}) {
    return (
        <div className='response__item'>
            <div className='response__word'><span className='elementary'>{word}</span></div>
            <div className='response__entries'>{entries}</div>
            <div className='response__percent'>{precent}%</div>
        </div>
    )
}

export default ResponseWord