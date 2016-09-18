import React, { PropTypes } from 'react'

const StatusBar = ({ lineCount, charCount }) => {
  return (
    <footer className="toolbar toolbar-footer">
      <h1 className="title pull-right">&nbsp;&nbsp;&nbsp;&nbsp;</h1>
      <h1 className="title pull-right">{lineCount} lines, {charCount} characters</h1>
    </footer>
  )
}

StatusBar.propTypes = {
  lineCount: PropTypes.number,
  charCount: PropTypes.number
}

export default StatusBar
