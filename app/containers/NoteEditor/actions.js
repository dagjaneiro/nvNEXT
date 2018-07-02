export const UPDATE_EDITOR_STATE = 'UPDATE_EDITOR_STATE'
export const SET_BLOCK_TYPE = 'SET_BLOCK_TYPE'

export const updateEditorState = (editorState) => ({ type: UPDATE_EDITOR_STATE, payload: { editorState } })
export const setBlockType = (key, type) => ({ type: SET_BLOCK_TYPE, payload: { key, type } })
