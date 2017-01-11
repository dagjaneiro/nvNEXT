import moment from 'moment'
import classNames from 'classnames'
import React, { PropTypes, Component } from 'react'
import NoteItem from '../NoteItem'

class ItemList extends Component {

  constructor () {
    super()
    this.renderHeader = this.renderHeader.bind(this)
    this.renderNote = this.renderNote.bind(this)
    this.renderNotes = this.renderNotes.bind(this)
  }

  renderHeader () {
    return (
      <li className="list-group-header">
        <input className="form-control" type="text" placeholder="Search for someone" />
      </li>
    )
  }

  renderNote (note, onClick, selected) {
    const isSelected = selected === note.id

    return (
      <li key={note.id} className="list-item" onMouseDown={function () {
        if (!isSelected) onClick(note.id, note.title)
      }}>
        <NoteItem note={note} isSelected={isSelected} />
      </li>
    )
  }

  renderNotes (notes, onClick, selected) {
    return notes.map((note) => this.renderNote(note, onClick, selected))
  }

  render () {
    return (
      <div className="pane-group">
        <ul className="list-group">
          {this.renderNotes(this.props.notes, this.props.onSelectItem, this.props.selected)}
        </ul>
      </div>
    )
  }
}

ItemList.propTypes = {
  selected: PropTypes.string,
  searchText: PropTypes.string,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectItem: PropTypes.func.isRequired
}

export default ItemList
