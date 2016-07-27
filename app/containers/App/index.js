import React, { Component } from 'react'
import Window from '../../components/Window'
import TitleBar from '../../components/TitleBar'
import SearchNote from '../SearchNote'
import NoteList from '../NoteList'
import NoteEditor from '../NoteEditor'
import AppContent from '../../components/AppContent'
import StatusBar from '../../components/StatusBar'

export default class App extends Component {
  render () {
    return (
      <Window>
        <TitleBar title="nvNEXT">
          <SearchNote />
        </TitleBar>
        <AppContent>
          <NoteList />
          <NoteEditor />
        </AppContent>
        <StatusBar />
      </Window>
    )
  }
}
