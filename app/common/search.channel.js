import { ipcRenderer as ipc } from 'electron'
import { eventChannel } from 'redux-saga'

export function createSearchChannel () {
  return eventChannel(emitter => {
    ipc.on('search-results', (event, { query, notes }) => {
      emitter({ type: 'SEARCH_RESULTS', payload: { query, notes } })
    })
    ipc.on('note-created', (event, { id }) => {
      emitter({ type: 'NOTE_CREATED', payload: { id } })
    })
    ipc.on('note-updated', (event) => {
      emitter({ type: 'NOTE_UPDATED' })
    })
  })
}

export function searchNotes ({ text }) {
  console.log('search query!')
  ipc.send('search-note', {
    text
  })
}

export function createNote ({ title }) {
  ipc.send('create-note', {
    title
  })
}

export function renameNote ({ id, title }) {
  ipc.send('rename-note', {
    id,
    title
  })
}

export function updateNote ({ id, plainText, content }) {
  console.log('content', content)
  ipc.send('update-note', {
    id,
    plainText,
    content
  })
}
