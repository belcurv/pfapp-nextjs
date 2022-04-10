import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

describe('The Home page component', () => {
  it('should have exactly 1 main section', () => {
    render(<Home />)
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })
})
