import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ItemList from '../../components/ItemList'
import { getAutoSelect, getSearchText, getSelectedNote, getFilteredNotes } from '../../common/selectors'
import { selectNote } from '../../common/actions'
import { createSelector } from 'reselect'

const mapStateToProps = createSelector(
  [getAutoSelect, getSelectedNote, getSearchText, getFilteredNotes],
  (autoSelect, selectedNote, searchText, notes) => {
    let selectedId = null
    if (autoSelect) {
      selectedId = selectedNote && selectedNote.id || null
    }

    return {
      selected: selectedId,
      searchText,
      notes: notes
    }
  }
)

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    onSelectItem: selectNote
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)
