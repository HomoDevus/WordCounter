import React, {useEffect, useState} from "react";
import DragAndDrop from "../DragAndDrop";
import axios from "axios";
import {toast} from "react-toastify";

function CounterFieldInput({
   setTextArea,
   textArea,
   setCountedWords,
   setWordsAmount,
   countedWords,
   liveCount,
   setCharactersAmount,
   updateResponse,
   setUpdateResponse
}) {

    useEffect(() => {
        if (liveCount) {
            setCountedWords(sortByEntries(countWordsEntries()));
            setCharactersAmount(textArea.length);
        } else if (updateResponse) {
            setCountedWords(sortByEntries(updateResponse));
            setCharactersAmount(textArea.length);
        }
    }, [textArea, liveCount, updateResponse]);

    useEffect(() => {
        if (liveCount || updateResponse) {
            setWordsAmount(estimateWords());
            setUpdateResponse(false);
        }
    }, [countedWords]);

    function estimateWords() {
        let wordsAmount = 0;
        for (let entries of Object.values(countedWords)) {
            wordsAmount += entries;
        }
        return wordsAmount;
    }

    function sortByEntries(countedWords) {
        return Object.fromEntries(
            Object.entries(countedWords).sort(([, a], [, b]) => b - a)
        );
    }

    /**
     * Count words from string. Returns object where key is a word and value is number of entries of this word.
     * @returns {{[p: string]: unknown}}
     */
    function countWordsEntries() {
        let clearTxt = textArea.replace(/[.,#!$%^&*;:{}=\-_`~()1234567890]/g, "").replace(/\s{2,}/g, " ").split(' ');
        clearTxt = clearTxt.filter((word) => word !== ' ' && word !== '');
        let count = {};
        for (let word of clearTxt) {
            word in count ? count[word] += 1 : count[word] = 1;
        }
        return count;
    }

    function handleChange(e) {
        setTextArea(e.target.value);
    }

    function handleFileDrop(file) {
        if (file.length !== 1) {return alert('Please choose only one file')}
        file = file[0];
        if (file.size > 5242880) {return alert('File size should be less than 5MB')}
        if (file.type !== 'application/epub+zip') {return  alert('Unsupported extension. Upload .epub file')}

        // Turn epub to text and put it inside textarea
        const data = new FormData()
        data.append('file', file)

        axios.post("/epub", data)
            .then(res => { // then print response status
                setTextArea(res.data)
                toast.success('upload success')
            })
            .catch(e => console.log)
    }

    return (
        <DragAndDrop callback={handleFileDrop}>
            <textarea className='counter-field__input' value={textArea} onChange={handleChange} />
        </DragAndDrop>
    )
}

export default CounterFieldInput


