import React, { PropTypes, Component } from 'react'
import { Editor, RichUtils, Modifier, EditorState } from 'draft-js'
import Gutter from './gutter'
import { getBlockRenderer } from './blocks/render'
import styleMap from './style.map'
import { keyBindingFn } from './keybindings'

export default class nvEditor extends Component {

  constructor (props) {
    super(props)
    this.setFocus = this.setFocus.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.handleBeforeInput = this.handleBeforeInput.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
    this.blockRenderer = getBlockRenderer({ onSetBlockType: props.onSetBlockType })

    props.triggerFocus(this.setFocus)
  }

  getId () {
    return this.props.noteId
  }

  setFocus () {
    if (this.getId()) {
      this.refs.editor.focus()
    }
  }

  onChange (editorState) {
    this.props.onChange(editorState)
  }

  _toggleBlockType (blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType
      )
    )
  }

  _toggleInlineStyle (inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        inlineStyle
      )
    )
  }

  handleKeyCommand (command) {
    if (command.type === 'block') {
      this._toggleBlockType(command.mode)
    } else if (command.type === 'inline') {
      this._toggleInlineStyle(command.mode)
    }

    const editorState = this.props.editorState
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      this.onChange(newState)

      return true
    }

    return false
  }

  handleBeforeInput (chars) {
    const editorState = this.props.editorState
    const selection = editorState.getSelection()
    const blockKey = selection.getStartKey()
    const offset = selection.getStartOffset()
    const block = editorState.getCurrentContent().getBlockForKey(blockKey)
    const text = block.getText()
    const match = text.slice(0, offset) + chars
    console.log(match)
    if (match === '##') {
      const newSelection = selection.merge({ anchorOffset: 0 })
      const newContent = Modifier.replaceText(editorState.getCurrentContent(), newSelection, '\t')
      const newState = EditorState.push(editorState, newContent, 'insert-characters')
      this.props.onChange(newState)
      return 'handled'
    }
  }

  // insertNewLine (editorState, resetBlockType) {
  //   let contentState = editorState.getCurrentContent()

  //   contentState = Modifier.splitBlock(
  //     contentState,
  //     editorState.getSelection()
  //   )

  //   if (resetBlockType) {
  //     contentState = Modifier.setBlockType(
  //       contentState,
  //       contentState.getSelectionAfter(),
  //       'unstyled'
  //     )
  //   }

  //   return contentState
  // }

  insertNewLine (contentState, selection) {
    return Modifier.splitBlock(
      contentState,
      selection
    )
  }

  resetBlockType (contentState, selection) {
    return Modifier.setBlockType(
      contentState,
      selection,
      'unstyled'
    )
  }

  getCurrentBlock (editorState) {
    const blockKey = editorState.getSelection().getEndKey()
    const currentContent = editorState.getCurrentContent()

    return currentContent.getBlockForKey(blockKey)
  }

  isAtEndOfBlock (editorState) {
    const selection = editorState.getSelection()
    const offset = selection.getEndOffset()
    const block = this.getCurrentBlock(editorState)
    const length = block.getLength()

    return offset === length
  }

  isEmptyBlock (editorState) {
    const block = this.getCurrentBlock(editorState)
    return block.getLength() === 0
  }

  resetOnReturn (blockType) {
    const types = ['header']

    return !!types.filter((type) => blockType.indexOf(type) > -1).length
  }

  resetOnReturnEmpty (blockType) {
    const types = ['header', 'list']

    return !!types.filter((type) => blockType.indexOf(type) > -1).length
  }

  handleReturn (e) {
    const editorState = this.props.editorState
    let contentState = editorState.getCurrentContent()

    if (this.isEmptyBlock(editorState)) {
      const blockType = RichUtils.getCurrentBlockType(editorState)
      const resetBlockType = this.resetOnReturnEmpty(blockType)

      if (resetBlockType) {
        contentState = this.resetBlockType(contentState, editorState.getSelection())
        this.onChange(EditorState.push(editorState, contentState, 'change-block-type'))
      } else {
        return false
      }

      return true
    } else if (this.isAtEndOfBlock(editorState)) {
      const blockType = RichUtils.getCurrentBlockType(editorState)
      const resetBlockType = this.resetOnReturn(blockType)
      contentState = this.insertNewLine(contentState, editorState.getSelection())

      if (resetBlockType) {
        contentState = this.resetBlockType(contentState, contentState.getSelectionAfter())
      }

      this.onChange(EditorState.push(editorState, contentState, 'split-block'))

      return true
    } else {
      return false
    }
  }

  render () {
    return (
      <div className="editor-container" onClick={this.setFocus} suppressContentEditableWarning>
        {
          !this.getId()
          ? <div className="editor-overlay">
            <div className="align-center">
              <p>No Note Selected</p>
            </div>
          </div>
          : <div className="nv-editor">
            <Gutter />
            <Editor
              // blockRenderMap={blockRenderMap}
              blockRendererFn={this.blockRenderer}
              customStyleMap={styleMap}
              editorState={this.props.editorState}
              handleKeyCommand={this.handleKeyCommand}
              handleReturn={this.handleReturn}
              handleBeforeInput={this.handleBeforeInput}
              keyBindingFn={keyBindingFn}
              onChange={this.onChange}
              onSetBlockType={this.props.onSetBlockType}
              ref="editor"
              spellCheck
            />
          </div>
        }
      </div>
    )
  }
}

nvEditor.propTypes = {
  noteId: PropTypes.string,
  editorState: PropTypes.object,
  onChange: PropTypes.func,
  onSetBlockType: PropTypes.func,
  triggerFocus: PropTypes.func
}
