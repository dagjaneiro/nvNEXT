import classNames from 'classnames'
import React, { PropTypes, Component } from 'react'
import { listTitle, listModified } from './styles.css'
import moment from 'moment'
import Tablesort from 'tablesort'

class ItemList extends Component {

  constructor () {
    super()
    this.renderHeader = this.renderHeader.bind(this)
    this.renderNote = this.renderNote.bind(this)
    this.renderNotes = this.renderNotes.bind(this)
    this.initTable = this.initTable.bind(this)
  }

  renderHeader () {
    return (
      <thead>
        <tr>
          <th className={listTitle}>Title</th>
          <th className={listModified}>Date Modified</th>
        </tr>
      </thead>
    )
  }

  renderNote (note, onClick, selected) {
    const isSelected = selected === note.id
    const styles = classNames({
      'selected': isSelected
    })

    return (
      <tr key={note.id} className={styles} onMouseDown={function () {
        if (!isSelected) onClick(note.id, note.title)
      }}>
        <td>{note.title}</td>
        <td data-sort={note.dateCreated}>{moment(note.dateCreated, 'X').format('LLL')}</td>
      </tr>
    )
  }

  renderNotes (notes, onClick, selected) {
    return notes.map((note) => this.renderNote(note, onClick, selected))
  }

  initTable (element) {
    this.table = new Tablesort(element)
  }

  componentDidUpdate () {
    this.table.refresh()
  }

  render () {
    return (
      <div className="pane-group">
        <table className="table-striped" ref={this.initTable}>
          {this.renderHeader()}
          <tbody>
            {this.renderNotes(this.props.notes, this.props.onSelectItem, this.props.selected)}
          </tbody>
        </table>
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
