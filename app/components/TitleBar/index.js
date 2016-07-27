import React, { PropTypes } from 'react'

const TitleBar = ({title, children}) => {
  return (
    <header className="toolbar toolbar-header">
      <h1 className="title">{title}</h1>
      <div className="toolbar-actions">
        {children}
      </div>
    </header>
  )
}

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export default TitleBar
