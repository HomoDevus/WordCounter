import React, {useEffect} from "react";

function CounterFieldInput({setTextArea, textArea, setCountedWords}) {
    useEffect(() => {setCountedWords(countWords())}, [textArea]);

    function countWords() {
        let clearTA = textArea.replace(/[.,#!$%^&*;:{}=\-_`~()1234567890]/g,"").replace(/\s{2,}/g," ").split(' ');
        clearTA = clearTA.filter((word) => word !== ' ' && word !== '');
        let count = {};
        for (let word of clearTA) {
            word in count ? count[word] += 1: count[word] = 1;
        }
        // Object sort
        count = Object.fromEntries(
            Object.entries(count).sort(([,a],[,b]) => b-a)
        );
        return count;
    }

    function handleChange(e) {
        setTextArea(e.target.value);
        setCountedWords(countWords());
    }

    return (
        <textarea className='counter-field__input' value={textArea} onChange={handleChange} />
    )
}

export default CounterFieldInput