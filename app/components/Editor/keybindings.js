import { KeyBindingUtil, getDefaultKeyBinding } from 'draft-js'
import styles from './constants/editor.styles'

export function keyBindingFn (e) {
  if (KeyBindingUtil.hasCommandModifier(e)) {
    switch (e.keyCode) {
      case 49: /* `1` key */
        return styles.BLOCK.HEADER3
      case 66: /* `B` key */
        return styles.INLINE.BOLD
      case 73: /* `I` key */
        return styles.INLINE.ITALIC
      // case 83: /* `T` key */
      //  return 'no-style'
      case 85: /* `U` key */
        return styles.INLINE.UNDERLINE
      case 89: /* `Y` key */
        return styles.INLINE.STRIKETHROUGH
      case 220: /* `\` key */
        return styles.BLOCK.CODE_BLOCK
      case 79: /* `O` key */
        return styles.BLOCK.ORDERED_LIST
      // case 79: /* `*` key */
      //   return commandCreator('block', 'unordered-list-item')
    }
  }

  return getDefaultKeyBinding(e)
}
