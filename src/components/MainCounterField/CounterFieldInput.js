import React, {useEffect} from "react";
import DragAndDrop from "../DragAndDrop";
import { parseEpub } from '@gxl/epub-parser';

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

    function handleFileUpload(file) {
        if (file.length !== 1) {return alert('Please choose only one file')}
        file = file[0];
        if (file.size > 5242880) {return alert('File size should be less than 5MB')}
        console.log(file)
        console.log(URL.createObjectURL(file))
        readFileContent(file).then(content => {
            console.log(content)
        }).catch(error => console.log(error))
        // const epubObj = parseEpub('../../Books/avidreaders.ru__the-veldt.epub', {
        //     type: 'path',
        // })
        // console.log(epubObj)
    }

    function readFileContent(file) {
        const reader = new FileReader()
        return new Promise((resolve, reject) => {
            reader.onload = event => resolve(event.target.result)
            reader.onerror = error => reject(error)
            reader.readAsText(file)
        })
    }

    return (
        <DragAndDrop callback={handleFileUpload}>
            <textarea className='counter-field__input' value={textArea} onChange={handleChange} />
        </DragAndDrop>
    )
}

export default CounterFieldInput