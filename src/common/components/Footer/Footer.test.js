import { render } from '@testing-library/react'
import Footer from './Footer'

describe('<Footer />', () => {
  function renderFooter (props) {
    const result = render(
      <Footer {...props} />
    )

    const FooterEl = () => result.getByTestId('footer')
    const LinkWithText = (text) => result.getByText(text)

    return {
      FooterEl,
      LinkWithText,
      debug: result.debug
    }
  }

  it('Should render', () => {
    const {
      FooterEl,
      LinkWithText
    } = renderFooter()

    expect(FooterEl()).toBeInTheDocument()
    expect(LinkWithText(/^belcurv$/i)).toBeInTheDocument()
    expect(LinkWithText(/^MIT license$/i)).toBeInTheDocument()
    expect(LinkWithText(/CC/i)).toBeInTheDocument()
  })
})
