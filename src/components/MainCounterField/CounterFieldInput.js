import React from "react";

function CounterFieldInput({setTextArea}, {textArea}) {
    function handleChange(e) {
        setTextArea(e.target.value)
    }
    return (
        <textarea className='counter-field__input' value={textArea} onChange={handleChange} />
    )
}

export default CounterFieldInput