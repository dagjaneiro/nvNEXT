import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { selectNote, performSearch, createNote } from '../../common/actions'
import { getSearchText, getNotes, getIsOpen, getMode } from './selectors'
import QuickOpen from '../../components/QuickOpen'
import { quickOpen, quickCreate, quickCreateSearch } from './actions'

const mapStateToProps = createSelector(
  [getIsOpen, getMode, getSearchText, getNotes],
  (isOpen, mode, searchText, notes) => {
    return {
      isOpen,
      mode,
      searchText,
      notes: notes
    }
  }
)

function mergeProps (stateProps, dispatchProps, ownProps) {
  const { mode } = stateProps
  const { dispatch } = dispatchProps

  let actions = null
  let notes = stateProps.notes

  if (mode === 'OPEN') {
    actions = {
      onPerformSearch: performSearch,
      onEnter: selectNote,
      onCancel: () => quickOpen(false)
    }
  } else {
    actions = {
      onPerformSearch: quickCreateSearch,
      onEnter: createNote,
      onCancel: () => quickCreate(false)
    }

    notes = [{ id: -1, title: 'Create new note...' }]
  }

  return {
    ...stateProps,
    ...ownProps,
    notes,
    ...bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, null, mergeProps)(QuickOpen)
