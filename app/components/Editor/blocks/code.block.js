import React, { PropTypes } from 'react'

export default class CodeBlock extends React.Component {
  render () {
    return (
      <div>
        <pre className="public-DraftStyleDefault-pre">
          <div className="nvCodeLabel" contentEditable="false">javascript</div>
          {this.props.children}
        </pre>
      </div>
    )
  }
}

CodeBlock.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object)
}
