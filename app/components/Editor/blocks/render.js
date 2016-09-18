import React from 'react'
import Immutable from 'immutable'
import { DefaultDraftBlockRenderMap } from 'draft-js'
import CodeBlock from './code.block'

const blockRenderMap = Immutable.Map({
  'code-block': {
    element: 'pre', // will be used during paste or html conversion to auto match your component
    wrapper: <CodeBlock />
  }
})

// keep support for other draft default block types and add our myCustomBlock type
export default DefaultDraftBlockRenderMap.merge(blockRenderMap)
