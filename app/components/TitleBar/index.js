import React, { PropTypes } from 'react'

const TitleBar = ({title}) => {
  return (
    <header className="toolbar toolbar-header">
      <h1 className="title">{title}</h1>
    </header>
  )
}

TitleBar.propTypes = {
  title: PropTypes.string.isRequired
}

export default TitleBar
