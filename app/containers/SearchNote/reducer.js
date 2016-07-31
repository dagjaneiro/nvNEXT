import { CREATE_NOTE, SEARCH_RESULT, PERFORM_SEARCH, SELECT_NOTE } from '../../common/actions'
import { STATUS_DONE } from './constants'

const initialState = {
  text: '',
  autoSelect: false,
  result: [],
  status: STATUS_DONE
}

function filter (filterState = initialState, action) {
  switch (action.type) {
    case PERFORM_SEARCH:
      return Object.assign({}, filterState, { text: action.payload.text, autoSelect: action.payload.autoSelect })
    case CREATE_NOTE:
    case SELECT_NOTE:
      return Object.assign({}, filterState, { autoSelect: true })
    default:
      return filterState
    case SEARCH_RESULT:
      return Object.assign({}, filterState, { text: action.payload.text, result: action.payload.result })
  }
}

export default filter
