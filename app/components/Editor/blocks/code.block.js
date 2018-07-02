import React, { PropTypes } from 'react'

export default class CodeBlock extends React.Component {
  render () {
    return (
      <div>
        <pre className="public-DraftStyleDefault-pre">
          <div className="nvGutter" contentEditable="false">js</div>
          <div className="nvText">
            {this.props.children}
          </div>
        </pre>
      </div>
    )
  }
}

CodeBlock.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object)
}
