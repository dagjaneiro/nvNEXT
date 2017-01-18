import { QUICK_OPEN, QUICK_CREATE, QUICK_CREATE_SEARCH } from './actions'
import { SELECT_NOTE, SEARCH_RESULT } from '../../common/actions'

const initialState = {
  isOpen: false,
  searchText: '',
  mode: 'OPEN',
  notes: []
}

function filter (state = initialState, action) {
  switch (action.type) {
    case QUICK_OPEN:
      return Object.assign({}, initialState, {
        isOpen: action.payload.open,
        mode: 'OPEN'
      })
    case QUICK_CREATE:
      return Object.assign({}, initialState, {
        isOpen: action.payload.open,
        mode: 'CREATE'
      })
    case SELECT_NOTE:
      return Object.assign({}, state, { isOpen: false })
    case SEARCH_RESULT:
      return Object.assign({}, state, {
        searchText: action.payload.text,
        notes: action.payload.result
      })
    case QUICK_CREATE_SEARCH:
      return Object.assign({}, state, { searchText: action.payload.text })
    default:
      return state
  }
}

export default filter
