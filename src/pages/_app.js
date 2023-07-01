import { AuthProvider, CartProvider } from '@/contexts'
import 'semantic-ui-css/semantic.min.css'
import '@/scss/global.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function App(props) {
  const { Component, pageProps } = props
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  )
}
