import { render, screen } from '@testing-library/react'
import HelloWorldComponent from './HelloWorldComponent'

describe('HelloWorld', () => {
  it('renders heading', () => {
    render(<HelloWorldComponent />)

    const heading = screen.getByRole('heading', {
      name: /Hello, World/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
