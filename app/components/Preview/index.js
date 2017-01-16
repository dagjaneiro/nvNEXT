import React, { PropTypes } from 'react'

const Preview = ({ noteHtml }) => {
  const createMarkup = function () {
    return {__html: noteHtml}
  }

  return <div className="nv-preview-container markdown-body" dangerouslySetInnerHTML={createMarkup()} />
}

Preview.propTypes = {
  noteHtml: PropTypes.string.isRequired
}

export default Preview
