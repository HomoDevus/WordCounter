import React from "react";
import CounterFieldHeader from "./CounterFieldHeader";
import CounterFieldInput from "./CounterFieldInput";
import CounterFieldFooter from "./CounterFieldFooter";

function CounterField({setTextArea}, {textArea}) {
    return (
        <div className='counter-field'>
            <CounterFieldHeader />
            <hr />
            <CounterFieldInput textArea={textArea} setTextArea={setTextArea} />
            <hr className='last-hr'/>
            <CounterFieldFooter />
        </div>
    )
}

export default CounterField