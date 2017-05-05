import DataLoader from 'dataloader'
import { marvel } from '../../marvel'
import R from 'ramda'

import { transformComic } from '../transformers/comic'

export const comicsLoader = new DataLoader(async (keySets) => {
  return Promise.all(R.map((keys) => {
    try {
      return marvel.query('comics', JSON.parse(keys))
        .then((response) => R.map(transformComic, R.propOr({}, 'data', response)))
    } catch (error) {
      console.log(error)
      throw new Error(`Failed to fetch comics with query ${JSON.stringify(keys, null, 2)}`)
    }
  }, keySets))
})
