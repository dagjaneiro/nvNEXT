import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Editor from '../../components/Editor'
import { getAutoSelect, getSelectedNote } from '../../common/selectors'
import { getShouldSave, getShouldFocus } from './selectors'
import { saveNote } from '../../common/actions'
import { blurEditor } from './actions'
import { createSelector } from 'reselect'

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
