import { SEARCH_RESULT, LOAD_NOTE, DESELECT_NOTE, UPDATE_LIST } from '../../common/actions'

const initialState = {
  selectedId: null,
  selectedNote: null,
  notes: []
}

function noteList (noteListState = initialState, action) {
  switch (action.type) {
    case UPDATE_LIST:
      return Object.assign({}, noteListState, {
        notes: action.payload
      })
    case LOAD_NOTE:
      return Object.assign({}, noteListState, {
        selectedId: action.payload.id,
        selectedNote: action.payload
      })
    case DESELECT_NOTE:
      return Object.assign({}, noteListState, {
        selectedId: null,
        selectedNote: null
      })
    case SEARCH_RESULT:
      return Object.assign({}, noteListState, { notes: action.payload.result })
    default:
      return noteListState
  }
}

export default noteList
