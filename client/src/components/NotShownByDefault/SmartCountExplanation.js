import React from "react";
import cancelIcon from '../../img/cancel.svg';

function SmartCountExplanation({setSmartCountPopUp}) {
    return (
        <div className='smart-count-explanation__outer' onClick={() => setSmartCountPopUp(false)}>
            <img
                className='smart-count-explanation__close'
                src={cancelIcon}
                alt='close sign'
                onClick={() => setSmartCountPopUp(false)}
            />
            <div className='smart-count-explanation__inner noselect'>
                <h3>How does it work?</h3>
                <p>The app will count word's different forms as it's infinitive.
                    So that word went will be counted as go.</p>
            </div>
        </div>
    )
}

export default SmartCountExplanation;