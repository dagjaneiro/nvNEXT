export const getShouldSave = (state) => state.editor.save
export const getShouldFocus = (state) => state.editor.focus
export const getNoteById = (state, id) => state.noteList.notes.get(id)
