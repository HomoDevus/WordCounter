import React from "react";
import CounterField from './CounterField';
import Response from "./Response";
import PageBackground from "./PageBackground";
import '../componentsStyles/Main.css';

function Main() {
    return (
        <main className='content-container'>
            <PageBackground />
            <CounterField />
            <Response />
        </main>
    )
}

export default Main