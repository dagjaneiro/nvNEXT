import { ipcRenderer as ipc } from 'electron'
import { eventChannel } from 'redux-saga'

export function createSelectChannel () {
  return eventChannel(emitter => {
    ipc.on('search-select', (event, args) => {
      emitter(args)
    })
  })
}

export function getNote (noteId) {
  console.log('get query!')
  ipc.send('get-note', noteId)
}
