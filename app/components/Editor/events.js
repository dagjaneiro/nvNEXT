let onFocusCallback

export const focusEditor = {

  focus: () => {
    if (onFocusCallback) {
      console.log('focus!')
      onFocusCallback()
    }
  },

  onFocus: (callback) => {
    onFocusCallback = callback
  }
}
