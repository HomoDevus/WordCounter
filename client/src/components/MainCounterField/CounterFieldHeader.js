import React from 'react';

function CounterFieldHeader({ wordsAmount, charactersAmount }) {

  return (
    <div className="counter-field__header">
      <h3 className="counter-field__heading">Words: {wordsAmount}</h3>
      <h3 className="counter-field__heading">Characters: {charactersAmount}</h3>
    </div>
  )
}

export default CounterFieldHeader