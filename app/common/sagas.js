import 'regenerator-runtime/runtime'
import { takeLatest } from 'redux-saga'
import { call, put, fork, select, take } from 'redux-saga/effects'
import { PERFORM_SEARCH, SAVE_NOTE, CREATE_NOTE, SEARCH_RESULT, SELECT_NOTE, LOAD_NOTE,
  NOTE_CREATED, NOTE_UPDATED, searchResult, performSearch, selectNote, deselectNote,
  noteUpdated, saveNote, loadNote, noteCreated } from './actions'
import { getSearchText, getResult, getCurrentNote } from './selectors'
import { createSearchChannel, searchNotes, updateNote, createNote } from './search.channel'
import { createSelectChannel, getNote } from './select.channel'
import { getPlainText, getRawContent } from '../containers/NoteEditor/utils'
import { focusEditor } from '../components/Editor/events'

function selectNoteFromResults (text, results) {
  const searchText = text.toLowerCase()
  const selected = results.reduce((pre, cur) => {
    const title = cur.title ? cur.title.toLowerCase() : ''
    if (title.startsWith(searchText)) {
      return pre && pre.title.length < cur.title.length ? pre : cur
    }
    return pre
  }, null)

  return selected
}

function * savePreviousNote () {
  const currentNote = yield select(getCurrentNote)
  const currentId = currentNote.noteId

  if (currentId) {
    const editorContent = currentNote.editorState.getCurrentContent()
    const plainText = getPlainText(editorContent)
    const content = getRawContent(editorContent)
    yield put(saveNote(currentId, plainText, content))
    yield take(NOTE_UPDATED)
  }
}

function * searchNote (action) {
  const shouldSelect = action.payload.autoSelect

  yield call(searchNotes, { text: action.payload.text })
  yield take(SEARCH_RESULT)

  const text = yield select(getSearchText)
  const results = yield select(getResult)
  const selectedNote = shouldSelect && selectNoteFromResults(text, results)

  yield call(savePreviousNote)

  if (selectedNote) {
    yield put(selectNote(selectedNote.id))
    yield take(LOAD_NOTE)
  } else {
    yield put(deselectNote())
  }
}

function * searchHandler () {
  const chan = yield call(createSearchChannel)
  try {
    while (true) {
      let action = yield take(chan)
      let payload = action.payload

      switch (action.type) {
        case 'SEARCH_RESULTS':
          yield put(searchResult(payload.query, payload.notes))
          break
        case 'NOTE_CREATED':
          yield put(noteCreated(payload.id))
          break
        case 'NOTE_UPDATED':
          yield put(noteUpdated())
          break
      }
    }
  } finally {
    console.error('search channel terminated')
  }
}

function * loadNoteHandler () {
  const chan = yield call(createSelectChannel)
  try {
    while (true) {
      let note = yield take(chan)
      yield put(loadNote(note))
    }
  } finally {
    console.error('select channel terminated')
  }
}

function * createNoteHandler (action) {
  yield call(createNote, { title: action.payload.title })
  yield take(NOTE_CREATED)
  yield call(searchNote, performSearch(action.payload.title, true))
  yield call(focusEditor.focus)
}

function * saveNoteHandler (action) {
  console.log('save ' + action.payload.id)
  yield call(updateNote, action.payload)
}

function * selectNoteHandler (action) {
  yield call(savePreviousNote)
  yield call(getNote, action.payload.id)
}

export function * searchSaga () {
  yield * takeLatest(PERFORM_SEARCH, searchNote)
}

export function * createSaga () {
  yield * takeLatest(CREATE_NOTE, createNoteHandler)
}

export function * saveSaga () {
  yield * takeLatest(SAVE_NOTE, saveNoteHandler)
}

export function * selectSaga () {
  yield * takeLatest(SELECT_NOTE, selectNoteHandler)
}

export default function * root () {
  yield [
    fork(searchSaga),
    fork(createSaga),
    fork(saveSaga),
    fork(selectSaga),
    fork(searchHandler),
    fork(loadNoteHandler)
  ]
}
