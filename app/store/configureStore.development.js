import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
// import { triggerSearch } from './middleware'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../common/sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const logger = createLogger({
  level: 'info',
  collapsed: true
})

const enhancer = compose(
  // applyMiddleware(triggerSearch),
  applyMiddleware(sagaMiddleware),
  applyMiddleware(logger),
  window.devToolsExtension ? window.devToolsExtension() : noop => noop
)

export default function configureStore (initialState) {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    )
  }

  sagaMiddleware.run(rootSaga)

  return store
}
