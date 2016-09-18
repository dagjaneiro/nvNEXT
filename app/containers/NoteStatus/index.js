import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getCharCount, getLineCount } from '../NoteEditor/selectors'
import StatusBar from '../../components/StatusBar'

const mapStateToProps = createSelector(
  [getLineCount, getCharCount],
  (lineCount, charCount) => ({
    lineCount,
    charCount
  })
)

export default connect(mapStateToProps)(StatusBar)
