import { ipcRenderer } from 'electron'
import { quickOpen, quickCreate } from './containers/QuickOpen/actions'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './components/App'
import './app.global.css'
import 'regenerator-runtime/runtime'

const store = configureStore()

ipcRenderer.on('quick-open', () => {
  store.dispatch(quickOpen(true))
})

ipcRenderer.on('quick-create', () => {
  store.dispatch(quickCreate(true))
})

// store.dispatch({type: 'SELECT_NOTE', payload: { id: 'ByzUkZJ8g' }})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
