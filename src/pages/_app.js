import Header from '@/common/components/Header'
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
