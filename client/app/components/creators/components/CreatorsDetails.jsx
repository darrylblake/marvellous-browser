import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import './CreatorsDetails.pcss'

import { loadCreatorsDetails } from '../actions'
import CreatorsTile from './CreatorsTile'
import Comics from '../../comics/components/Comics'

class CreatorsDetails extends Component {
  componentDidMount() {
    this.props.dispatch(loadCreatorsDetails({ id: this.props.id }))
  }

  render() {
    const { creator } = this.props
    const { fullName, suffix, comics, comicsTotal } = creator

    return <div className="creators-details">
      <Helmet>
        <title>{`${fullName} | Creators | Marvellous`}</title>
      </Helmet>
      
      <div className="creators-details-header">
        <CreatorsTile hasImages={false} creator={creator} large />
        <h1>{suffix ? `${suffix} ` : ''}{fullName}</h1>
      </div>

      {comicsTotal > 0 &&
        <div>
          <h2>Comics by {fullName}</h2>
          <Comics comics={comics} /> 
        </div>
      }
    </div>
  }
}

export default connect((state) => {
  const { data, selected } = state.creators;
  return {
    creator: data[selected] || {}
  }
})(CreatorsDetails)
