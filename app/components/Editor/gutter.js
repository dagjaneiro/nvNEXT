import React, { PropTypes, Component } from 'react'

export default class EditorGutter extends Component {
  render () {
    return (
      <div className="nv-editor-gutter">
      </div>
    )
  }
}

EditorGutter.propTypes = {
  noteId: PropTypes.string,
  editorState: PropTypes.object,
  onChange: PropTypes.func,
  triggerFocus: PropTypes.func
}
