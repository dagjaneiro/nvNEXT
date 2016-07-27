import React, { PropTypes } from 'react'

const Window = ({children}) => {
  return (
    <div className="window">
      {children}
    </div>
  )
}

Window.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
}

export default Window
