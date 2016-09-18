function commandCreator (type, mode) {
  return {
    type,
    mode,
    isBlock: function () {
      this.type === 'block'
    }
  }
}

const BLOCK = {
  HEADER3: commandCreator('block', 'header-three'),
  CODE_BLOCK: commandCreator('block', 'code-block'),
  ORDERED_LIST: commandCreator('block', 'ordered-list-item')
}

const INLINE = {
  BOLD: commandCreator('inline', 'BOLD'),
  ITALIC: commandCreator('inline', 'ITALIC'),
  UNDERLINE: commandCreator('inline', 'UNDERLINE'),
  STRIKETHROUGH: commandCreator('inline', 'STRIKETHROUGH')
}

export default {
  BLOCK,
  INLINE
}
