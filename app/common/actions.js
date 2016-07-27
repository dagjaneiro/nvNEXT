import shortid from 'shortid'

export const PERFORM_SEARCH = 'PERFORM_SEARCH'
export const SEARCH_RESULT = 'SEARCH_RESULT'
export const REQUEST_SAVE = 'REQUEST_SAVE'
export const CREATE_NOTE = 'CREATE_NOTE'
export const CREATE_AND_SELECT = 'CREATE_AND_SELECT'
export const SAVE_NOTE = 'SAVE_NOTE'
export const LOAD_NOTE = 'LOAD_NOTE'
export const UPDATE_LIST = 'UPDATE_LIST'
export const LIST_SELECT_NOTE = 'LIST_SELECT_NOTE'
export const LIST_DESELECT_NOTE = 'LIST_DESELECT_NOTE'

export const performSearch = (text, autoSelect, focusEditor) => ({ type: PERFORM_SEARCH, payload: { text, autoSelect, focusEditor } })
export const searchResult = (text, result) => ({ type: SEARCH_RESULT, payload: { text, result } })
export const requestSaveNote = () => ({ type: REQUEST_SAVE })
export const createNote = (id, text) => ({ type: CREATE_NOTE, payload: { id, text } })
export const createAndSelectNote = (text) => ({ type: CREATE_AND_SELECT, payload: { id: shortid.generate(), text } })
export const saveNote = (note) => ({ type: SAVE_NOTE, payload: note })
export const loadNote = (id) => ({ type: LOAD_NOTE, payload: id })
export const updateList = (repository) => ({ type: UPDATE_LIST, payload: repository })
export const selectNote = (id, title) => ({ type: LIST_SELECT_NOTE, payload: { id, title } })
export const deselectNote = () => ({ type: LIST_DESELECT_NOTE })
