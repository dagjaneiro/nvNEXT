import classNames from 'classnames'
import React, { PropTypes } from 'react'
import * as styles from './styles.css'

function renderTag (tag) {
  return (
    <div className={styles.tag}>
      {tag.name}
    </div>
    )
}

const NoteTags = ({ tags = [{name: 'javascript'}, {name: 'aws'}] }) => {
  return (
    <div className={styles.tagList}>
      {tags.map(renderTag)}
    </div>
  )
}

NoteTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object)
}

export default NoteTags
