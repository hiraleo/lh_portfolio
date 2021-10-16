import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
// import mdxPrism from 'mdx-prism';

const root = process.cwd()

export function getAllPostSlugs(type: string) {
  const fileNames = fs.readdirSync(path.join(root, 'data', type))
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, ''),
      },
    }
  })
}

export async function getFileBySlug(type: string, slug: string) {
  const source = fs.readFileSync(
    path.join(root, 'data', type, `${slug}.mdx`),
    'utf-8'
  )

  const { data, content } = matter(source)

  const mdxSource = await serialize(content)

  return {
    mdxSource,
    frontMatter: {
      slug: slug || null,
      ...data,
    },
  }
}

export async function getAllFilesFrontMatter(type: string) {
  const fileNames = fs.readdirSync(path.join(root, 'data', type))

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')

    const fileContents = fs.readFileSync(
      path.join(root, 'data', type, fileName),
      'utf-8'
    )

    const { data } = matter(fileContents)

    // console.log(data);

    return {
      slug,
      ...data,
    }
  }, [])
}
