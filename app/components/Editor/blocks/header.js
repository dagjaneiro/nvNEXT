import React, { PropTypes } from 'react'

const HeaderWidget = ({ contentBlock, type, onSetBlockType }) => {
  const key = contentBlock.getKey()
  return (
    <span onClick={function () { console.log(`header clicked! ${key}`) }}>{type}</span>
  )
}

HeaderWidget.propTypes = {
  contentBlock: PropTypes.object,
  type: PropTypes.string,
  onSetBlockType: PropTypes.func
}
