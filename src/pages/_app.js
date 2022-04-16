import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import Header from '@/common/components/Header'
import Footer from '@/common/components/Footer'
import { Main } from '@/common/components/Layout'
import '@/styles/globals.css'
import '@/styles/grid.css'

// Fix Font Awesome icons initially flashing wrong size
config.autoAddCss = false

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Main>
        <Component {...pageProps} />
      </Main>
      <Footer />
    </>
  )
}

export default MyApp
