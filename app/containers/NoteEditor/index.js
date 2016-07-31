import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { blurEditor } from './actions'
import { saveNote } from '../../common/actions'
import { getShouldSave, getShouldFocus } from './selectors'
import { getAutoSelect, getSelectedNote } from '../../common/selectors'
import Editor from '../../components/Editor'

const mapStateToProps = createSelector(
  [getShouldSave, getShouldFocus, getAutoSelect, getSelectedNote],
  (shouldSave, shouldFocus, autoSelect, note) => {
    return {
      shouldSave,
      shouldFocus,
      note: autoSelect ? note : null
    }
  }
)

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    onTriggerSave: saveNote,
    onBlur: blurEditor
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
