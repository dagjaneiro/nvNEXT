import { EditorState, convertFromRaw, convertToRaw, SelectionState, Modifier } from 'draft-js'
import Decorator from '../../components/Editor/decorators'

const decorator = new Decorator()

export function createEditorState (raw) {
  let editorState
  if (!raw) {
    editorState = EditorState.createEmpty(decorator)
  } else {
    const contentState = convertFromRaw(JSON.parse(raw))
    editorState = EditorState.createWithContent(contentState, decorator)
  }

  return editorState
}

export function getRawContent (editorContent) {
  const rawContent = convertToRaw(editorContent)
  return JSON.stringify(rawContent)
}

export function getPlainText (editorContent) {
  return editorContent.getPlainText(' ')
}

export function setBlockType (editorContent, id, type) {
  const selection = SelectionState.createEmpty(id)
  return Modifier.setBlockType(editorContent, selection, type)
}

export function getChangedBlocks (oldContent, newContent) {
  const oldBlocks = oldContent.getBlockMap()
  const newBlocks = newContent.getBlockMap()
  return newBlocks.filter((block) => !(oldBlocks && oldBlocks.includes(block)))
}
