import React, {useEffect} from "react";

function CounterFieldInput({setTextArea, textArea, setCountedWords, setWordsAmount, countedWords}) {
    useEffect(() => {
        setCountedWords(countWords());
    }, [textArea]);

    useEffect(() => {
        setWordsAmount(estimateWords());
    }, [countedWords]);

    /**
     * Count words from string. Returns object where key is a word and value is number of entries of this word.
     * @returns {{[p: string]: unknown}}
     */
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

    function estimateWords() {
        let wordsAmount = 0;
        for (let entries of Object.values(countedWords)) {
            wordsAmount += entries;
        }
        return wordsAmount;
    }

    function handleChange(e) {
        setTextArea(e.target.value);
    }

    return (
        <textarea className='counter-field__input' value={textArea} onChange={handleChange} />
    )
}

export default CounterFieldInput