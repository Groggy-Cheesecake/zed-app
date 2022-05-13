import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LocalizeProvider } from 'react-localize-redux'
import { DrizzleProvider } from 'drizzle-react'

import store from 'state'
import App from './App'
import drizzleOptions from '../drizzleOptions'

export const Root = () => {
  return (
    <DrizzleProvider options={drizzleOptions} store={store}>
      <LocalizeProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LocalizeProvider>
    </DrizzleProvider>
  )
}
