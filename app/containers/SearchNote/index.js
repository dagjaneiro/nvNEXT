import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { performSearch, createNote } from '../../common/actions'
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

function mapDispatchToProps (dispatch, ownProps) {
  const actionCreators = bindActionCreators({
    onPerformSearch: performSearch,
    onCreateItem: createNote
  }, dispatch)

  return Object.assign(actionCreators, {
    focusEditor: ownProps.focusEditor
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
