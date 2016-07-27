import React, { PropTypes } from 'react'

const StatusBar = ({title}) => {
  return (
    <footer className="toolbar toolbar-footer">
      <h1 className="title"></h1>
    </footer>
  )
}

StatusBar.propTypes = {
  title: PropTypes.string
}

export default StatusBar
