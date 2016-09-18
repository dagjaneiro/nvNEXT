import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import decorator from '../../components/Editor/decorators'

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
