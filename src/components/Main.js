import React from "react";
import CounterField from './CounterField';
import Response from "./Response";
import '../componentsStyles/Main.css';

function Main() {
    return (
        <main className='content-container'>
            <CounterField />
            <Response />
        </main>
    )
}

export default Main