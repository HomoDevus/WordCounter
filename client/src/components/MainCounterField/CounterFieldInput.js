import React, {useEffect, useState} from "react";
import DragAndDrop from "../DragAndDrop";
import axios from "axios";
import {toast} from "react-toastify";
import CounterField from '../../componentsStyles/CounterField.css';

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

    // Counter words and characters amount live update
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

    // Sort words in order to show them in response from most often to least often
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

    // Accept file on file drop or upload from input. Check for file length, siz and type.
    // Sends request to backend in order to translate .epub to string. String passed to textArea state.
    function handleFileDrop(file) {
        console.log(file)
        console.log(file.dataTransfer)
        if (file.target !== undefined) {file = file.target}
        console.log(file)
        if (file.length !== 1) {return alert('Please choose only one file')}
        file = file[0];
        if (file.size > 5242880) {return alert('File size should be less than 5MB')}
        if (file.type !== 'application/epub+zip') {return  alert('Unsupported extension. Upload .epub file')}

        // Apply upload styles

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

    // File upload on button click. Uses button to trigger hidden input
    function fileUpload() {
        document.getElementById('file-upload').click();
    }


    return (
        <DragAndDrop callback={handleFileDrop}>
            <div className='text-area__settings'>
                <p className='text-area__settings__format-heading'>Accepted formats:
                    <span className='text-area__settings__format'>.epub</span>
                </p>
                <button className='text-area__upload' onClick={fileUpload} >
                    <input type='file' id="file-upload" onChange={handleFileDrop} hidden />
                    <img alt='upload .epub' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA
                    7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAu0lEQVRIie3WTQrCMBCG4VfxMC7qyi51b/HanqQpQnOJukkgBqHTJING8
                    kE27UyfKf0h0PLF3IEJWAotAwwS2BRE/RpjZPcBXiTTJeTN2ishq6kOtkDvli01zNqLYoFTUH8EnoK+LDhGt+DJ8Ax
                    0rqYL6sNjswZ8jgCfcKBeA764C/u7Cutnd+4qhXN+IL53az1Q4Xfc4AbXBU8KjpEUDci2Pz6Sbc+tyPgRmJSfesb/D
                    R8yeh/obYX18gKyd5bz2JKZ4QAAAABJRU5ErkJggg==" />
                </button>
            </div>
            <textarea className='counter-field__input' value={textArea} onChange={handleChange} />
        </DragAndDrop>
    )
}

export default CounterFieldInput


