import 'regenerator-runtime/runtime'
import SearchApi from 'js-worker-search'
import { takeLatest } from 'redux-saga'
import { call, put, fork, select, take } from 'redux-saga/effects'
import { PERFORM_SEARCH, SAVE_NOTE, CREATE_AND_SELECT, updateList, createNote, searchResult,
  performSearch, selectNote, deselectNote, requestSaveNote } from './actions'
import { getAutoSelect, getSearchText, getResult, getNotes, getSelectedNote } from './selectors'
import { focusEditor } from '../containers/NoteEditor/actions'

const searchApi = new SearchApi()

function selectNoteFromResults (text, results, notes) {
  const searchText = text.toLowerCase()
  const selected = results.reduce((pre, cur) => {
    const curNote = notes.get(cur)
    const title = curNote.title.toLowerCase()
    if (title.startsWith(searchText)) {
      return pre && pre.title.length < curNote.title.length ? pre : curNote
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

  const uids = yield call(searchApi.search, action.payload.text)
  yield put(searchResult(action.payload.text, uids))

  const text = yield select(getSearchText)
  const results = yield select(getResult)
  const notes = yield select(getNotes)

  const shouldSelect = yield select(getAutoSelect)
  const selectedNote = shouldSelect && selectNoteFromResults(text, results, notes)

  if (selectedNote) {
    yield put(selectNote(selectedNote.id, selectedNote.title))

    if (action.payload.focusEditor) {
      yield put(focusEditor())
    }
  } else {
    yield put(deselectNote())
  }
}

function * createNoteHandler (action) {
  searchApi.indexDocument(action.payload.id, action.payload.text)
  yield put(createNote(action.payload.id, action.payload.text))
  // const notes = yield select(getRepoNotes)
  // yield put(updateList(notes))
  yield put(performSearch(action.payload.text, true, true))
}

function * saveNote (action) {
  console.log('save ' + action.payload.id)
  const id = action.payload.id
  const title = action.payload.title
  const content = action.payload.content
  // searchApi.removeDocument(id) // FIXME: Removing documents still not working
  searchApi.indexDocument(id, title)
  searchApi.indexDocument(id, content)
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export function * searchSaga () {
  yield * takeLatest(PERFORM_SEARCH, searchNote)
}

export function * createSaga () {
  yield * takeLatest(CREATE_AND_SELECT, createNoteHandler)
}

export function * saveSaga () {
  yield * takeLatest(SAVE_NOTE, saveNote)
}

export default function * root () {
  yield [
    fork(searchSaga),
    fork(createSaga),
    fork(saveSaga)
  ]
}
