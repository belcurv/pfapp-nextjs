import Header from '@/common/components/header'
import '@/styles/globals.css'
import '@/styles/grid.css'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
