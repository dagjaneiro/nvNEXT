import { createAction } from './utils'

export const PERFORM_SEARCH = 'PERFORM_SEARCH'
export const SEARCH_RESULT = 'SEARCH_RESULT'
export const CREATE_NOTE = 'CREATE_NOTE'
export const NOTE_CREATED = 'NOTE_CREATED'
export const NOTE_UPDATED = 'NOTE_UPDATED'
export const SAVE_NOTE = 'SAVE_NOTE'
export const LOAD_NOTE = 'LOAD_NOTE'
export const SELECT_NOTE = 'SELECT_NOTE'
export const DESELECT_NOTE = 'DESELECT_NOTE'

export const performSearch = createAction(PERFORM_SEARCH, (text, autoSelect) => ({ text, autoSelect }))
export const searchResult = createAction(SEARCH_RESULT, (text, result) => ({ text, result }))
export const createNote = createAction(CREATE_NOTE, (title) => ({ title }))
export const noteCreated = createAction(NOTE_CREATED, (id) => ({ id }))
export const saveNote = createAction(SAVE_NOTE, (id, plainText, content) => ({ id, plainText, content }))
export const loadNote = createAction(LOAD_NOTE, (note) => ({ note }))
export const selectNote = createAction(SELECT_NOTE, (id) => ({ id }))
export const deselectNote = createAction(DESELECT_NOTE)
export const noteUpdated = createAction(NOTE_UPDATED)
