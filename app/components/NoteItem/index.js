import classNames from 'classnames'
import React, { PropTypes } from 'react'
import * as styles from './styles.css'
import NoteTags from '../NoteTags'

const NoteItem = ({ note, isSelected }) => {
  const arrowStyle = classNames(styles.noteItemArrow, {
    [styles.arrowSelected]: false
  })

  const noteStyle = classNames(styles.noteItem, {
    [styles.noteSelected]: isSelected
  })

  return (
    <div className={noteStyle}>
      <div className={styles.header}>
        <div className={styles.noteItemTitle}>
          {note.title}
        </div>
        <div className={arrowStyle} />
      </div>
      {
      //   <div className={styles.noteItemBody}>
      //   {note.plainText}
      // </div>
    }
      <NoteTags />
    </div>
  )
}

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired
}

export default NoteItem
