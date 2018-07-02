import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { updateEditorState, setBlockType } from './actions'
import { getShouldFocus, getNoteId, getEditorState } from './selectors'
import Editor from '../../components/Editor/nvEditor'

const mapStateToProps = createSelector(
  [getShouldFocus, getNoteId, getEditorState],
  (shouldFocus, noteId, editorState) => {
    return {
      shouldFocus,
      noteId,
      editorState
    }
  }
)

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    onChange: updateEditorState,
    onSetBlockType: setBlockType
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
