/* eslint-disable @typescript-eslint/no-explicit-any */
// import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote'

import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import Image from 'next/image'

import { getAllPostSlugs, getFileBySlug } from 'utils/mdx'
// import MDXComponents from '../components/MDXComponents';

import Container from '../../components/Container'

import moment from 'moment'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const components = { Image }

export default function Work({ frontMatter, mdxSource }: Props) {
  return (
    <Container
      title={`${frontMatter.title} – Leo Hirano`}
      description={''}
      image={''}
      type={'article'}
    >
      <main className="max-w-[960px] mx-auto">
        <div className="mb-10">
          <p>{moment(frontMatter.date).format('MMM - YYYY')}</p>
          <h1 className="text-3xl font-bold">{frontMatter.title}</h1>
          <p className="mt-10">{frontMatter.describe}</p>
          <hr className="mt-1" />
        </div>

        <MDXRemote {...mdxSource} components={components}></MDXRemote>
      </main>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPostSlugs('work')
  return {
    paths: posts,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const postData = await getFileBySlug('work', params.slug)
  return {
    props: {
      ...postData,
    },
  }
}
