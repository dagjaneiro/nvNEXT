import { ipcRenderer as ipc } from 'electron'
import { eventChannel } from 'redux-saga'

export function createSearchChannel () {
  return eventChannel(emitter => {
    ipc.on('search-results', (event, args) => {
      emitter(args)
    })
  })
}

export function searchNotes (query) {
  console.log('search query!')
  ipc.send('search-query', query)
}

export function updateNote (data) {
  console.log('search query!')
  ipc.send('search-update', data)
}
