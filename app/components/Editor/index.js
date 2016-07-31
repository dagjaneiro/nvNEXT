import classNames from 'classnames'
import CodeMirror from 'codemirror'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/mode/javascript/javascript'
import React, { PropTypes, Component } from 'react'

const {ProseMirror} = require('prosemirror/dist/edit')
const {exampleSetup} = require('prosemirror/dist/example-setup')
var {schema} = require('prosemirror/dist/schema-basic')
const {defaultMarkdownParser, defaultMarkdownSerializer} = require('prosemirror/dist/markdown')

class Editor extends Component {

  constructor (props) {
    super(props)
    this.initCodeMirror = this.initCodeMirror.bind(this)
    this.initProseMirror = this.initProseMirror.bind(this)
    this.setFocus = this.setFocus.bind(this)
    this.state = { focus: false, note: props.note }
  }

  initCodeMirror (textarea) {
    console.log('init codemirror')
    this.editor = CodeMirror.fromTextArea(textarea, {
      lineWrapping: true,
      mode: 'gfm'
    })
  }

  initProseMirror (element) {
    console.log('init prosemirror')
    const note = this.state.note
    const content = note && note.content || ''
    this.editor = new ProseMirror({
      place: element,
      doc: defaultMarkdownParser.parse(content),
      plugins: [
        exampleSetup.config({
          menuBar: false,
          tooltipMenu: false
        })
      ]
    })

    this.editorRef = element
    this.editor.on.blur.add(() => {
      if (this.state.focus) {
        this.setState({ focus: false })
        this.setBlur()
      }
    })

    this.editor.on.focus.add(() => {
      if (!this.state.focus) {
        this.setState({ focus: true })
      }
    })
  }

  getId () {
    return this.state.note && this.state.note.id
  }

  setBlur () {
    console.log('blur editor!')
    this.props.onBlur()
  }

  setFocus () {
    if (this.getId()) {
      console.log('focus editor!')
      this.editor.focus()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.shouldSave) return

    const note = this.state.note
    const currentId = note && note.id
    const nextId = nextProps.note && nextProps.note.id

    if (!this.state.focus && nextProps.shouldFocus) {
      this.setState({ focus: true }, () => {
        this.setFocus()
      })
    }

    if (currentId !== nextId) {
      // if (currentId) this.saveDoc(currentId)
      const nextNote = nextId ? nextProps.note : { id: null, content: '' }
      this.setState({ note: nextNote }, () => {
        this.editor.setDoc(defaultMarkdownParser.parse(this.state.note.content))
        // if (nextNote.id && !nextNote.dateSaved) this.setFocus()
      })
    }
  }

  saveDoc (currentId) {
    console.log('saving ' + currentId + ' ' + this.state.note.title)
    const note = Object.assign({}, this.state.note, {
      content: defaultMarkdownSerializer.serialize(this.editor.doc),
      dateSaved: new Date()
    })
    this.props.onTriggerSave(note)
  }

  shouldComponentUpdate (nextProps) {
    if (nextProps.shouldSave && this.state.note.id) {
      const note = this.state.note ? Object.assign({}, this.state.note, {
        content: defaultMarkdownSerializer.serialize(this.editor.doc)
      }) : {}
      this.props.onTriggerSave(note)
      return false
    }
    return true
  }

  render () {
    const editorStyle = classNames('editor-prose', {
      'editor-hidden': !this.props.note
    })
    return (
      <div className="editor-container" onClick={this.setFocus} >
        {
          !this.props.note
          ? <div className="editor-overlay">
            <div className="align-center">
              <p>No Note Selected</p>
            </div>
          </div>
          : null
        }
        <div className={editorStyle} ref={this.initProseMirror} />
      </div>
    )
  }
}

Editor.propTypes = {
  note: PropTypes.object,
  shouldSave: PropTypes.bool.isRequired,
  shouldFocus: PropTypes.bool.isRequired,
  onBlur: PropTypes.func,
  onTriggerSave: PropTypes.func
}

export default Editor
