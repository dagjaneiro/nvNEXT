import { UPDATE_EDITOR_STATE } from './actions'
import { LOAD_NOTE, DESELECT_NOTE } from '../../common/actions'
import { createEditorState } from './utils'

const initialState = {
  noteId: null,
  editorState: null
}

function editor (editorState = initialState, action) {
  switch (action.type) {
    case UPDATE_EDITOR_STATE:
      return Object.assign({}, editorState, {
        editorState: action.payload.editorState
      })
    case LOAD_NOTE:
      const note = action.payload.note
      return Object.assign({}, editorState, {
        noteId: note.id,
        editorState: createEditorState(note.content)
      })
    case DESELECT_NOTE:
      return Object.assign({}, editorState, {
        noteId: null,
        editorState: null
      })
    default:
      return editorState
  }
}

export default editor
