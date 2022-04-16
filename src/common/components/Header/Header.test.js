import { render, within } from '@testing-library/react'
import Header from './Header'

// child ActiveLink component depends on next router; need basic static mock in this test
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/'
  })
}))

describe('<Header />', () => {
  function renderHeader (props) {
    const result = render(
      <Header {...props} />
    )

    const Banner = () => result.getByRole('banner')
    const Links = () => result.getAllByRole('link')
    const HomeLink = () => Links().find(link => within(link).getByText('pfapp'))
    const TextLinksContainer = () => result.getByTestId('header-nav-text')
    const IconLinksContainer = () => result.getByTestId('header-nav-icons')
    const TextLinkWithText = (text) => within(TextLinksContainer()).queryByText(text)
    const IconLinkWithTitle = (title) => within(IconLinksContainer()).queryByTitle(title)

    return {
      Banner,
      Links,
      HomeLink,
      TextLinksContainer,
      IconLinksContainer,
      TextLinkWithText,
      IconLinkWithTitle,
      debug: result.debug
    }
  }

  it('should render navigation links correctly', () => {
    const {
      Banner,
      HomeLink,
      TextLinksContainer,
      IconLinksContainer,
      TextLinkWithText,
      IconLinkWithTitle
    } = renderHeader({})

    expect(Banner()).toBeInTheDocument()
    expect(HomeLink()).toBeInTheDocument()

    expect(TextLinksContainer().children).toHaveLength(3)
    expect(TextLinkWithText('FIRE Calculator')).toBeInTheDocument()
    expect(TextLinkWithText('Commute Calculator')).toBeInTheDocument()
    expect(TextLinkWithText('Portfolio')).toBeInTheDocument()

    expect(IconLinksContainer().children).toHaveLength(3)
    expect(IconLinkWithTitle(/Financial Independence.+Calculator/i)).toBeInTheDocument()
    expect(IconLinkWithTitle(/Commuting Calculator/i)).toBeInTheDocument()
    expect(IconLinkWithTitle(/Portfolio/i)).toBeInTheDocument()
  })
})
