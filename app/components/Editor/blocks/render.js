import React, { PropTypes } from 'react'
import { EditorBlock } from 'draft-js'

const WidgetPropTypes = {
  contentBlock: PropTypes.object.isRequired,
  actions: PropTypes.object
}

const HeaderOne = (props) => <HeaderWidget type="1" {...props} />
const HeaderTwo = (props) => <HeaderWidget type="2" {...props} />
const HeaderThree = (props) => <HeaderWidget type="3" {...props} />
// const HeaderThree = (props) => <img src='./assets/h3.svg' />

HeaderOne.propTypes = WidgetPropTypes
HeaderTwo.propTypes = WidgetPropTypes
HeaderThree.propTypes = WidgetPropTypes


const HeaderWidget = ({ contentBlock, type, actions }) => {
  const key = contentBlock.getKey()
  return (
    <span onClick={function () { actions.onSetBlockType(key, 'header-one') }}>
      <span contentEditable={false}><strong>H</strong><em>{type}</em></span>
    </span>
  )
}

HeaderWidget.propTypes = {
  contentBlock: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  actions: PropTypes.object
}

const ComponentWithGutter = (props) => {
  const { blockProps = {}, block } = props
  const { InnerComponent = EditorBlock, Widget = null, actions = null } = blockProps

  return (
    <div className="blockContainer">
      {Widget
        ? <div className="nvGutter">
          <Widget contentBlock={block} actions={actions} />
        </div> : null
      }
      <div className="nvText">
        <InnerComponent {...props} />
      </div>
    </div>
  )
}

ComponentWithGutter.propTypes = {
  blockProps: PropTypes.object,
  block: PropTypes.object
}


function blockRenderer (dispatchActions, contentBlock) {
  const type = contentBlock.getType()

  switch (type) {
    case 'header-one':
      return { component: ComponentWithGutter, props: { Widget: HeaderOne, actions: dispatchActions } }
    case 'header-two':
      return { component: ComponentWithGutter, props: { Widget: HeaderTwo, actions: dispatchActions } }
    case 'header-three':
      return { component: ComponentWithGutter, props: { Widget: HeaderThree, actions: dispatchActions } }
    default:
      return { component: ComponentWithGutter }
  }
}

export function getBlockRenderer (dispatchActions) {
  return blockRenderer.bind(this, dispatchActions)
}
