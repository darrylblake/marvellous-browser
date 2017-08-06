import * as actions from './actions'
import * as constants from './constants'
import {client} from '../../client'
import * as R from 'ramda'
import {browserHistory} from 'react-router'
import {objectToQueryParams} from '../../helpers/objectToQueryParams'
let {expect, describe, it, spyOn} = global

describe('Creators actions', () => {

  it('should update creators with name starting with a string', () => {
    const nameStartsWith = 'test'
    const expectedAction = {
      type: constants.CREATORS_UPDATE_NAME_STARTS_WITH,
      nameStartsWith
    }
    expect(actions.updateNameStartsWith(nameStartsWith)).toEqual(expectedAction);
  })

  it('should load creators with given options', () => {
    const queryOptions = {
      orderBy: "name",
      start: 0,
      limit: 12,
      nameStartsWith: ""
    }

    const expectedAction = {
      type: constants.CREATORS_LOAD,
      payload: client.query({
        query: actions.CREATORS_QUERY,
        variables: queryOptions
      })
    }
    expect(actions.loadCreators(queryOptions)).toEqual(expectedAction);
  })

  it('should load 12 more creators with given options', () => {
    const queryOptions = {
      orderBy: "name",
      start: 24,
      limit: 12,
      nameStartsWith: "abc"
    }

    const expectedAction = {
      type: constants.CREATORS_LOAD_MORE,
      payload: client.query({
        query: actions.CREATORS_QUERY,
        variables: queryOptions
      })
    }
    expect(actions.loadMoreCreators(queryOptions)).toEqual(expectedAction);
  })

  it('update creators collection with given variables', () => {
    spyOn(browserHistory, 'push');

    const variables = {
      orderBy: "name",
      nameStartsWith: "faeaf"
    }

    const mergedVariables = R.compose(R.merge({
      start: 0,
      limit: 12,
      nameStartsWith: null,
      orderBy: constants.CREATORS_ORDER_FIRSTNAME_ASC
    }), R.clone)(variables)

    const expectedAction = [
      {
        type: constants.CREATORS_CHANGE_QUERY,
        variables
      },
      {
        type: constants.CREATORS_LOAD,
        payload: client.query({
          query: actions.CREATORS_QUERY,
          variables: mergedVariables
        })
      }
    ]

    expect(actions.updateCreatorsQuery(variables)).toEqual(expectedAction)
    expect(browserHistory.push).toHaveBeenCalledWith(`/creators?${objectToQueryParams(mergedVariables)}`)
  })

})