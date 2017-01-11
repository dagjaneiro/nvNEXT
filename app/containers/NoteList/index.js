import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { selectNote } from '../../common/actions'
import { getAutoSelect, getSearchText, getSelectedNote, getNotes } from '../../common/selectors'
// import ItemList from '../../components/ItemList'
import VerticalItemList from '../../components/VerticalItemList'

const mapStateToProps = createSelector(
  [getAutoSelect, getSelectedNote, getSearchText, getNotes],
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

export default connect(mapStateToProps, mapDispatchToProps)(VerticalItemList)
