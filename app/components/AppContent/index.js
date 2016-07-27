import React, { PropTypes } from 'react'
import SplitPane from 'react-split-pane'

const AppContent = ({children}) => {
  return (
    <div className="window-content">
      <SplitPane split="horizontal" minSize={50} defaultSize={100}>
        {children}
      </SplitPane>
    </div>
  )
}

AppContent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
}

export default AppContent
