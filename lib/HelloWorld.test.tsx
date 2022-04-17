import { render, screen } from '@testing-library/react'
import HelloWorld from './HelloWorld'

describe('HelloWorld', () => {
  it('renders heading', () => {
    render(<HelloWorld />)

    const heading = screen.getByRole('heading', {
      name: /Hello, World/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
