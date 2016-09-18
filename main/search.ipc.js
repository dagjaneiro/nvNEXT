import { ipcMain as ipc } from 'electron'
import SearchProvider from './search.provider'

export default function setupSearchProvider () {
  const searchProvider = new SearchProvider()

  ipc.on('search-note', function (event, { text }) {
    const notes = text.trim() ? searchProvider.search(text) : searchProvider.getAllNotes()
    notes.then((results) => {
      event.sender.send('search-results', { query: text, notes: results })
    })
  })

  ipc.on('create-note', function (event, { title }) {
    searchProvider.createNote(title).then((id) => {
      event.sender.send('note-created', { id: 0 })
    })
  })

  ipc.on('update-note', function (event, { id, plainText, content }) {
    searchProvider.updateNote(id, plainText, content).then(() => {
      event.sender.send('note-updated')
    })
  })

  ipc.on('rename-note', function (event, { id, title }) {
    searchProvider.renameNote(id, title)
  })

  ipc.on('get-note', function (event, noteId) {
    searchProvider.getNote(noteId).then((note) => {
      event.sender.send('search-select', note)
    })
  })
}
