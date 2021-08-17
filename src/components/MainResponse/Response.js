import React from "react";
import ResponseWord from "./ResponseWord";
import '../../componentsStyles/Response.css';

function Response() {
    return (
        <div className='response'>
            <div className='response__header'>
                <div className='response__header_elementary'>Elementary</div>
                <div className='response__header_intermediate'>Intermediate</div>
                <div className='response__header_advance'>Advance</div>
            </div>
            <hr />
            <ResponseWord />
            <ResponseWord />
            <ResponseWord />
            <ResponseWord />
        </div>
    )
}

export default Response