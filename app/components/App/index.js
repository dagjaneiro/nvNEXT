import React, { Component } from 'react'
import Window from '../Window'
import TitleBar from '../TitleBar'
import SearchNote from '../../containers/SearchNote'
import NoteList from '../../containers/NoteList'
import NoteEditor from '../../containers/NoteEditor'
import NoteStatus from '../../containers/NoteStatus'
import { focusEditor } from '../../components/Editor/events'
import AppContent from '../AppContent'

export default class App extends Component {

  render () {
    return (
      <Window>
        <TitleBar title="nvNEXT">
          <SearchNote focusEditor={focusEditor.focus} />
        </TitleBar>
        <AppContent>
          <NoteList />
          <NoteEditor triggerFocus={focusEditor.onFocus} />
        </AppContent>
        <NoteStatus />
      </Window>
    )
  }
}
