import {fireEvent, render, screen} from "@testing-library/react";
import CounterField from "../CounterField";

function componentRender() {
  render(<CounterField
    textArea={''}
    setTextArea={() => {}}
    countedWords={{}}
    setCountedWords={() => {}}
    wordsAmount={0}
    setWordsAmount={() => {}}
    setSmartCountPopUp={() => {}}
  />)
}

describe('CiunterField testing', () => {
  test('question mark click opens a modal', () => {
    componentRender()

    expect(screen.getByText('?')).toBeEnabled()
  })

  test('liveCount toggle', () => {
    componentRender()

    const liveCountCheckbox = screen.getByRole('checkbox')

    expect(liveCountCheckbox).toBeChecked()
    fireEvent.click(liveCountCheckbox)
    expect(liveCountCheckbox).not.toBeChecked()
    fireEvent.click(liveCountCheckbox)
    expect(liveCountCheckbox).toBeChecked()
  })
})
