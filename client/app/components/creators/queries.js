import {gql} from 'react-apollo'

export const CREATORS_QUERY = gql`query (
    $start: Int,
    $limit: Int,
    $orderBy: String,
    $nameStartsWith: String
  ) {
    creators(
      start: $start,
      limit: $limit,
      orderBy: $orderBy,
      nameStartsWith: $nameStartsWith
    ) {
      id
      fullName
      suffix
      thumbnail
      hasImages
    }
  }
`

export const CREATORS_DETAILS_QUERY = gql`query (
    $id: Int!
  ) {
    creator(id: $id) {
      id
      fullName
      suffix
      thumbnail
      hasImages
      comicsTotal
      comics {
        id,
        thumbnail,
        hasImages
      }
    }
  }
`