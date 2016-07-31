import { FOCUS_EDITOR, BLUR_EDITOR } from './actions'
import { REQUEST_SAVE, SAVE_NOTE } from '../../common/actions'

const initialState = {
  save: false,
  focus: false
}

function editor (editorState = initialState, action) {
  switch (action.type) {
    case REQUEST_SAVE:
      return Object.assign({}, editorState, {
        save: true
      })
    case SAVE_NOTE:
      return Object.assign({}, editorState, {
        save: false
      })
    case FOCUS_EDITOR:
      return Object.assign({}, editorState, {
        focus: true
      })
    case BLUR_EDITOR:
      return Object.assign({}, editorState, {
        focus: false
      })
    default:
      return editorState
  }
}

export default editor
