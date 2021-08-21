import React from "react";
import cancelIcon from '../img/cancel.svg';

function SmartCountExplanation({setSmartCountPopUp}) {
    return (
        <div className='smart-count-explanation__outer' onClick={() => setSmartCountPopUp(false)}>
            <img
                className='smart-count-explanation__close'
                src={cancelIcon}
                alt='close sign'
                onClick={() => setSmartCountPopUp(false)}
            />
            <div className='smart-count-explanation__inner'>
                <h3>What is Smart Count?</h3>
                <p>Smart Count option will count word's different forms as it's infinitive.
                    So that word went will be counted as go.</p>
            </div>
        </div>
    )
}

export default SmartCountExplanation;