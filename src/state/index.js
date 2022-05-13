import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-loading-promise-middleware'
import { generateContractsInitialState } from 'drizzle'
import createSagaMiddleware from 'redux-saga'

import drizzleOptions from '../drizzleOptions'
import AppReducer from './reducers'
import sagas from './sagas'

const initialState = {
  contracts: generateContractsInitialState(drizzleOptions),
}

const sagaMiddleware = createSagaMiddleware()

const middlewares = [thunk, promise, sagaMiddleware]

// Redux Logger
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export default createStore(AppReducer, initialState, applyMiddleware(...middlewares))

sagaMiddleware.run(sagas)
