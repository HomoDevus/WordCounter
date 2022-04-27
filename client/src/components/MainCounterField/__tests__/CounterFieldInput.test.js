import {render, screen} from "@testing-library/react";
import CounterFieldInput from "../CounterFieldInput";

test('input into textarea works', () => {
  render(<CounterFieldInput
    textArea={'test'}
  />)

  const textareaElement = screen.getByRole('textbox')

  expect(textareaElement).toBeInTheDocument()
  expect(textareaElement.value).toBe('test')
})