import { useRouter } from 'next/router'
import { render } from '@testing-library/react'
import ActiveLink from './ActiveLink'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('<ActiveLink />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  function renderActiveLink (props) {
    const result = render(
      <ActiveLink {...props} />
    )

    const Link = () => result.getByRole('link')

    return {
      Link,
      debug: result.debug
    }
  }

  it('should render an anchor with correct attributes', () => {
    useRouter.mockReturnValue({ pathname: '/' })
    const href = '/whatever'
    const children = 'Anything'
    const { Link } = renderActiveLink({ href, children })

    expect(Link()).toBeInTheDocument()
    expect(Link()).toHaveAttribute('href', href)
    expect(Link()).toHaveTextContent(children)
  })

  it('should render an anchor with active CSS class when pathname matches href', () => {
    const href = '/'
    useRouter.mockReturnValue({ pathname: href })
    const { Link } = renderActiveLink({ href, children: 'Anything' })

    expect(Link()).toBeInTheDocument()
    expect(Link()).toHaveClass('link-active')
  })
})
