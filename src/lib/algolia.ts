import { liteClient } from 'algoliasearch/lite'

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY

export const searchClient =
  appId && searchKey ? liteClient(appId, searchKey) : null

export const algoliaIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX ?? 'guide'
