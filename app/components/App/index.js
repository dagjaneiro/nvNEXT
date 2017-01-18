import React from 'react'
import Window from '../Window'
import TitleBar from '../TitleBar'
import NoteEditor from '../../containers/NoteEditor'
import NoteStatus from '../../containers/NoteStatus'
import { focusEditor } from '../../components/Editor/events'
import AppContent from '../AppContent'
import NotePreview from '../../containers/NotePreview'
import QuickOpen from '../../containers/QuickOpen'

export default () => {
  return (
    <Window>
      <QuickOpen />
      <TitleBar title="nvNEXT" />
      <AppContent>
        <NoteEditor triggerFocus={focusEditor.onFocus} />
        <NotePreview />
      </AppContent>
      <NoteStatus />
    </Window>
  )
}
