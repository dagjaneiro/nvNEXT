import { combineReducers } from 'redux'
import filter from './containers/SearchNote/reducer'
import noteList from './containers/NoteList/reducer'
import editor from './containers/NoteEditor/reducer'
import quickOpen from './containers/QuickOpen/reducer'

const rootReducer = combineReducers({
  filter,
  noteList,
  editor,
  quickOpen
})

export default rootReducer
