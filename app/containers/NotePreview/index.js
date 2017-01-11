import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Preview from '../../components/Preview'
import {getEditorState} from '../NoteEditor/selectors'
const marked = require('marked')

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function (code, lang) {
    return lang ? require('highlight.js').highlight(lang, code).value : code
  }
})

const mapStateToProps = createSelector(
  [getEditorState],
  (editorState) => {
    let noteHtml = ''

    if (editorState) {
      const plainText = editorState.getCurrentContent().getPlainText('')
      noteHtml = marked(plainText)
    }

    return {
      noteHtml
    }
  }
)

export default connect(mapStateToProps)(Preview)
