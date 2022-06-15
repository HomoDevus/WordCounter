import {screen, render} from "@testing-library/react";
import ResponseWord from "../ResponseWord";

function renderComponent() {
  render(<ResponseWord
    word={'Test'}
    entries={32}
    precent={33}
  />)
}

describe('ResponseWord component test', () => {
  beforeEach(() => {
    renderComponent()
  })

  it('shows word correctly', () => {
    const wordDiv = screen.getByText('Test')

    expect(wordDiv).toBeInTheDocument()
  })

  it('shows entries amount correctly', () => {
    const entriesDiv = screen.getByText('32')

    expect(entriesDiv).toBeInTheDocument()
  })

  it('shows percent correctly', () => {
    const percentDiv = screen.getByText('33%')

    expect(percentDiv).toBeInTheDocument()
  })
})