import {screen, render} from "@testing-library/react";
import Response from "../Response";
import {COUNTED_WORDS} from "../../../../dataForTests";

function estimateWords(countedWords) {
  let wordsAmount = 0;
  for (let entries of Object.values(countedWords)) {
    wordsAmount += entries;
  }
  return wordsAmount;
}

function componentRender() {
  render(<Response
    countedWords={COUNTED_WORDS}
    wordsAmount={estimateWords(COUNTED_WORDS)}
  />)
}

describe('Response component', () => {
  it('getting correct amount of word elements', () => {
    componentRender()

    const wordElements = screen.getAllByTestId('response-word')

    expect(wordElements.length).toBe(Object.keys(COUNTED_WORDS).length)
  })
})