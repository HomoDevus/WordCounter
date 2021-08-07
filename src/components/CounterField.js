import React from "react";
import CounterFieldHeader from "./CounterFieldHeader";
import CounterFieldInput from "./CounterFieldInput";
import CounterFieldFooter from "./CounterFieldFooter";

function CounterField() {
    return (
        <div className='counter-field'>
            <CounterFieldHeader />
            <hr />
            <CounterFieldInput />
            <hr />
            <CounterFieldFooter />
        </div>
    )
}

export default CounterField