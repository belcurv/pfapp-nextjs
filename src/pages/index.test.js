import Home from '@/pages/index'
import { render } from '@testing-library/react'

function renderIndex (props) {
  const result = render(<Home {...props} />)

  const Main = () => result.getByRole('main')

  return {
    Main,
    debug: result.debug
  }
}

describe('The Home page component', () => {
  it('should have exactly 1 main section', () => {
    const {
      Main
    } = renderIndex({})

    expect(Main()).toBeInTheDocument()
  })
})
