import { combineReducers } from 'redux'
import filter from './containers/SearchNote/reducer'
import noteList from './containers/NoteList/reducer'
import editor from './containers/NoteEditor/reducer'
import { repository } from './common/reducers'

const rootReducer = combineReducers({
  filter,
  noteList,
  editor,
  repository
})

export default rootReducer
