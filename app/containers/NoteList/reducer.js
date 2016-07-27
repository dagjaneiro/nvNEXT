import { CREATE_NOTE, SAVE_NOTE, LIST_SELECT_NOTE, LIST_DESELECT_NOTE, UPDATE_LIST } from '../../common/actions'
import Immutable from 'immutable'
import moment from 'moment'

const initialState = {
  selectedId: null,
  selectedNote: null,
  notes: Immutable.Map()
}

function createDocument (id, title) {
  return {
    id: id,
    type: 'text',
    title: title,
    content: '',
    dateCreated: moment().format('X'),
    dateModified: null
  }
}

function noteList (noteListState = initialState, action) {
  switch (action.type) {
    case CREATE_NOTE:
      let id = action.payload.id
      let docNote = createDocument(id, action.payload.text)
      return Object.assign({}, noteListState, {
        notes: noteListState.notes.set(id, docNote)
      })
    case SAVE_NOTE:
      return action.payload.id ? Object.assign({}, noteListState, {
        notes: noteListState.notes.set(action.payload.id, action.payload)
      }) : noteListState
    case UPDATE_LIST:
      return Object.assign({}, noteListState, {
        notes: action.payload
      })
    case LIST_SELECT_NOTE:
      const selectedId = action.payload.id
      const selectedNote = noteListState.notes.get(selectedId)
      return Object.assign({}, noteListState, {
        selectedId: selectedId,
        selectedNote: selectedNote
      })
    case LIST_DESELECT_NOTE:
      return Object.assign({}, noteListState, {
        selectedId: null,
        selectedNote: null
      })
    default:
      return noteListState
  }
}

export default noteList
