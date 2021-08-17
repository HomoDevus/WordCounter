import React from "react";

function ResponseWord() {
    return (
        <div className='response__item'>
            <div className='response__word'><span className='elementary'>word</span></div>
            <div className='response__entries'>42</div>
            <div className='response__percent'>2%</div>
        </div>
    )
}

export default ResponseWord