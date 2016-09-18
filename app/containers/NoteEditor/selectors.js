import { createSelector } from 'reselect'

export const getNoteId = (state) => state.editor.noteId
export const getShouldFocus = (state) => state.editor.focus
export const getEditorState = (state) => state.editor.editorState

export const getLineCount = createSelector(
  [getEditorState],
  (editorState) => {
    if (!editorState) return 0
    const blockArray = editorState.getCurrentContent().getBlocksAsArray()
    return blockArray ? blockArray.length : 0
  })

export const getCharCount = createSelector(
  [getEditorState],
  (editorState) => {
    if (!editorState) return 0
    const plainText = editorState.getCurrentContent().getPlainText('')
    const regex = /(?:\r\n|\r|\n)/g
    const cleanString = plainText.replace(regex, '').trim()
    return cleanString.length
  })
