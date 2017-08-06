import React from 'react'
import Comics from '../components/Comics.jsx'
import pathOr from 'ramda/src/pathOr'
import { connect } from 'react-redux'
import { loadComics } from '../actions'
import compose from 'ramda/src/compose'
import pick from 'ramda/src/pick'
import { Helmet } from 'react-helmet'

const getComics = pathOr([], ['comics', 'data'])
const viewingComicId = pathOr(false, ['params', 'id'])

export const getComicsQueryOptions = compose(pick([
  'orderBy',
  'start',
  'limit',
  'titleStartsWith',
  'characterIds'
]), pathOr({}, ['comics']))

class ComicsRenderer extends React.Component {

  componentDidMount () {
    this.props.dispatch(loadComics(getComicsQueryOptions(this.props)))
  }

  render () {
    if (viewingComicId(this.props)) {
      return this.props.children
    }

    const comics = getComics(this.props)
    return (
      <div>
        <Helmet>
          <title>Comics | Marvellous</title>
        </Helmet>
        <Comics comics={comics} />
      </div>
    )
  }
}

export default connect((state) => {
  return {
    comics: state.comics
  }
})(ComicsRenderer)
