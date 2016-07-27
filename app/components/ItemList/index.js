import classNames from 'classnames'
import React, { PropTypes } from 'react'
import { listTitle, listModified } from './styles.css'
import moment from 'moment'

function renderHeader () {
  return (
    <thead>
      <tr>
        <th className={listTitle}>Title</th>
        <th className={listModified}>Date Modified</th>
      </tr>
    </thead>
  )
}
function renderNote (note, onClick, selected) {
  const isSelected = selected === note.id
  const styles = classNames({
    'selected': isSelected
  })

  return (
    <tr key={note.id} className={styles} onClick={function () {
      if (!isSelected) onClick(note.id, note.title)
    }}>
      <td>{note.title}</td>
      <td>{moment(note.dateCreated, 'X').format('LLL')}</td>
    </tr>
  )
}

function renderNotes (notes, onClick, selected) {
  return notes.map((note) => renderNote(note, onClick, selected))
}

const ItemList = ({selected, searchText, notes = [], onSelectItem}) => {
  return (
    <div className="pane-group">
      <table className="table-striped">
        {renderHeader()}
        <tbody>
          {renderNotes(notes, onSelectItem, selected)}
        </tbody>
      </table>
    </div>
  )
}

ItemList.propTypes = {
  selected: PropTypes.string,
  searchText: PropTypes.string,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectItem: PropTypes.func.isRequired
}

export default ItemList
