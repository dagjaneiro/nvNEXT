import Immutable from 'immutable'
import { CREATE_NOTE, SEARCH_RESULT, SAVE_NOTE } from './actions'

const initialState = {
  notes: Immutable.Map()
}

function createDocument (id, title) {
  return {
    id: id,
    type: 'text',
    title: title,
    content: '',
    dateCreated: null,
    dateSaved: null
  }
}

export const repository = function (repositoryState = initialState, action) {
  switch (action.type) {
    case CREATE_NOTE:
      let id = action.payload.id
      let docNote = createDocument(id, action.payload.text)
      return Object.assign({}, repositoryState, {
        notes: repositoryState.notes.set(id, docNote)
      })
    case SEARCH_RESULT:
      return Object.assign({}, repositoryState, { text: action.payload.text, result: action.payload.result })
    case SAVE_NOTE:
      return action.payload.id ? Object.assign({}, repositoryState, {
        notes: repositoryState.notes.set(action.payload.id, action.payload)
      }) : repositoryState
    default:
      return repositoryState
  }
}
