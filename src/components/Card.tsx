import React from 'react'
import Link from 'next/link'

import dynamic from 'next/dynamic'
import moment from 'moment'
// import { motion } from 'framer-motion';

const ImageDisp = dynamic(() => import('../components/Three'), {
  ssr: false,
})

interface IProps {
  allPostsData: {
    slug: string
    date: string
    title: string
    client: string
    description: string
    image: string
  }[]
}

export default function Card({ allPostsData }: IProps): JSX.Element {
  const fliteredPosts = allPostsData.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  )

  return (
    <div className="card_container">
      {fliteredPosts.map(
        ({ slug, title, date, client, description, image }, index: number) => (
          <div key={index} className="cards">
            <Link href={`/work/${slug}`} passHref>
              <div className="card">
                <div className="card__content card__line">
                  <div className="dot">
                    <p className="card__date">
                      {moment(date).format('MMM - YYYY')}
                    </p>
                    <p className="card__title">{title}</p>
                    <p className="card__client">{client}</p>
                    <p className="card__description">{description}</p>
                  </div>
                </div>

                {String(image).length > 0 && (
                  <ImageDisp
                    url1={image}
                    url2={image}
                    dispUrl={image}
                    scale={0.2}
                  />
                )}
              </div>
            </Link>
          </div>
        )
      )}
    </div>
  )
}
