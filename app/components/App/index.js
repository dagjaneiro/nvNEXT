import React from 'react'
import Window from '../Window'
import TitleBar from '../TitleBar'
import SearchNote from '../../containers/SearchNote'
import NoteList from '../../containers/NoteList'
import NoteEditor from '../../containers/NoteEditor'
import NoteStatus from '../../containers/NoteStatus'
import { focusEditor } from '../../components/Editor/events'
import AppContent from '../AppContent'
import SplitPane from 'react-split-pane'
import NotePreview from '../../containers/NotePreview'
import QuickOpen from '../../containers/QuickOpen'

export default () => {
  return (
    <Window>
      <QuickOpen />
      <TitleBar title="nvNEXT">
        <SearchNote focusEditor={focusEditor.focus} />
      </TitleBar>
      <AppContent>
        <NoteList />
        <SplitPane split="vertical" minSize={0} maxSize={-100} defaultSize={200} primary="second">
          <NoteEditor triggerFocus={focusEditor.onFocus} />
          <NotePreview />
        </SplitPane>
      </AppContent>
      <NoteStatus />
    </Window>
  )
}
