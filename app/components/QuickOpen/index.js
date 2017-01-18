import classNames from 'classnames'
import React, { PropTypes, Component } from 'react'
import * as styles from './styles.css'

export class QuickOpen extends Component {

  constructor (props) {
    super(props)
    this.state = { selected: -1 }
  }

  componentWillReceiveProps (props) {
    if (props.notes.length) {
      this.setState({ selected: 0 })
    }
  }

  performSearch (event) {
    this.props.onPerformSearch(event.target.value, false)
  }

  selectUp () {
    const selected = this.state.selected > 0 ? this.state.selected - 1 : 0
    this.setState({ selected })
  }

  selectDown () {
    const selected = this.state.selected < this.props.notes.length - 1 ? this.state.selected + 1 : this.state.selected
    this.setState({ selected })
  }

  getActionPayload () {
    const { mode, notes, searchText } = this.props
    const { selected } = this.state

    if (mode === 'OPEN' && selected !== -1) {
      return notes[selected].id
    } else if (mode === 'CREATE') {
      return searchText
    }

    return null
  }

  keyHandler (event) {
    switch (event.keyCode) {
      case 38: // Key up
        event.preventDefault()
        this.selectUp()
        break
      case 40: // Key down
        event.preventDefault()
        this.selectDown()
        break
      case 27: // Esc
        event.preventDefault()
        this.props.onCancel()
        break
      case 13: // Enter
        event.preventDefault()
        const payload = this.getActionPayload()
        if (payload) {
          this.props.onEnter(payload)
        }
        break
    }
  }

  renderInput () {
    const handler = (event) => this.performSearch(event)
    const keyHandler = (event) => this.keyHandler(event)
    const onBlur = (event) => this.props.onCancel(event)
    return (
      <div className={styles.quickOpenInput} >
        <input autoFocus onChange={handler} onKeyDown={keyHandler} onBlur={onBlur} value={this.props.searchText} />
      </div>
    )
  }

  renderNote (idx, note, onClick, selected) {
    const isSelected = selected === idx
    const entryStyle = classNames(styles.quickOpenEntry, {
      [styles.selected]: isSelected
    })

    return (
      <div key={note.id} className={entryStyle} onMouseDown={function () {
        if (!isSelected) onClick(note.id, note.title)
      }}>
        <div><span>{note.title}</span></div>
      </div>
    )
  }

  renderNotes (notes, onClick, selected) {
    return notes.map((note, idx) => this.renderNote(idx, note, onClick, selected))
  }

  render () {
    const selected = this.state.selected

    return (
      this.props.isOpen
      ? <div className={styles.quickOpenWidget}>
        <div className={styles.quickOpenInputContainer}>
          {this.renderInput()}
        </div>
        <div className={styles.quickOpenResultsContainer}>
          {this.renderNotes(this.props.notes, this.props.onEnter, selected)}
        </div>
      </div>
      : null
    )
  }
}

QuickOpen.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  searchText: PropTypes.string,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEnter: PropTypes.func.isRequired,
  onPerformSearch: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default QuickOpen
