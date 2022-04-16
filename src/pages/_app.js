import Header from '@/common/components/Header'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@/styles/globals.css'
import '@/styles/grid.css'

// Fix Font Awesome icons initially flashing wrong size
config.autoAddCss = false

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
