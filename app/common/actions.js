import shortid from 'shortid'

export const PERFORM_SEARCH = 'PERFORM_SEARCH'
export const SEARCH_RESULT = 'SEARCH_RESULT'
export const REQUEST_SAVE = 'REQUEST_SAVE'
export const CREATE_NOTE = 'CREATE_NOTE'
export const CREATE_AND_SELECT = 'CREATE_AND_SELECT'
export const SAVE_NOTE = 'SAVE_NOTE'
export const LOAD_NOTE = 'LOAD_NOTE'
export const SELECT_NOTE = 'SELECT_NOTE'
export const DESELECT_NOTE = 'DESELECT_NOTE'

export const performSearch = (text, autoSelect, focusEditor) => ({ type: PERFORM_SEARCH, payload: { text, autoSelect, focusEditor } })
export const searchResult = (text, result) => ({ type: SEARCH_RESULT, payload: { text, result } })
export const requestSaveNote = () => ({ type: REQUEST_SAVE })
export const createNote = (note) => ({ type: CREATE_NOTE, note })
export const createAndSelectNote = (text) => ({ type: CREATE_AND_SELECT, payload: { id: shortid.generate(), text } })
export const saveNote = (note) => ({ type: SAVE_NOTE, payload: note })
export const loadNote = (note) => ({ type: LOAD_NOTE, payload: note })
export const selectNote = (id) => ({ type: SELECT_NOTE, payload: id })
export const deselectNote = () => ({ type: DESELECT_NOTE })
