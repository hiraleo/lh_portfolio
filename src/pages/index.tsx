/* eslint-disable react/no-unescaped-entities */
import React from 'react'

import { getAllFilesFrontMatter } from 'utils/mdx'
import { GetStaticProps } from 'next'

import Container from 'components/Container'

import Card from 'components/Card'

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

export default function Home({ allPostsData }: IProps): JSX.Element {
  return (
    <Container title={'Leo Hirano - Junior FX TD'} description={''} image={''}>
      <div className="top">
        <h1 className="">Hi, I'm Leo Hirano. CG / FX Artist.</h1>
      </div>

      <Card allPostsData={allPostsData} />
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getAllFilesFrontMatter('work')

  // const works = data.map((slug) => {
  //   getFileBySlug(slug);
  // });

  // console.log(JSON.stringify(allPostsData, null, 2));

  return {
    props: { allPostsData },
  }
}
