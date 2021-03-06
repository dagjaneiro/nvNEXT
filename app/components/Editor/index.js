import React, { PropTypes, Component } from 'react'
import NVEditor from '../Editor/nvEditor'

export default class EditorWithGutter extends Component {
  render () {
    return (
      <div className="nv-editor-container">
        <NVEditor {...this.props} />
      </div>
    )
  }
}

EditorWithGutter.propTypes = {
  noteId: PropTypes.string,
  editorState: PropTypes.object,
  onChange: PropTypes.func,
  triggerFocus: PropTypes.func
}
