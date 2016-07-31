import 'regenerator-runtime/runtime'
import { takeLatest } from 'redux-saga'
import { call, put, fork, select, take } from 'redux-saga/effects'
import { PERFORM_SEARCH, SAVE_NOTE, CREATE_AND_SELECT, SEARCH_RESULT, SELECT_NOTE, LOAD_NOTE,
  createNote, searchResult, performSearch, selectNote, deselectNote, requestSaveNote, loadNote } from './actions'
import { getAutoSelect, getSearchText, getResult, getSelectedNote } from './selectors'
import { focusEditor } from '../containers/NoteEditor/actions'
import { createSearchChannel, searchNotes, updateNote } from './search.channel'
import { createSelectChannel, getNote } from './select.channel'
import moment from 'moment'

function createDocument (id, title) {
  return {
    id: id,
    type: 'text',
    title: title,
    content: '',
    dateCreated: moment().format('X'),
    dateSaved: moment().format('X')
  }
}

function selectNoteFromResults (text, results) {
  const searchText = text.toLowerCase()
  const selected = results.reduce((pre, cur) => {
    const title = cur.title.toLowerCase()
    if (title.startsWith(searchText)) {
      return pre && pre.title.length < cur.title.length ? pre : cur
    }
    return pre
  }, null)

  return selected
}

function * searchNote (action) {
  const previousNote = yield select(getSelectedNote)

  if (previousNote) {
    yield put(requestSaveNote())
    yield take(SAVE_NOTE)
  }

  yield call(searchNotes, action.payload.text)
  yield take(SEARCH_RESULT)

  const text = yield select(getSearchText)
  const results = yield select(getResult)

  const shouldSelect = yield select(getAutoSelect)
  const selectedNote = shouldSelect && selectNoteFromResults(text, results)

  if (selectedNote) {
    yield put(selectNote(selectedNote.id, selectedNote.title))
    yield take(LOAD_NOTE)

    if (action.payload.focusEditor) {
      yield put(focusEditor())
    }
  } else {
    yield put(deselectNote())
  }
}

function * searchHandler () {
  const chan = yield call(createSearchChannel)
  try {
    while (true) {
      let result = yield take(chan)
      yield put(searchResult(result.query, result.notes))
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
  const newNote = createDocument(action.payload.id, action.payload.text)
  yield call(updateNote, newNote)
  yield put(createNote(newNote))
  yield put(performSearch(action.payload.text, true, true))
}

function * saveNote (action) {
  console.log('save ' + action.payload.id)
  yield call(updateNote, action.payload)
}

export function * searchSaga () {
  yield * takeLatest(PERFORM_SEARCH, searchNote)
}

export function * createSaga () {
  yield * takeLatest(CREATE_AND_SELECT, createNoteHandler)
}

export function * saveSaga () {
  yield * takeLatest(SAVE_NOTE, saveNote)
}

export function * selectSaga () {
  yield * takeLatest(SELECT_NOTE, (action) => getNote(action.payload))
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
