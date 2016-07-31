import { combineReducers } from 'redux'
import filter from './containers/SearchNote/reducer'
import noteList from './containers/NoteList/reducer'
import editor from './containers/NoteEditor/reducer'

const rootReducer = combineReducers({
  filter,
  noteList,
  editor
})

export default rootReducer
