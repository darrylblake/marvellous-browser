import React from 'react'
import CreatorsTile from './CreatorsTile.jsx'
import pathOr from 'ramda/src/pathOr'
import './Creators.pcss'
import { connect } from 'react-redux'
import { loadCreators } from '../actions'
import compose from 'ramda/src/compose'
import pick from 'ramda/src/pick'
import { Helmet } from 'react-helmet'

const getCreatorsList = pathOr([], ['creators', 'list'])
const getCreatorsData = pathOr({}, ['creators', 'data'])
const viewingCreatorId = pathOr(false, ['params', 'id'])

export const getCreatorsQueryOptions = compose(pick([
  'orderBy',
  'start',
  'limit',
  'nameStartsWith'
]), pathOr({}, ['creators']))

class CreatorsRenderer extends React.Component {

  componentDidMount () {
    this.props.dispatch(loadCreators(getCreatorsQueryOptions(this.props)))
  }

  renderCreators() {
    const creatorsList = getCreatorsList(this.props)
    const creatorsData = getCreatorsData(this.props);

    return creatorsList.map((creatorId) => {
      const creator = creatorsData[creatorId];
      return <CreatorsTile key={creator.id} creator={creator}/>
    })
  }

  render () {
    if (viewingCreatorId(this.props)) {
      return this.props.children
    }

    return (
      <div className="creators">
        <Helmet>
          <title>Creators | Marvellous</title>
        </Helmet>
        {this.renderCreators()}
      </div>
    )
  }
}

export default connect((state) => {
  return {
    creators: state.creators
  }
})(CreatorsRenderer)
