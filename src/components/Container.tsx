import React from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import Header from 'components/Header'

interface IProps {
  children: React.ReactNode
  title?: string
  description?: string
  image?: string
  type?: string
  url?: string
}

export default function Container(props: IProps): JSX.Element {
  const { children, ...customMeta } = props
  const router = useRouter()

  // DEFALUT
  const meta = {
    title: 'Leo Hirano – Junior FX TD',
    description: `test`,
    image: '',
    type: 'website',
    ...customMeta,
  }

  return (
    <div className="container">
      <Head>
        <title>{meta.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://leohirano.com${router.asPath}`}
        />
        <link rel="canonical" href={`https://leohirano.com${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Leo Hirano" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_leohirano" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <Header />
      <motion.main
        className="font-roboto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.2 }}
      >
        {children}
      </motion.main>
      {/* TODO: FOOTER */}
    </div>
  )
}
