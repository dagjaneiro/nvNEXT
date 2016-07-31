import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { focusEditor } from '../NoteEditor/actions'
import { performSearch, createAndSelectNote } from '../../common/actions'
import { getSearchText, getSelectedNote, getAutoSelect, getMode } from '../../common/selectors'
import SearchBar from '../../components/SearchBar'

const mapStateToProps = createSelector(
  [getSearchText, getMode, getAutoSelect, getSelectedNote],
  (searchText, mode, autoSelect, selectedNote) => {
    let selectedId = null
    let selectedTitle = selectedNote && selectedNote.title
    if (selectedNote) {
      selectedId = selectedNote.id
      const title = selectedNote.title
      selectedTitle = searchText + title.substring(searchText.length)
    }
    return {
      mode: mode,
      value: searchText,
      selectedId,
      selectedTitle: selectedTitle,
      autoSelect: autoSelect
    }
  }
)

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    onPerformSearch: performSearch,
    onSelectItem: focusEditor,
    onCreateItem: createAndSelectNote
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
