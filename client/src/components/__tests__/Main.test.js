import {fireEvent, render, screen} from "@testing-library/react";
import Main from "../Main";

function componentRender() {
  render(<Main
    setSmartCountPopUp={() => {}}
  />)
}

describe('testing main component', () => {
  beforeEach(() => {
    componentRender()
  })

  test('typing in textarea', () => {
    const textareaElement = screen.getByRole('textbox')
    expect(textareaElement).toBeInTheDocument()

    fireEvent.change(textareaElement, {target: {value: "Ben Mayer"}})

    console.log('TEXT AREA VALUE:', textareaElement.value)
    expect(textareaElement).toHaveValue('Ben Mayer')
  })
})