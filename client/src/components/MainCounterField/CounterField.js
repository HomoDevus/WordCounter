import React, { useRef, useState } from 'react';
import CounterFieldHeader from './CounterFieldHeader';
import CounterFieldInput from './CounterFieldInput';
import '../../componentsStyles/SmartCountExplanation.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CounterField({
  textArea,
  setTextArea,
  countedWords,
  setCountedWords,
  wordsAmount,
  setWordsAmount,
  setSmartCountPopUp
}) {
  const [charactersAmount, setCharactersAmount] = useState(textArea.length);
  const [updateResponse, setUpdateResponse] = useState(false);
  const notification = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="counter-field">
      <div className="form-group">
        <ToastContainer useRef={notification} />
      </div>
      <div className="counter-field__main">
        <CounterFieldHeader
          wordsAmount={wordsAmount}
          charactersAmount={charactersAmount}
        />
        <hr />
        <CounterFieldInput
          textArea={textArea}
          setTextArea={setTextArea}
          setCountedWords={setCountedWords}
          setWordsAmount={setWordsAmount}
          countedWords={countedWords}
          setCharactersAmount={setCharactersAmount}
          updateResponse={updateResponse}
          setUpdateResponse={setUpdateResponse}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
      <hr className="last-hr" />
      <div className="counter-field__footer">
        <button
          onClick={() => {
            setSmartCountPopUp(true)
          }}
          className="counter-field__footer__question noselect"
        >
          How does it count words?
        </button>
      </div>
    </div>
  )
}

export default CounterField