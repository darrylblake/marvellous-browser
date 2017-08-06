import propOr from 'ramda/src/propOr'
import pathOr from 'ramda/src/pathOr'
import URLSearchParams from 'url-search-params'
import {
  CREATORS_CHANGE_QUERY,
  CREATORS_LOAD_FULFILLED,
  CREATORS_LOAD_MORE_FULFILLED,
  CREATORS_ORDER_FIRSTNAME_ASC,
  CREATORS_UPDATE_NAME_STARTS_WITH
} from './constants'

// eslint-disable-next-line no-undef
const params = new URLSearchParams(location.search.slice(1));
const initialState = {
  data: {},
  list: [],
  orderBy: params.get('orderBy') || CREATORS_ORDER_FIRSTNAME_ASC,
  nameStartsWith: params.get('nameStartsWith') || '',
  limit: params.get('limit') || 12,
  start: params.get('start') || 0
}

const getCreatorsFromResponse = pathOr([], ['payload', 'data', 'creators'])

const loadCreators = (state, action) => {
  const list = [...state.list]
  const creatorsPayload = getCreatorsFromResponse(action);
  const data = Object.assign({}, state.data, creatorsPayload.reduce((data, creator) => {
    if (!state.data[creator.id]) {
      list.push(creator.id)
    }
    data[creator.id] = creator
    return data
  }, {}));

  return Object.assign({}, state, {
    data,
    list
  })
}

export function creators (
  state = initialState,
  action
) {
  switch (action.type) {
    case CREATORS_LOAD_FULFILLED:
      return loadCreators(state, action)

    case CREATORS_LOAD_MORE_FULFILLED:
      return loadCreators(state, action)

    case CREATORS_CHANGE_QUERY: {
      return Object.assign({}, state, {
        orderBy: propOr(state.orderBy, 'orderBy', action.variables),
        nameStartsWith: propOr(state.nameStartsWith, 'nameStartsWith', action.variables)
      })
    }

    case CREATORS_UPDATE_NAME_STARTS_WITH: {
      return Object.assign({}, state, {
        nameStartsWith: action.nameStartsWith
      })
    }

    default:
      return state
  }
}
