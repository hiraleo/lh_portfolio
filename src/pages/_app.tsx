import 'styles/globals.scss'
import 'styles/work.scss'
import 'styles/header.scss'

import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} />;
    </AnimatePresence>
  )
}
export default MyApp
