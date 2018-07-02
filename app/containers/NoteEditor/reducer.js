import { EditorState, Modifier } from 'draft-js'
import { UPDATE_EDITOR_STATE, SET_BLOCK_TYPE } from './actions'
import { LOAD_NOTE, DESELECT_NOTE } from '../../common/actions'
import { createEditorState, setBlockType, getChangedBlocks } from './utils'

const initialState = {
  noteId: null,
  editorState: null
}

function editor (state = initialState, action) {
  switch (action.type) {
    case UPDATE_EDITOR_STATE: {
      const oldContent = state.editorState && state.editorState.getCurrentContent()
      const newContent = action.payload.editorState.getCurrentContent()
      const newBlocks = getChangedBlocks(oldContent, newContent)
      const processedBlocks = newBlocks.map(processBlock)
      const blockMap = newContent.getBlockMap().merge(processedBlocks)
      const processedContent = newContent.merge({
        blockMap: blockMap
      })

      return Object.assign({}, state, {
        editorState: EditorState.push(action.payload.editorState, processedContent, 'insert-characters')
      })
    }
    case LOAD_NOTE:
      const note = action.payload.note
      return Object.assign({}, state, {
        noteId: note.id,
        editorState: createEditorState(note.content)
      })
    case DESELECT_NOTE:
      return Object.assign({}, state, {
        noteId: null,
        editorState: null
      })
    case SET_BLOCK_TYPE:
      const { key, type } = action.payload
      const { editorState } = state
      const content = state.editorState.getCurrentContent()
      const newContent = setBlockType(content, key, type)
      const newEditorState = EditorState.push(editorState, newContent, 'change-block-type')

      return Object.assign({}, state, {
        editorState: newEditorState
      })
    default:
      return state
  }
}

export default editor

function processBlock (block) {
  const blockType = block.getType()

  if (blockType === 'unstyled') {
    const blockText = block.getText()

    if (blockText.startsWith('# ')) {
      return block.merge({
        type: 'header-three',
        text: blockType.substr(2)
      })
    }
  }
  return block
}
