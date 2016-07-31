import { createSelector } from 'reselect'
import { MODE_SEARCH, MODE_SELECTED } from '../components/SearchBar/constants'

export const getNotes = (state) => state.noteList.notes
export const getAutoSelect = (state) => state.filter.autoSelect

export const getResult = (state) => state.filter.result
export const getSearchText = (state) => state.filter.text

export const getSelectedNote = (state) => state.noteList.selectedNote

export const getMode = createSelector(
  [getAutoSelect, getSelectedNote],
  (autoSelect, selectedNote) => {
    return autoSelect && selectedNote ? MODE_SELECTED : MODE_SEARCH
  }
)
