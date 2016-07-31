import { ipcMain as ipc } from 'electron'
import SearchProvider from './search.provider'

export default function setupSearchProvider () {
  const searchProvider = new SearchProvider()

  ipc.on('search-query', function (event, query) {
    const notes = query.trim() ? searchProvider.search(query) : searchProvider.getAllNotes()
    notes.then((results) => {
      event.sender.send('search-results', { query: query, notes: results })
    })
  })

  ipc.on('search-update', function (event, note) {
    searchProvider.addNote(note)
  })

  ipc.on('search-get', function (event, noteId) {
    searchProvider.getNote(noteId).then((note) => {
      event.sender.send('search-select', note)
    })
  })
}
