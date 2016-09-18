import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { blurEditor, updateEditorState } from './actions'
import { getShouldFocus, getNoteId, getEditorState } from './selectors'
import nvEditor from '../../components/Editor'

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
    onBlur: blurEditor,
    onChange: updateEditorState
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(nvEditor)
