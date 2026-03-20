import { algoliasearch } from 'algoliasearch'
import { sync } from 'fumadocs-core/search/algolia'
import { readFileSync, readdirSync } from 'fs'
import { resolve, relative, join } from 'path'

function parseFrontmatter(src) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(src)
  if (!m) return {}
  return Object.fromEntries(
    m[1].split(/\r?\n/).flatMap(line => {
      const i = line.indexOf(':')
      if (i === -1) return []
      return [[line.slice(0, i).trim(), line.slice(i + 1).trim().replace(/^["']|["']$/g, '')]]
    })
  )
}

function* walkMdx(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walkMdx(full)
    else if (/\.mdx?$/.test(entry.name)) yield full
  }
}

const contentDir = resolve('content')
const documents = []

for (const file of walkMdx(contentDir)) {
  const src = readFileSync(file, 'utf-8')
  const fm = parseFrontmatter(src)
  const rel = relative(contentDir, file).replace(/\\/g, '/').replace(/\.mdx?$/, '')
  const parts = rel.split('/')
  if (parts.at(-1) === 'index') parts.pop()
  const url = '/' + parts.join('/')

  documents.push({
    _id: url,
    url,
    title: fm.title ?? url,
    description: fm.description,
    structured: {
      headings: [],
      contents: [{ heading: undefined, content: fm.description ?? '' }],
    },
  })
}

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_WRITE_API_KEY
)

await sync(client, {
  document: process.env.NEXT_PUBLIC_ALGOLIA_INDEX ?? 'guide',
  documents,
})

console.log(`Synced ${documents.length} docs to Algolia`)
